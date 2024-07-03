package main

import (
	"api/ent"
	"api/routes"
	"app/chat"
	"app/ollama"
	"app/types"
	"context"
	"log"

	"github.com/google/uuid"
	"github.com/joho/godotenv"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	err := godotenv.Load()
	if err != nil {
		log.Panic("Error loading .env file", err)
	}

	a.ctx = ctx
}

func (a *App) SendMessage(
	chatId int,
	text string,
	options ollama.ModelOptions,
	model string,
) {
	var currentChat *ent.Chat

	if chatId != 0 {
		c, err := chat.Find(chatId)

		if err != nil {
			runtime.EventsEmit(
				a.ctx,
				"MESSAGE_ERROR",
				err,
			)
			return
		}

		currentChat = c
	} else {
		c, err := chat.Create()

		if err != nil {
			runtime.EventsEmit(
				a.ctx,
				"MESSAGE_ERROR",
				err,
			)
			return
		}

		runtime.EventsEmit(
			a.ctx,
			"NEW_CHAT",
			c.ID,
		)

		currentChat = c
	}

	chatCtx, err := chat.Context(currentChat.ID)

	if err != nil {
		runtime.EventsEmit(
			a.ctx,
			"MESSAGE_ERROR",
			err,
		)
		return
	}

	resChan := make(chan ollama.GenerateResponse)

	go ollama.Generate(
		ollama.GenerateArgs{
			Prompt:  text,
			Options: options,
			Context: chatCtx.Data,
			Model:   model,
		},
		resChan,
	)

	_, userMsgErr := chat.SendMessage(
		currentChat.ID,
		routes.SendMessagePayload{
			Text:    text,
			Context: chatCtx.Data,
			Author:  "user",
		},
	)

	if userMsgErr != nil {
		runtime.EventsEmit(
			a.ctx,
			"MESSAGE_ERROR",
			userMsgErr.Error(),
		)
		return
	}

	runtime.EventsEmit(
		a.ctx,
		"NEW_MESSAGE",
		types.SendMessage{Text: text, ID: uuid.NewString(), From: "user"},
	)

	botMessage := types.SendMessage{Text: "", ID: uuid.NewString(), From: "bot"}

	runtime.EventsEmit(
		a.ctx,
		"NEW_MESSAGE",
		botMessage,
	)

	for c := range resChan {
		botMessage.Text += c.Response

		runtime.EventsEmit(
			a.ctx,
			"MESSAGE_UPDATE",
			botMessage,
		)

		if c.Done {
			if c.Error != nil {
				runtime.EventsEmit(
					a.ctx,
					"MESSAGE_ERROR",
					c.Error,
				)
			} else {
				chat.SendMessage(
					currentChat.ID,
					routes.SendMessagePayload{
						Text:    botMessage.Text,
						Author:  "bot",
						Context: c.Context,
					},
				)
			}
		}
	}
}

func (a *App) GetModels() []ollama.LocalModel {
	models, err := ollama.GetLocalModels()

	if err != nil {
		return []ollama.LocalModel{}
	}

	return models
}

func (a *App) GetFirstModel() ollama.LocalModel {
	models, err := ollama.GetLocalModels()

	if err != nil {
		return ollama.LocalModel{}
	}

	if len(models) == 0 {
		return ollama.LocalModel{}
	}

	return models[0]
}

func (a *App) IsOllamaRunning() bool {
	return ollama.IsRunning()
}

func (a *App) GetOllamaServerUrl() string {
	return ollama.GetServerUrl()
}

func (a *App) IsOllamaInstalled() bool {
	return ollama.IsInstalled()
}

func (a *App) StartOllama() error {
	return ollama.Start()
}

func (a *App) OpenDirectoryDialog() ([]string, error) {
	selected, err := runtime.OpenMultipleFilesDialog(a.ctx, runtime.OpenDialogOptions{})

	return selected, err
}
