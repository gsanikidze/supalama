// Code generated by ent, DO NOT EDIT.

package ent

import (
	"api/ent/chat"
	"api/ent/chatcontext"
	"api/ent/message"
	"api/ent/schema"
	"time"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	chatFields := schema.Chat{}.Fields()
	_ = chatFields
	// chatDescCreatedAt is the schema descriptor for created_at field.
	chatDescCreatedAt := chatFields[0].Descriptor()
	// chat.DefaultCreatedAt holds the default value on creation for the created_at field.
	chat.DefaultCreatedAt = chatDescCreatedAt.Default.(func() time.Time)
	chatcontextFields := schema.ChatContext{}.Fields()
	_ = chatcontextFields
	// chatcontextDescData is the schema descriptor for data field.
	chatcontextDescData := chatcontextFields[0].Descriptor()
	// chatcontext.DefaultData holds the default value on creation for the data field.
	chatcontext.DefaultData = chatcontextDescData.Default.([]int)
	messageFields := schema.Message{}.Fields()
	_ = messageFields
	// messageDescCreatedAt is the schema descriptor for created_at field.
	messageDescCreatedAt := messageFields[0].Descriptor()
	// message.DefaultCreatedAt holds the default value on creation for the created_at field.
	message.DefaultCreatedAt = messageDescCreatedAt.Default.(func() time.Time)
}
