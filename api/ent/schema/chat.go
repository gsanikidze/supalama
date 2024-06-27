package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

type Chat struct {
	ent.Schema
}

func (Chat) Fields() []ent.Field {
	return []ent.Field{
		field.Time("created_at").
			Default(time.Now),
		field.JSON("context", []int{}).
			Default([]int{}),
	}
}

func (Chat) Edges() []ent.Edge {
	return nil
}
