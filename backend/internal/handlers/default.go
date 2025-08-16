package handlers

import (
	"DriveLite/internal/database"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Handler struct {
	DB database.Service
}

func NewHandler(db database.Service) *Handler {
	return &Handler{DB: db}
}

func (h *Handler) HelloWorld(c echo.Context) error {
	resp := map[string]string{
		"message": "Hello World",
	}
	return c.JSON(http.StatusOK, resp)
}

func (h *Handler) Health(c echo.Context) error {
	return c.JSON(http.StatusOK, h.DB.Health())
}
