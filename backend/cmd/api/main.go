package main

import (
	"DriveLite/internal/database"
	"DriveLite/internal/server"
	"context"
	"fmt"
	"log"
	"net/http"
	"os/signal"
	"syscall"
	"time"

	"github.com/joho/godotenv"
)

func gracefulShutdown(apiServer *http.Server, db database.Service, done chan bool) {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	<-ctx.Done()

	log.Println("shutting down gracefully, press Ctrl+C again to force")
	stop() // Allow Ctrl+C to force shutdown

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := apiServer.Shutdown(ctx); err != nil {
		log.Printf("Server forced to shutdown with error: %v", err)
	}

	log.Println("Database closing")
	if err := db.Close(); err != nil {
		log.Printf("Error closing database: %v", err)
	} else {
		log.Println("Database connection closed successfully")
	}

	log.Println("Server exiting")

	done <- true
}

func init() {
	_ = godotenv.Load()
}

func main() {
	srv, err := server.NewServer()
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}

	done := make(chan bool, 1)

	go gracefulShutdown(srv.HTTP, srv.DB, done)

	err = srv.HTTP.ListenAndServe()
	if err != nil && err != http.ErrServerClosed {
		panic(fmt.Sprintf("http server error: %s", err))
	}

	<-done
	log.Println("Graceful shutdown complete.")
}
