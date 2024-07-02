// Code generated by ent, DO NOT EDIT.

package chatcontext

import (
	"api/ent/predicate"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

// ID filters vertices based on their ID field.
func ID(id int) predicate.ChatContext {
	return predicate.ChatContext(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id int) predicate.ChatContext {
	return predicate.ChatContext(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id int) predicate.ChatContext {
	return predicate.ChatContext(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...int) predicate.ChatContext {
	return predicate.ChatContext(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...int) predicate.ChatContext {
	return predicate.ChatContext(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id int) predicate.ChatContext {
	return predicate.ChatContext(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id int) predicate.ChatContext {
	return predicate.ChatContext(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id int) predicate.ChatContext {
	return predicate.ChatContext(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id int) predicate.ChatContext {
	return predicate.ChatContext(sql.FieldLTE(FieldID, id))
}

// HasChat applies the HasEdge predicate on the "chat" edge.
func HasChat() predicate.ChatContext {
	return predicate.ChatContext(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.O2O, true, ChatTable, ChatColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasChatWith applies the HasEdge predicate on the "chat" edge with a given conditions (other predicates).
func HasChatWith(preds ...predicate.Chat) predicate.ChatContext {
	return predicate.ChatContext(func(s *sql.Selector) {
		step := newChatStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.ChatContext) predicate.ChatContext {
	return predicate.ChatContext(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.ChatContext) predicate.ChatContext {
	return predicate.ChatContext(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.ChatContext) predicate.ChatContext {
	return predicate.ChatContext(sql.NotPredicates(p))
}
