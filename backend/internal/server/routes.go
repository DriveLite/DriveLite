// Package server ...
package server

import (
	"DriveLite/internal/handlers"
	"DriveLite/internal/middlewares"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func (s *Server) RegisterRoutes() http.Handler {
	e := echo.New()
	setupMiddleware(e)

	handler := handlers.NewHandler(s.DB)

	e.GET("/", handler.HelloWorld)
	e.GET("/health", handler.Health)

	return e
}

func setupMiddleware(e *echo.Echo) {
	skipper := func(c echo.Context) bool {
		// Skip health check endpoint
		return c.Request().URL.Path == "/health"
	}
	e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogStatus:       true,
		LogURI:          true,
		Skipper:         skipper,
		LogRemoteIP:     true,
		LogLatency:      true,
		LogResponseSize: true,
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			fmt.Printf("REQUEST: uri: %v, status: %v, IP: %v, Latency: %v, ResponseSize: %v\n", v.URI, v.Status, v.RemoteIP, v.Latency, v.ResponseSize)
			return nil
		},
	}))
	e.Use(echo.MiddlewareFunc(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Request().Body = http.MaxBytesReader(c.Response(), c.Request().Body, 10<<20)
			return next(c)
		}
	}))
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"https://*", "http://*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
		MaxAge:           300,
	}))
	e.Use(middleware.Recover())
	e.Use(middleware.CSRF())
	e.Use(middleware.BodyLimit("10M"))
	e.Use(middlewares.SecureMiddleware())
}
