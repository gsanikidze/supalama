package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type ChatContext struct {
	ent.Schema
}

func (ChatContext) Fields() []ent.Field {
	return []ent.Field{
		field.JSON("data", []int{}).
			Default([]int{}),
	}
}

func (ChatContext) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("chat", Chat.Type).
			Ref("context").
			Required().
			Unique(),
	}
}
