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

package repositories

import (
	"fmt"

	"github.com/moukhtar-youssef/drivelite/backend/internal/repositories/users"
)

type Service interface {
	Close() error
	Health() map[string]string
	Init() error

	Users() users.UsersRepository
}

type Config struct {
	Driver   string
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
	SSLMode  string
	Schema   string
	FilePath string
}

func New(cfg Config) (Service, error) {
	switch cfg.Driver {
	case "postgres":
		return newPostgresRepoService(cfg)
	case "sqlite":
		return newSQLiteRepoService(cfg)
	default:
		return nil, fmt.Errorf("unsupported driver: %s", cfg.Driver)
	}
}
