package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/monitor"
)

func New() *fiber.App {
	app := fiber.New()
	app.Use(cors.New())
	app.Use(compress.New())
	app.Use(helmet.New())
	app.Static("/pub", "./public")

	apiRoute := app.Group("/api")
	apiRoute.Get("/metric", monitor.New())

	chatRoutes := apiRoute.Group("/chat")
	chatRoutes.Post("/", CreateChat)

	return app
}
