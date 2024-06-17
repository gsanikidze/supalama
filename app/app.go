package main

import (
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
	text string,
	options ollama.ModelOptions,
	context []int,
	model string,
) {
	resChan := make(chan ollama.GenerateResponse)

	go ollama.Generate(
		ollama.GenerateArgs{
			Prompt:  text,
			Options: options,
			Context: context,
			Model:   model,
		},
		resChan,
	)

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
				runtime.EventsEmit(
					a.ctx,
					"NEW_CONTEXT",
					c.Context,
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
