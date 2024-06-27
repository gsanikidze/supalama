package main

import (
	"api/helpers"
	"api/routes"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func main() {
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal("Error getting current working directory: ", err)
	}

	envFile := filepath.Join(cwd, ".env")
	err = godotenv.Load(envFile)
	if err != nil {
		log.Fatal("Error loading .env file: ", err)
	}

	helpers.ConnectDB()
	defer helpers.DB.Close()

	app := routes.New()
	port := fmt.Sprintf(":%v", os.Getenv("PORT"))
	log.Fatal(app.Listen(port))
}
