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
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
	"github.com/moukhtar-youssef/drivelite/backend/internal/repositories/users"
)

type sqliteRepoService struct {
	db        *sql.DB
	usersRepo users.UsersRepository
}

// Init implements Repository.
func (s *sqliteRepoService) Init() error {
	return nil
}

func newSQLiteRepoService(cfg Config) (Service, error) {
	path := cfg.FilePath
	if path == "" {
		path = "./drivelite.db"
	}

	db, err := sql.Open("sqlite3", path+"?_journal_mode=WAL&_foreign_keys=on")
	if err != nil {
		return nil, fmt.Errorf("failed to open sqlite db: %w", err)
	}

	// Simple ping to verify connection
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("sqlite ping failed: %w", err)
	}

	return &sqliteRepoService{
		db:        db,
		usersRepo: users.NewSQLiteRepo(db),
	}, nil
}

func (s *sqliteRepoService) Close() error {
	return s.db.Close()
}

func (s *sqliteRepoService) Health() map[string]string {
	status := map[string]string{"status": "up"}
	if err := s.db.Ping(); err != nil {
		status["status"] = "down"
		status["error"] = err.Error()
	}
	return status
}

func (s *sqliteRepoService) Users() users.UsersRepository {
	return s.usersRepo
}
