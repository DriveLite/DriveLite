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

// Package cryptotokenutils provides helpers for encrypting, decrypting,
// and generating authentication tokens securely.
package cryptotokenutils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
)

// GenerateAccessToken creates a signed JWT access token for the given user ID.
func GenerateAccessToken(userID uuid.UUID, secret []byte) (string, error) {
	exp := time.Now().Add(15 * time.Minute).Unix()
	claims := jwt.MapClaims{
		"user_id": userID.String(),
		"exp":     exp,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodES256, claims)
	return token.SignedString(secret)
}
