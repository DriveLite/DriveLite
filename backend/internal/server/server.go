// Package server ...
package server

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"
)

// Server is Main server struct
type Server struct {
	port int
}

// NewServer is a function to create a new http server with chi routes
func NewServer() *http.Server {
	port, _ := strconv.Atoi(os.Getenv("PORT"))
	NewServer := &Server{
		port: port,
	}

	// Declare Server config
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", NewServer.port),
		Handler:      NewServer.RegisterRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server
}
