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

// Package database provides database connection and service interfaces.
package database

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/moukhtar-youssef/drivelite/backend/internal/config"

	// Import pgx driver for database/sql
	_ "github.com/jackc/pgx/v5/stdlib"
)

type postgresService struct {
	db *sql.DB
}

// NewPostgres creates a new PostgreSQL database service.
func NewPostgres() (Service, error) {
	connStr := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable&search_path=%s",
		config.RequiredEnv("BACKEND_DB_USERNAME"),
		config.RequiredEnv("BACKEND_DB_PASSWORD"),
		config.RequiredEnv("BACKEND_DB_HOST"),
		config.RequiredEnv("BACKEND_DB_PORT"),
		config.RequiredEnv("BACKEND_DB_DATABASE"),
		config.RequiredEnv("BACKEND_DB_SCHEMA"),
	)

	db, err := sql.Open("pgx", connStr)
	if err != nil {
		return nil, err
	}
	db.SetMaxIdleConns(50)
	db.SetMaxOpenConns(25)
	db.SetConnMaxLifetime(time.Hour)

	postgresdb := &postgresService{db: db}

	return postgresdb, nil
}

func (postgresdb *postgresService) Health() map[string]string {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()
	stats := make(map[string]string)
	err := postgresdb.db.PingContext(ctx)
	if err != nil {
		stats["status"] = "down"
		stats["error"] = fmt.Sprintf("db down: %v", err)
		log.Printf("db down: %v", err)
		return stats
	}
	stats["status"] = "up"
	stats["message"] = "It's healthy"

	dbStats := postgresdb.db.Stats()
	stats["open_connections"] = strconv.Itoa(dbStats.OpenConnections)
	stats["in_use"] = strconv.Itoa(dbStats.InUse)
	stats["idle"] = strconv.Itoa(dbStats.Idle)
	stats["wait_count"] = strconv.FormatInt(dbStats.WaitCount, 10)
	stats["wait_duration"] = dbStats.WaitDuration.String()
	stats["max_idle_closed"] = strconv.FormatInt(dbStats.MaxIdleClosed, 10)
	stats["max_lifetime_closed"] = strconv.FormatInt(dbStats.MaxLifetimeClosed, 10)

	if dbStats.OpenConnections > 40 { // Assuming 50 is the max for this example
		stats["message"] = "The database is experiencing heavy load."
	}

	if dbStats.WaitCount > 1000 {
		stats["message"] = "The database has a high number of wait events, indicating potential bottlenecks."
	}

	if dbStats.MaxIdleClosed > int64(dbStats.OpenConnections)/2 {
		stats["message"] = "Many idle connections are being closed, consider revising the connection pool settings."
	}

	if dbStats.MaxLifetimeClosed > int64(dbStats.OpenConnections)/2 {
		stats["message"] = "Many connections are being closed due to max lifetime, " +
			"consider increasing max lifetime or revising the connection usage pattern."
	}

	return stats
}

func (postgresdb *postgresService) Close() error {
	return postgresdb.db.Close()
}
