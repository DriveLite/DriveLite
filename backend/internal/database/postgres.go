package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
)

type postgresService struct {
	db *sql.DB
}

func NewPostgres() (Service, error) {
	connStr := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable&search_path=%s",
		os.Getenv("BACKEND_DB_USERNAME"),
		os.Getenv("BACKEND_DB_PASSWORD"),
		os.Getenv("BACKEND_DB_HOST"),
		os.Getenv("BACKEND_DB_PORT"),
		os.Getenv("BACKEND_DB_DATABASE"),
		os.Getenv("BACKEND_DB_SCHEMA"),
	)

	db, err := sql.Open("pgx", connStr)
	if err != nil {
		return nil, err
	}

	postgresdb := &postgresService{db: db}

	return postgresdb, nil
}

func (postgresdb *postgresService) Health() map[string]string {
	stats := make(map[string]string)
	if err := postgresdb.db.Ping(); err != nil {
		stats["status"] = "down"
		stats["error"] = err.Error()
	} else {
		stats["status"] = "up"
	}
	return stats
}

func (postgresdb *postgresService) Close() error {
	log.Println("Closing Postgres connection")
	return postgresdb.db.Close()
}
