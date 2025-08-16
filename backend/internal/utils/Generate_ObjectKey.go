package utils

import (
	"crypto/rand"
	"fmt"
)

func GenerateObjectKey() string {
	b := make([]byte, 16)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}
