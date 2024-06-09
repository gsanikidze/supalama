package main

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
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

type OllamaPayload struct {
	Model   string             `json:"model"`
	Stream  bool               `json:"stream"`
	Prompt  string             `json:"prompt"`
	Options map[string]float32 `json:"options"`
	Context []int              `json:"context"`
}

type OllamaResponse struct {
	CreatedAt     string `json:"created_at"`
	Model         string `json:"model"`
	Response      string `json:"response"`
	Context       []int  `json:"context"`
	TotalDuration int    `json:"total_duration"`
	Status        string `json:"status"`
	Done          bool   `json:"done"`
}

func OllamaGenerate(prompt string, options map[string]float32, context []int) (OllamaResponse, error) {
	res := OllamaResponse{}
	endpoint := "http://localhost:11434/api/generate"

	payload := OllamaPayload{
		Model:   "llama3",
		Stream:  false,
		Options: options,
		Prompt:  prompt,
		Context: context,
	}

	body, err := json.Marshal(payload)

	if err != nil {
		return res, err
	}

	r, err := http.Post(
		endpoint,
		"application/json",
		bytes.NewBuffer(body),
	)

	if err != nil {
		return res, err
	}

	defer r.Body.Close()

	parseErr := json.NewDecoder(r.Body).Decode(&res)

	if parseErr != nil {
		return res, parseErr
	}

	return res, nil
}

// Greet returns a greeting for the given name
func (a *App) SendMessage(
	text string,
	options map[string]float32,
	context []int,
) Response {
	res, err := OllamaGenerate(text, options, context)

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
