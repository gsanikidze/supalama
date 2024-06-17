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

	options, err := args.Options.WithDefaults().Validated()

	throwErr := func(err error) {
		errMsg := err.Error()

		res <- GenerateResponse{
			Error: &errMsg,
			Done:  true,
		}

		close(res)
	}

	if err != nil {
		throwErr(err)
		return
	}

	payload := generatePayload{
		Model:   args.Model,
		Stream:  true,
		Options: *options,
		Prompt:  args.Prompt,
		Context: args.Context,
	}

	body, err := json.Marshal(payload)

	if err != nil {
		throwErr(err)
		return
	}

	r, err := http.Post(
		endpoint,
		"application/json",
		bytes.NewBuffer(body),
	)

	if err != nil {
		throwErr(err)
		return
	}

	defer r.Body.Close()

	scanner := bufio.NewScanner(r.Body)

	for scanner.Scan() {
		chunk := GenerateResponse{}

		chunkErr := json.Unmarshal(scanner.Bytes(), &chunk)

		if chunkErr != nil {
			throwErr(err)
			return
		}

		res <- chunk

		if chunk.Done {
			close(res)
			return
		}
	}
}
