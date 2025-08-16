// Package server ...
package server

import (
	"DriveLite/internal/database"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"
)

type Server struct {
	port int
	HTTP *http.Server
	DB   database.Service
}

func NewServer() (*Server, error) {
	port, _ := strconv.Atoi(os.Getenv("BACKEND_PORT"))
	dbType := os.Getenv("BACKEND_DB_TYPE")
	if dbType == "" {
		return nil, fmt.Errorf("BACKEND_DB_TYPE must be set in .env postgres")
	}
	dbService, err := database.New(dbType)
	if err != nil {
		return nil, fmt.Errorf("failed to init DB: %w", err)
	}
	NewServer := &Server{
		port: port,
		DB:   dbService,
	}

	// Declare Server config
	NewServer.HTTP = &http.Server{
		Addr:         fmt.Sprintf(":%d", NewServer.port),
		Handler:      NewServer.RegisterRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return NewServer, nil
}
