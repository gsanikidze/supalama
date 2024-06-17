package ollama

import "github.com/go-playground/validator/v10"

func (m *ModelOptions) WithDefaults() *ModelOptions {
	var (
		mirostat_eta   float32 = 0.1
		mirostat_tau   float32 = 10
		num_ctx        uint16  = 2048
		repeat_last_n  int16   = 64
		repeat_penalty float32 = 1.1
		temperature    float32 = 0.8
		tfs_z          float32 = 1
		num_predict    int16   = 128
		top_k          uint16  = 40
		top_p          float32 = 0.9
		seed           uint16  = 0
		mirostat       uint8   = 0
	)

	if m.Mirostat == nil {
		m.Mirostat = &mirostat
	}

	if m.MirostatEta == nil {
		m.MirostatEta = &mirostat_eta
	}

	if m.MirostatTau == nil {
		m.MirostatTau = &mirostat_tau
	}

	if m.NumCtx == nil {
		m.NumCtx = &num_ctx
	}

	if m.RepeatLastN == nil {
		m.RepeatLastN = &repeat_last_n
	}

	if m.RepeatPenalty == nil {
		m.RepeatPenalty = &repeat_penalty
	}

	if m.Temperature == nil {
		m.Temperature = &temperature
	}

	if m.TfsZ == nil {
		m.TfsZ = &tfs_z
	}

	if m.NumPredict == nil {
		m.NumPredict = &num_predict
	}

	if m.TopK == nil {
		m.TopK = &top_k
	}

	if m.TopP == nil {
		m.TopP = &top_p
	}

	if m.Seed == nil {
		m.Seed = &seed
	}

	return m
}

func (m *ModelOptions) Validated() (*ModelOptions, error) {
	v := validator.New(validator.WithRequiredStructEnabled())
	err := v.Struct(m)

	if err != nil {
		return nil, err
	}

	return m, nil
}
