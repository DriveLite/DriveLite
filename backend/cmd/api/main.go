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
	stop() // Allow Ctrl+C to force shutdown

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := apiServer.HTTP.Shutdown(ctx); err != nil {
		apiServer.Logger.Infof("Server forced to shutfown with error: %v", err)
	}

	apiServer.Logger.Infof("Database closing")
	if err := apiServer.DB.Close(); err != nil {
		apiServer.Logger.Errorf("Error closing database: %v", err)
	} else {
		apiServer.Logger.Infof("Database connection closed successfully")
	}

	apiServer.Logger.Infof("Storage closing")
	if err := apiServer.Storage.Close(); err != nil {
		apiServer.Logger.Errorf("Error closing storage: %v", err)
	} else {
		apiServer.Logger.Infof("Storafe connection closed successfully")
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
