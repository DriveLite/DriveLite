package users

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
	"github.com/moukhtar-youssef/drivelite/backend/internal/models"
)

// sqliteRepo implements UsersRepository for SQLite
type sqliteRepo struct {
	db *sql.DB
}

// NewSQLiteRepo returns a SQLite implementation of UsersRepository
func NewSQLiteRepo(db *sql.DB) UsersRepository {
	return &sqliteRepo{db: db}
}

// CreateUser inserts a new user into the SQLite database
func (r *sqliteRepo) CreateUser(ctx context.Context, u *models.User) error {
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
func (r *sqliteRepo) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
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
func (r *sqliteRepo) DeleteUserByEmail(ctx context.Context, email string) error {
	query := `DELETE FROM users WHERE email = ?1`
	_, err := r.db.ExecContext(ctx, query, email)
	return err
}
