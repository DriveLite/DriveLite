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

	"github.com/moukhtar-youssef/drivelite/backend/internal/handlers"
	"github.com/moukhtar-youssef/drivelite/backend/internal/middlewares"
	networkutils "github.com/moukhtar-youssef/drivelite/backend/internal/utils/network_utils"

	"github.com/moukhtar-youssef/drivelite/backend/internal/config"

	"github.com/labstack/echo-contrib/echoprometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// RegisterRoutes registers all routes for the server and returns the HTTP handler.
func (s *Server) RegisterRoutes() http.Handler {
	e := echo.New()
	setupMiddleware(e)

	handler := handlers.NewHandler(s.DB, s.Storage, s.Logger)

	e.GET("/", handler.TestHandler)
	e.GET("/health", handler.HealthHandler)
	e.GET("/metrics", echoprometheus.NewHandler())

	return e
}

func setupMiddleware(e *echo.Echo) {
	if config.AppENV == "production" {
		e.Pre(middleware.HTTPSNonWWWRedirect())
	}

	skipper := func(c echo.Context) bool {
		path := c.Path()
		return path == "/health"
	}
	e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogStatus:       true,
		LogURI:          true,
		Skipper:         skipper,
		LogRemoteIP:     true,
		LogLatency:      true,
		LogResponseSize: true,
		LogValuesFunc: func(_ echo.Context, v middleware.RequestLoggerValues) error {
			fmt.Printf(
				"REQUEST: uri: %v, status: %v, IP: %v, Latency: %v, ResponseSize: %v\n",
				v.URI, v.Status, networkutils.NormalizeIP(v.RemoteIP), v.Latency, v.ResponseSize,
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
		Skipper: func(c echo.Context) bool {
			return c.Path() == "/health" || c.Path() == "/metrics"
		},
	}))
	e.Use(middleware.BodyLimit("10M"))
	e.Use(middleware.RequestID())
	e.Use(middleware.Gzip())
	e.Use(middlewares.SecureMiddleware())
	e.Use(echoprometheus.NewMiddleware("DriveLite"))
}
