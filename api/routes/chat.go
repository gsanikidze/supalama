package routes

import (
	"api/helpers"

	"github.com/gofiber/fiber/v2"
)

func CreateChat(c *fiber.Ctx) error {
	chat, err := helpers.DB.Chat.Create().Save(c.Context())

	if err != nil {
		return ThrowError(c, ErrorPayload{
			Message: err.Error(),
		})
	}

	return c.JSON(chat)
}
