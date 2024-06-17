package ollama

type generatePayload struct {
	Model   string       `json:"model"`
	Stream  bool         `json:"stream"`
	Prompt  string       `json:"prompt"`
	Options ModelOptions `json:"options"`
	Context []int        `json:"context"`
}

type GenerateResponse struct {
	CreatedAt     string  `json:"created_at"`
	Model         string  `json:"model"`
	Response      string  `json:"response"`
	Context       []int   `json:"context"`
	TotalDuration int     `json:"total_duration"`
	Status        string  `json:"status"`
	Done          bool    `json:"done"`
	DoneReason    string  `json:"done_reason"`
	Error         *string `json:"error"`
}

type ModelOptions struct {
	Mirostat      *uint8   `json:"mirostat" validate:"min=0,max=2"`
	MirostatEta   *float32 `json:"mirostat_eta" validate:"min=0,max=1"`
	MirostatTau   *float32 `json:"mirostat_tau" validate:"min=0,max=10"`
	NumCtx        *uint16  `json:"num_ctx" validate:"min=0,max=100000"`
	RepeatLastN   *int16   `json:"repeat_last_n" validate:"min=-1,max=100"`
	RepeatPenalty *float32 `json:"repeat_penalty" validate:"min=0,max=10"`
	Temperature   *float32 `json:"temperature" validate:"min=0,max=1"`
	Seed          *uint16  `json:"seed" validate:"min=0,max=100"`
	TfsZ          *float32 `json:"tfs_z" validate:"min=0,max=10"`
	NumPredict    *int16   `json:"num_predict" validate:"min=-2,max=500"`
	TopK          *uint16  `json:"top_k" validate:"min=0,max=100"`
	TopP          *float32 `json:"top_p" validate:"min=0,max=1"`
}

type GenerateArgs struct {
	Prompt  string
	Options ModelOptions
	Context []int
	Model   string
}

type LocalModelDetails struct {
	Format            string   `json:"format"`
	Family            string   `json:"family"`
	ParameterSize     string   `json:"parameter_size"`
	QuantizationLevel string   `json:"quantization_level"`
	Families          []string `json:"families"`
}

type LocalModel struct {
	Name       string            `json:"name"`
	ModifiedAt string            `json:"modified_at"`
	Size       int64             `json:"size"`
	Digest     string            `json:"digest"`
	Details    LocalModelDetails `json:"details"`
}

type LocalModelsResponse struct {
	Models []LocalModel `json:"models"`
}
