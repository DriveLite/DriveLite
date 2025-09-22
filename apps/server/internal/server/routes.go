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

// Package server ...
package server

import (
	"fmt"
	"net/http"
	"time"

	"github.com/moukhtar-youssef/drivelite/backend/internal/handlers"
	"github.com/moukhtar-youssef/drivelite/backend/internal/middlewares"
	"github.com/moukhtar-youssef/drivelite/backend/internal/utils/network"

	"github.com/moukhtar-youssef/drivelite/backend/internal/config"

	"github.com/labstack/echo-contrib/echoprometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// RegisterRoutes registers all routes for the server and returns the HTTP handler.
func (s *Server) RegisterRoutes() http.Handler {
	e := echo.New()
	setupMiddleware(e)

	handler := handlers.NewHandler(s.Repo, s.Storage, s.Logger)

	setupRoutes(e, handler)

	return e
}

func setupMiddleware(e *echo.Echo) {
	if config.AppENV == "production" {
		e.Pre(middleware.HTTPSNonWWWRedirect())
		e.Pre(middleware.HTTPSRedirect())
	}

	skipper := func(c echo.Context) bool {
		path := c.Path()
		return path == "/health" || path == "/metric"
	}
	e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		Skipper:         skipper,
		LogStatus:       true,
		LogURI:          true,
		LogRemoteIP:     true,
		LogLatency:      true,
		LogResponseSize: true,
		LogValuesFunc: func(_ echo.Context, v middleware.RequestLoggerValues) error {
			safeIP := network.NormalizeIP(v.RemoteIP)
			fmt.Printf(
				"[REQUEST] uri=%v status=%v ip=%v latency=%v size=%v\n",
				v.URI, v.Status, safeIP, v.Latency, v.ResponseSize,
			)
			return nil
		},
	}))
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"https://*", "http://*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
		MaxAge:           300,
	}))
	e.Use(middleware.ContextTimeout(60 * time.Second))
	e.Use(middleware.Recover())
	e.Use(middleware.CSRFWithConfig(middleware.CSRFConfig{
		Skipper: skipper,
	}))
	e.Use(middleware.BodyLimit("10M"))
	e.Use(middleware.RequestID())
	e.Use(middleware.Gzip())
	e.Use(middlewares.SecureMiddleware())
	e.Use(echoprometheus.NewMiddleware("DriveLite"))
}

func setupRoutes(e *echo.Echo, handler *handlers.Handler) {
	e.GET("/", handler.TestHandler)
	e.GET("/health", handler.HealthHandler)
	e.GET("/metrics", echoprometheus.NewHandler())
	apiv1 := e.Group("/api/v1")
	{
		apiv1.GET("/", handler.TestHandler)
	}
}
