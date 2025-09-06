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

// Package logger contains logging services.
package logger

import (
	"errors"
)

// Service defines the logging interface.
type Service interface {
	Debugf(format string, args ...any)
	Infof(format string, args ...any)
	Warnf(format string, args ...any)
	Errorf(format string, args ...any)
	Fatalf(format string, args ...any)
	Close() error
}

// New returns a logging Service based on the provided type.
func New(lgtype string) (Service, error) {
	switch lgtype {
	case "console":
		return NewConsoleLogger(), nil
	default:
		return nil, errors.New("unsupported log type")
	}
}
