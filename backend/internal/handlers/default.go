// DriveLite - The self-hostable file storage solution.
// Copyright (C) 2025  
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
