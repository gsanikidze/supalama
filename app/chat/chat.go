package chat

import (
	"api/ent"
	"app/env"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func Create() (*ent.Chat, error) {
	endpoint := fmt.Sprintf("%v/chat", env.APIEndpoint())
	r, err := http.Post(
		endpoint,
		"application/json",
		nil,
	)

	if err != nil {
		return nil, err
	}

	defer r.Body.Close()

	if r.StatusCode < 200 || r.StatusCode >= 300 {
		return nil, fmt.Errorf("status code: %v", r.StatusCode)
	}

	chat := &ent.Chat{}
	body, err := io.ReadAll(r.Body)

	if err != nil {
		return nil, err
	}

	err = json.Unmarshal(body, &chat)

	if err != nil {
		return nil, err
	}

	return chat, nil
}
