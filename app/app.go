package main

import (
	"app/ollama"
	"context"
	"log"

	"github.com/google/uuid"
	"github.com/joho/godotenv"
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

type Message struct {
	Text string
	ID   string
	From string
}

type Response struct {
	Messages []Message
	Context  []int
}

func (a *App) SendMessage(
	text string,
	options ollama.ModelOptions,
	context []int,
) Response {
	res, err := ollama.Generate(
		ollama.GenerateArgs{
			Prompt:  text,
			Options: options,
			Context: context,
		},
	)

	if err != nil {
		return Response{}
	}

	messages := []Message{
		{Text: text, ID: uuid.NewString(), From: "user"},
		{Text: res.Response, ID: uuid.NewString(), From: "bot"},
	}

	return Response{
		Messages: messages,
		Context:  res.Context,
	}
}
