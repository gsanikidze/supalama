package ollama

type generatePayload struct {
	Model   string       `json:"model"`
	Stream  bool         `json:"stream"`
	Prompt  string       `json:"prompt"`
	Options ModelOptions `json:"options"`
	Context []int        `json:"context"`
}

type generateResponse struct {
	CreatedAt     string `json:"created_at"`
	Model         string `json:"model"`
	Response      string `json:"response"`
	Context       []int  `json:"context"`
	TotalDuration int    `json:"total_duration"`
	Status        string `json:"status"`
	Done          bool   `json:"done"`
}

type ModelOptions struct {
	Mirostat      uint8   `json:"mirostat"`
	MirostatEta   float32 `json:"mirostat_eta"`
	MirostatTau   float32 `json:"mirostat_tau"`
	NumCtx        uint16  `json:"num_ctx"`
	RepeatLastN   int16   `json:"repeat_last_n"`
	RepeatPenalty float32 `json:"repeat_penalty"`
	Temperature   float32 `json:"temperature"`
	Seed          uint16  `json:"seed"`
	TfsZ          float32 `json:"tfs_z"`
	NumPredict    uint16  `json:"num_predict"`
	TopK          uint16  `json:"top_k"`
	TopP          float32 `json:"top_p"`
}

type GenerateArgs struct {
	Prompt  string
	Options ModelOptions
	Context []int
}
