package users

import (
	"context"

	"github.com/moukhtar-youssef/drivelite/backend/internal/models"
)

type UsersRepository interface {
	CreateUser(ctx context.Context, u *models.User) error
	GetUserByEmail(ctx context.Context, email string) (*models.User, error)
	DeleteUserByEmail(ctx context.Context, email string) error
}
