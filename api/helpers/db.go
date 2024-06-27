package helpers

import (
	"api/ent"
	"api/ent/migrate"
	"context"
	"fmt"
	"log"
	"os"
)

func ConnectDB() {
	dbConnection := fmt.Sprintf(
		"host=%v user=%v password=%v dbname=%v port=%v sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

	dbClient, dbClientError := ent.Open("postgres", dbConnection)

	if dbClientError != nil {
		log.Fatal("db connection failed: ", dbClientError)
	}

	migrationError := dbClient.Schema.Create(
		context.Background(),
		migrate.WithDropIndex(true),
		migrate.WithDropColumn(true),
		migrate.WithForeignKeys(true),
	)

	if migrationError != nil {
		log.Fatal("db migration failed: ", migrationError)
	}

	DB = dbClient
}

var DB *ent.Client
