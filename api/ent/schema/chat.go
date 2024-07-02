package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type Chat struct {
	ent.Schema
}

func (Chat) Fields() []ent.Field {
	return []ent.Field{
		field.Time("created_at").
			Default(time.Now),
	}
}

func (Chat) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("messages", Message.Type),
		edge.To("context", ChatContext.Type).Unique(),
	}
}
