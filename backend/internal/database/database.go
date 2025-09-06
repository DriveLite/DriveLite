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

// Package database provides database connection and service interfaces.
package database

import (
	"errors"
)

// Service defines a common DB interface
type Service interface {
	Health() map[string]string
	Close() error
}

// New creates a new database service based on the configuration.
func New(dbType string) (Service, error) {
	switch dbType {
	case "postgres":
		return NewPostgres()
	default:
		return nil, errors.New("unsupported db")
	}
}
