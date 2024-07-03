package helpers

import (
	"api/routes"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func HttpRequest[T any](method, endpoint string, payload interface{}) (*T, error) {
	var req *http.Request
	var err error
	res := new(T)

	if payload != nil {
		data, err := json.Marshal(payload)
		if err != nil {
			return nil, err
		}
		req, err = http.NewRequest(method, endpoint, bytes.NewBuffer(data))

		if err != nil {
			return nil, err
		}
	} else {
		req, err = http.NewRequest(method, endpoint, nil)
	}

	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		errorBody := new(routes.ErrorResponse)

		parseErr := json.Unmarshal(body, &errorBody)

		if parseErr != nil {
			return nil, parseErr
		}

		return nil, fmt.Errorf(errorBody.Message)
	}

	parseErr := json.Unmarshal(body, &res)

	if parseErr != nil {
		return nil, parseErr
	}

	return res, nil
}
