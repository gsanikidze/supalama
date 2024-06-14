package ollama

import (
	"app/env"
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

func Generate(args GenerateArgs, res chan GenerateResponse) {
	endpoint := fmt.Sprintf("%v/api/generate", env.OllamaDefaultServer())

	payload := generatePayload{
		Model:   args.Model,
		Stream:  true,
		Options: args.Options,
		Prompt:  args.Prompt,
		Context: args.Context,
	}

	body, err := json.Marshal(payload)

	if err != nil {
		close(res)
		return
	}

	r, err := http.Post(
		endpoint,
		"application/json",
		bytes.NewBuffer(body),
	)

	if err != nil {
		close(res)
		return
	}

	defer r.Body.Close()

	scanner := bufio.NewScanner(r.Body)

	for scanner.Scan() {
		chunk := GenerateResponse{}

		chunkErr := json.Unmarshal(scanner.Bytes(), &chunk)

		if chunkErr != nil {
			close(res)
			return
		}

		res <- chunk

		if chunk.Done {
			close(res)
			return
		}
	}
}
