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

// Package config provides environment configuration helpers.
package config

import (
	"encoding/base64"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/moukhtar-youssef/drivelite/backend/internal/repositories"
)

var (
	// Port is the HTTP server port loaded from environment variables.
	Port int
	// StorageType is the storage type used loaded from environment variables.
	StorageType string
	// LoggerType is the logger type used loaded from environment variables.
	LoggerType string
	// AppENV is Which state the backend is which is loaded from environment variables.
	AppENV string
	// EncKey is the encryption key for token encryption and decryption loaded from environment variables.
	EncKey []byte
	// JWTSecret is the secret used to sign JWT loaded from environment variables.
	JWTSecret []byte
)

// GetEnv returns the environment variable for the given key,
// or defaultvalue if the key is not set.
func GetEnv(key string, defaultvalue string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		return defaultvalue
	}
	return value
}

// RequiredEnv returns the value of the environment variable for the given key.
// It panics if the key is not set.
func RequiredEnv(key string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		panic(fmt.Sprintf("environment variable %s must be set", key))
	}
	return value
}

// Load reads required environment variables and validates them.
// It populates the global config variables like Port, DBType, StorageType, JWTSecret, and EncKey.
func Load() {
	var err error

	Port, err = strconv.Atoi(RequiredEnv("BACKEND_PORT"))
	if err != nil || Port <= 0 || Port > 65535 {
		log.Fatal("BACKEND_PORT must be a valid port number")
	}

	StorageType = RequiredEnv("BACKEND_STORAGE_TYPE")
	LoggerType = GetEnv("LOGGER_TYPE", "console")
	AppENV = GetEnv("APP_ENV", "development")

	EncKey, err = base64.StdEncoding.DecodeString(RequiredEnv("BACKEND_REFRESH_KEY"))
	if err != nil || len(EncKey) != 32 {
		log.Fatal("Invalid encryption key, must be 32 bytes base64")
	}

	JWTSecret = []byte(RequiredEnv("BACKEND_JWT_SECRET"))
	if len(JWTSecret) < 32 {
		log.Fatal("JWT_SECRET must be at least 32 bytes")
	}
}

func RepoConfig() repositories.Config {
	return repositories.Config{
		Driver:   GetEnv("BACKEND_DB_TYPE", "sqlite"),
		Host:     GetEnv("BACKEND_DB_HOST", "localhost"),
		Port:     GetEnv("BACKEND_DB_PORT", "5432"),
		User:     GetEnv("BACKEND_DB_USERNAME", "postgres"),
		Password: GetEnv("BACKEND_DB_PASSWORD", ""),
		DBName:   GetEnv("BACKEND_DB_DATABASE", "drivelite"),
		Schema:   GetEnv("BACKEND_DB_SCHEMA", "public"),
		SSLMode:  GetEnv("BACKEND_DB_SSLMODE", "disable"),
		FilePath: GetEnv("BACKEND_DB_FILEPATH", "./drivelite.db"),
	}
}
