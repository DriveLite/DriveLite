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

// Package handlers contains HTTP request handlers.
package handlers

import (
	"net/http"

	"github.com/moukhtar-youssef/drivelite/backend/internal/database"
	"github.com/moukhtar-youssef/drivelite/backend/internal/storage"
	"github.com/moukhtar-youssef/drivelite/backend/pkg/logger"

	"github.com/labstack/echo/v4"
)

// Handler handles HTTP requests.
type Handler struct {
	DB      database.Service
	Storage storage.Service
	Logger  logger.Service
}

// NewHandler creates a new Handler instance.
func NewHandler(db database.Service, storage storage.Service, logger logger.Service) *Handler {
	return &Handler{DB: db, Storage: storage, Logger: logger}
}

// TestHandler is a simple endpoint to test server connectivity.
func (h *Handler) TestHandler(c echo.Context) error {
	resp := map[string]string{
		"message": "This is a test",
	}
	return c.JSON(http.StatusOK, resp)
}

// HealthHandler returns a 200 OK status to indicate server health and check DB health.
func (h *Handler) HealthHandler(c echo.Context) error {
	return c.JSON(http.StatusOK, h.DB.Health())
}
