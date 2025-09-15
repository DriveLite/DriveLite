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

package users

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
	"github.com/moukhtar-youssef/drivelite/backend/internal/models"
)

// postgresRepo implements UsersRepository for Postgres
type postgresRepo struct {
	db *sql.DB
}

// NewSQLiteRepo returns a Postgres implementation of UsersRepository
func NewPostgresRepo(db *sql.DB) UsersRepository {
	return &postgresRepo{db: db}
}

// CreateUser inserts a new user into the Postgres database
func (r *postgresRepo) CreateUser(ctx context.Context, u *models.User) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	if u.CreatedAt.IsZero() {
		u.CreatedAt = time.Now()
	}
	u.UpdatedAt = time.Now()

	query := `
		INSERT INTO users (id, email,  created_at, updated_at)
		VALUES (?1, ?2, ?3, ?4)
	`

	_, err := r.db.ExecContext(ctx, query,
		u.ID, u.Email, u.CreatedAt, u.UpdatedAt)
	return err
}

// GetUserByEmail fetches a user by email
func (r *postgresRepo) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	query := `
		SELECT id, email, name, created_at, updated_at
		FROM users
		WHERE email = ?1
	`
	row := r.db.QueryRowContext(ctx, query, email)

	u := &models.User{}
	if err := row.Scan(&u.ID, &u.Email, &u.CreatedAt, &u.UpdatedAt); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // user not found
		}
		return nil, err
	}

	return u, nil
}

// DeleteUserByEmail deletes a user by email
func (r *postgresRepo) DeleteUserByEmail(ctx context.Context, email string) error {
	query := `DELETE FROM users WHERE email = ?1`
	_, err := r.db.ExecContext(ctx, query, email)
	return err
}
