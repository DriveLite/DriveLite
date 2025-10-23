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

// Package main starts the API server for the project.
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os/signal"
	"syscall"
	"time"

	"github.com/moukhtar-youssef/drivelite/backend/internal/config"
	"github.com/moukhtar-youssef/drivelite/backend/internal/server"

	"github.com/joho/godotenv"
)

func gracefulShutdown(apiServer *server.Server, done chan bool) {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	<-ctx.Done()

	apiServer.Logger.Infof("Shutting down gracefully, press Ctrl+c again to force")
	stop()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := apiServer.HTTP.Shutdown(ctx); err != nil {
		apiServer.Logger.Infof("Server forced to shutfown with error: %v", err)
	}

	apiServer.Logger.Infof("Database closing")
	if err := apiServer.Repo.Close(); err != nil {
		apiServer.Logger.Errorf("Error closing database: %v", err)
	} else {
		apiServer.Logger.Infof("Database connection closed successfully")
	}

	apiServer.Logger.Infof("Storage closing")
	if err := apiServer.Storage.Close(); err != nil {
		apiServer.Logger.Errorf("Error closing storage: %v", err)
	} else {
		apiServer.Logger.Infof("Storage connection closed successfully")
	}

	apiServer.Logger.Infof("Logger closing")
	if err := apiServer.Logger.Close(); err != nil {
		log.Printf("Error closing logger: %v", err)
	} else {
		log.Println("Logger closed successfully")
	}

	log.Println("Server exiting")

	done <- true
}

func init() {
	_ = godotenv.Load()
	config.Load()
	log.SetFlags(0)
}

func main() {
	srv, err := server.NewServer()
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}

	done := make(chan bool, 1)

	go gracefulShutdown(srv, done)

	srv.Logger.Infof("Server is running on %v", srv.HTTP.Addr)
	err = srv.HTTP.ListenAndServe()
	if err != nil && err != http.ErrServerClosed {
		panic(fmt.Sprintf("http server error: %s", err))
	}

	<-done
	log.Println("Graceful shutdown complete.")
}
