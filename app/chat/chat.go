package chat

import (
	"api/ent"
	"api/routes"
	"app/env"
	"app/helpers"
	"fmt"
)

func Find(id int) (*ent.Chat, error) {
	endpoint := fmt.Sprintf("%v/chat/%v", env.APIEndpoint(), id)
	chat, err := helpers.HttpRequest[ent.Chat]("GET", endpoint, nil)

	return chat, err
}

func SendMessage(id int, p routes.SendMessagePayload) (*ent.Message, error) {
	endpoint := fmt.Sprintf("%v/chat/message/%v", env.APIEndpoint(), id)

	message, err := helpers.HttpRequest[ent.Message](
		"POST",
		endpoint,
		p,
	)

	return message, err
}

func Context(id int) (*ent.ChatContext, error) {
	endpoint := fmt.Sprintf("%v/chat/context/%v", env.APIEndpoint(), id)

	context, err := helpers.HttpRequest[ent.ChatContext](
		"GET",
		endpoint,
		nil,
	)

	return context, err
}

func Create() (*ent.Chat, error) {
	endpoint := fmt.Sprintf("%v/chat", env.APIEndpoint())

	chat, err := helpers.HttpRequest[ent.Chat](
		"POST",
		endpoint,
		nil,
	)

	return chat, err
}
