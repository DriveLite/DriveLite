package server

import (
	"fmt"
	"net/http"
	"time"

	"github.com/moukhtar-youssef/drivelite/backend/internal/config"
	"github.com/moukhtar-youssef/drivelite/backend/internal/repo"
	"github.com/moukhtar-youssef/drivelite/backend/internal/storage"
	"github.com/moukhtar-youssef/drivelite/backend/pkg/logger"
)

// Server represents the HTTP server.
type Server struct {
	port    int
	HTTP    *http.Server
	Repo    repo.Repository
	Storage storage.Service
	Logger  logger.Service
}

// NewServer creates and initializes a new Server instance.
func NewServer() (*Server, error) {
	// Get database configuration
	RepoConfig := config.RepoConfig()

	// Initialize database service
	RepoService, err := repo.New(RepoConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to init DB: %w", err)
	}

	// Initialize storage service
	storageService, err := storage.New(config.StorageType)
	if err != nil {
		return nil, fmt.Errorf("failed to init Storage: %w", err)
	}

	// Initialize logger service
	loggerService, err := logger.New(config.LoggerType)
	if err != nil {
		return nil, fmt.Errorf("failed to init logger: %w", err)
	}

	server := &Server{
		port:    config.Port,
		Repo:    RepoService,
		Storage: storageService,
		Logger:  loggerService,
	}

	// Configure HTTP server
	server.HTTP = &http.Server{
		Addr:         fmt.Sprintf(":%d", server.port),
		Handler:      server.RegisterRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server, nil
}
