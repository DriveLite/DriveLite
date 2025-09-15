package repo

import (
	"fmt"

	"github.com/moukhtar-youssef/drivelite/backend/internal/repo/users"
)

type Repository interface {
	Close() error
	Health() map[string]string

	Users() users.UsersRepository
}

type Config struct {
	Driver   string
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
	SSLMode  string
	Schema   string
	FilePath string
}

func New(cfg Config) (Repository, error) {
	switch cfg.Driver {
	case "postgres":
		return newPostgresRepoService(cfg)
	case "sqlite":
		return newSQLiteRepoService(cfg)
	default:
		return nil, fmt.Errorf("unsupported driver: %s", cfg.Driver)
	}
}
