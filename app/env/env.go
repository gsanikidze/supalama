package env

import "os"

var (
	OllamaDefaultServer = func() string {
		return os.Getenv("DEFAULT_OLLAMA_SERVER")
	}
)
