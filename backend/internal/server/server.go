// Copyright 2025.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Package server ...
package server

import (
	"fmt"
	"net/http"
	"time"

	"github.com/moukhtar-youssef/drivelite/backend/internal/database"
	"github.com/moukhtar-youssef/drivelite/backend/internal/storage"
	"github.com/moukhtar-youssef/drivelite/backend/pkg/logger"

	"github.com/moukhtar-youssef/drivelite/backend/internal/config"
)

// Server represents the HTTP server.
type Server struct {
	port    int
	HTTP    *http.Server
	DB      database.Service
	Storage storage.Service
	Logger  logger.Service
}

// NewServer creates and initializes a new Server instance.
func NewServer() (*Server, error) {
	// setting up database service
	dbService, err := database.New(config.DBType)
	if err != nil {
		return nil, fmt.Errorf("failed to init DB: %w", err)
	}

	// setting up storage service
	storageService, err := storage.New(config.StorageType)
	if err != nil {
		return nil, fmt.Errorf("failed to init Storage: %w", err)
	}

	// seeting up logger service
	loggerService, err := logger.New(config.LoggerType)
	if err != nil {
		return nil, fmt.Errorf("failed to init logger: %w", err)
	}

	NewServer := &Server{
		port:    config.Port,
		DB:      dbService,
		Storage: storageService,
		Logger:  loggerService,
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
