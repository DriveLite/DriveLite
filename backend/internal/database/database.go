package database

import (
	"errors"
)

// Service defines a common DB interface
type Service interface {
	Health() map[string]string
	Close() error
}

// Factory method to pick correct DB
func New(dbType string) (Service, error) {
	switch dbType {
	case "postgres":
		return NewPostgres()
	default:
		return nil, errors.New("unsupported db")
	}
}
