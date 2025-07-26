package server

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"reflect"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

type response struct {
	Message string `json:"message"`
}

func (s *Server) RegisterRoutes() http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	r.Get("/", s.HelloWorldHandler)

	return r
}

func (s *Server) HelloWorldHandler(w http.ResponseWriter, r *http.Request) {
	resp := response{
		Message: "Hello world",
	}
	Cookie := http.Cookie{
		Name:     "auth_toekn",
		Value:    "Hello",
		Path:     "/",
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
	}

	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("error handling JSON marshal. Err: %v", err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	http.SetCookie(w, &Cookie)
	_, _ = w.Write(jsonResp)
}

func parseRequest(r *http.Request, target any) error {
	contentType := r.Header.Get("Content-Type")

	if contentType == "application/json" {
		return json.NewDecoder(r.Body).Decode(target)
	}

	if contentType == "application/xml" || contentType == "text/xml" {
		return xml.NewDecoder(r.Body).Decode(target)
	}

	if contentType == "application/x-www-form-urlencoded" {
		if err := r.ParseForm(); err != nil {
			return err
		}
		return formToStruct(r.Form, target)
	}

	if r.URL.Query().Get("") != "" {
		return formToStruct(r.URL.Query(), target)
	}
	if r.Header.Get("") != "" {
		return headerToStruct(r.Header, target)
	}
	return fmt.Errorf("unsupported content type: %s", contentType)
}

func formToStruct(form url.Values, target any) error {
	val := reflect.ValueOf(target).Elem()
	typ := val.Type()

	for i := range val.NumField() {
		field := typ.Field(i)
		tag := field.Tag.Get("form")
		if tag == "" {
			tag = strings.ToLower(field.Name)
		}

		if values, ok := form[tag]; ok && len(values) > 0 {
			fieldValue := val.Field(i)
			if fieldValue.CanSet() {
				fieldValue.SetString(values[0])
			}
		}
	}
	return nil
}

func headerToStruct(header http.Header, target any) error {
	val := reflect.ValueOf(target).Elem()
	typ := val.Type()

	for i := range val.NumField() {
		field := typ.Field(i)
		tag := field.Tag.Get("header")
		if tag == "" {
			tag = strings.ToLower(field.Name)
		}

		if values, ok := header[tag]; ok && len(values) > 0 {
			fieldValue := val.Field(i)
			if fieldValue.CanSet() {
				fieldValue.SetString(values[0])
			}
		}
	}
	return nil
}
