// Code generated by ent, DO NOT EDIT.

package migrate

import (
	"entgo.io/ent/dialect/sql/schema"
	"entgo.io/ent/schema/field"
)

var (
	// ChatsColumns holds the columns for the "chats" table.
	ChatsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "created_at", Type: field.TypeTime},
		{Name: "context", Type: field.TypeJSON},
	}
	// ChatsTable holds the schema information for the "chats" table.
	ChatsTable = &schema.Table{
		Name:       "chats",
		Columns:    ChatsColumns,
		PrimaryKey: []*schema.Column{ChatsColumns[0]},
	}
	// Tables holds all the tables in the schema.
	Tables = []*schema.Table{
		ChatsTable,
	}
)

func init() {
}
