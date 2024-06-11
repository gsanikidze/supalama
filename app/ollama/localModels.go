package ollama

import (
	"app/env"
	"encoding/json"
	"fmt"
	"net/http"
)

func GetLocalModels() ([]LocalModel, error) {
	res := []LocalModel{}

	endpoint := fmt.Sprintf("%v/api/tags", env.OllamaDefaultServer())

	r, err := http.Get(
		endpoint,
	)

	if err != nil {
		return res, err
	}

	defer r.Body.Close()

	rawRes := LocalModelsResponse{}

	parseErr := json.NewDecoder(r.Body).Decode(&rawRes)

	if parseErr != nil {
		return res, parseErr
	}

	res = rawRes.Models

	return res, nil
}
