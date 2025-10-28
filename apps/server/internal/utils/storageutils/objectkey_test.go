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

package storageutils_test

import (
	"encoding/hex"
	"testing"

	storageutils "github.com/moukhtar-youssef/drivelite/backend/internal/utils/storage"
)

func TestGenerateObjectKey(t *testing.T) {
	key := storageutils.GenerateObjectKey()

	if key == "" {
		t.Fatal("GenerateObjectKey returned an empty string")
	}

	if len(key) != 32 {
		t.Fatalf("expected key length 32, got %d", len(key))
	}

	_, err := hex.DecodeString(key)
	if err != nil {
		t.Fatalf("key is not valid hex: %v", err)
	}
}

func FuzzGenerateObjectKey(f *testing.F) {
	f.Fuzz(func(t *testing.T, seed string) {
		key := storageutils.GenerateObjectKey()

		if key == "" {
			t.Fatal("GenerateObjectKey returned empty string")
		}

		if len(key) != 32 {
			t.Fatalf("expected key length 32, got %d", len(key))
		}

		if _, err := hex.DecodeString(key); err != nil {
			t.Fatalf("key is not valid hex: %v", err)
		}
	})
}
