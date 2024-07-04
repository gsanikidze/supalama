package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

type ErrorPayload struct {
	Message string
	Code    int
	Log     error
}

type ErrorResponse struct {
	Message string `json:"error"`
	Code    int    `json:"code"`
}

func ThrowError(c *fiber.Ctx, err ErrorPayload) error {
	resp := ErrorResponse{
		Message: err.Message,
		Code:    err.Code,
	}

	if resp.Code == 0 {
		resp.Code = 400
	}

	if err.Log != nil {
		log.Errorf("%v: %v", err.Message, err.Log)
	}

	return c.Status(resp.Code).JSON(resp)
}

type Pagination[T any] struct {
	Total int `json:"total"`
	Page  int `json:"page"`
	Data  T   `json:"data"`
}
