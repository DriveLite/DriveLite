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

// Package storage provides storage service interfaces and implementations.
package storage

import "errors"

// Service defines a common storage interface
type Service interface {
	Health() map[string]string
	Close() error
}

// New creates a new storage service based on the configuration.
func New(storageType string) (Service, error) {
	switch storageType {
	case "MinIO":
		return newMinIO()
	default:
		return nil, errors.New("unsupported storage type")
	}
}
