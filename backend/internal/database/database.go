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
