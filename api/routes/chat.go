package routes

import (
	"api/ent/chat"
	"api/ent/chatcontext"
	"api/ent/message"
	"api/helpers"

	"github.com/gofiber/fiber/v2"
)

func CreateChat(c *fiber.Ctx) error {
	tx, err := helpers.DB.Tx(c.Context())

	if err != nil {
		return ThrowError(c, ErrorPayload{
			Message: err.Error(),
		})
	}

	chat, err := tx.Chat.Create().Save(c.Context())

	if err != nil {
		return ThrowError(c, ErrorPayload{
			Message: err.Error(),
		})
	}

	_, ctxErr := tx.ChatContext.Create().
		SetChat(chat).
		Save(c.Context())

	if ctxErr != nil {
		tx.Rollback()

		return ThrowError(c, ErrorPayload{
			Message: ctxErr.Error(),
		})
	}

	txErr := tx.Commit()

	if txErr != nil {
		return ThrowError(c, ErrorPayload{
			Message: txErr.Error(),
		})
	}

	return c.JSON(chat)
}

func FindChat(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return ThrowError(c, ErrorPayload{
			Message: err.Error(),
		})
	}

	chat, err := helpers.DB.Chat.Get(c.Context(), id)

	if err != nil {
		return ThrowError(c, ErrorPayload{
			Message: err.Error(),
		})
	}

	return c.JSON(chat)
}

func FindChatContext(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return ThrowError(c, ErrorPayload{
			Message: err.Error(),
		})
	}

	chatContext, err := helpers.DB.ChatContext.
		Query().
		Where(chatcontext.HasChatWith(chat.IDEQ(id))).
		Only(c.Context())

	if err != nil {
		return ThrowError(c, ErrorPayload{
			Message: err.Error(),
		})
	}

	return c.JSON(chatContext)
}

type SendMessagePayload struct {
	Text    string         `json:"text"`
	Context []int          `json:"context"`
	Author  message.Author `json:"author"`
}

func SendMessage(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return ThrowError(c, ErrorPayload{
			Message: err.Error(),
		})
	}

	tx, err := helpers.DB.Tx(c.Context())

	if err != nil {
		return ThrowError(c, ErrorPayload{
			Message: err.Error(),
		})
	}

	b := new(SendMessagePayload)

	if err := c.BodyParser(b); err != nil {
		return ThrowError(c, ErrorPayload{
			Message: err.Error(),
		})
	}

	message, err := tx.Message.Create().
		SetText(b.Text).
		SetChatID(id).
		SetAuthor(b.Author).
		Save(c.Context())

	if err != nil {
		return ThrowError(c, ErrorPayload{
			Message: err.Error(),
		})
	}

	chatContext, err := tx.ChatContext.
		Query().
		Where(chatcontext.HasChatWith(chat.IDEQ(id))).
		Only(c.Context())

	if err != nil {
		tx.Rollback()

		return ThrowError(c, ErrorPayload{
			Message: err.Error(),
		})
	}

	_, ctxErr := chatContext.
		Update().
		SetData(b.Context).
		Save(c.Context())

	if ctxErr != nil {
		tx.Rollback()

		return ThrowError(c, ErrorPayload{
			Message: ctxErr.Error(),
		})
	}

	txErr := tx.Commit()

	if txErr != nil {
		return ThrowError(c, ErrorPayload{
			Message: txErr.Error(),
		})
	}

	return c.JSON(message)
}
