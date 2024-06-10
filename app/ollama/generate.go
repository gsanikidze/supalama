package ollama

import (
	"app/env"
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

func Generate(args GenerateArgs) (generateResponse, error) {
	res := generateResponse{}
	endpoint := fmt.Sprintf("%v/api/generate", env.OllamaDefaultServer())

	payload := generatePayload{
		Model:   "llama3",
		Stream:  false,
		Options: args.Options,
		Prompt:  args.Prompt,
		Context: args.Context,
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
