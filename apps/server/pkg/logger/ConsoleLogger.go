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

// Package logger contains logging services.
package logger

import (
	"fmt"
	"log"
	"time"
)

// ConsoleLogger implements the Service interface for logging to console.
type ConsoleLogger struct{}

// Close implements Service.
func (c *ConsoleLogger) Close() error {
	return nil
}

// Debugf implements Logger.
func (c *ConsoleLogger) Debugf(format string, args ...any) {
	log.Printf("[DEBUG] (%s) %s\n", time.Now().Format("2006-01-02 15:04:05"), fmt.Sprintf(format, args...))
}

// Errorf implements Logger.
func (c *ConsoleLogger) Errorf(format string, args ...any) {
	log.Printf("[ERROR] (%s) %s\n", time.Now().Format("2006-01-02 15:04:05"), fmt.Sprintf(format, args...))
}

// Infof implements Logger.
func (c *ConsoleLogger) Infof(format string, args ...any) {
	log.Printf("[INFO] (%s) %s\n", time.Now().Format("2006-01-02 15:04:05"), fmt.Sprintf(format, args...))
}

// Warnf implements Logger.
func (c *ConsoleLogger) Warnf(format string, args ...any) {
	log.Printf("[WARNING] (%s) %s\n", time.Now().Format("2006-01-02 15:04:05"), fmt.Sprintf(format, args...))
}

// Fatalf implements Logger.
func (c *ConsoleLogger) Fatalf(format string, args ...any) {
	log.Fatalf(format, args...)
}

// Requestf implements Logger.
func (c *ConsoleLogger) Requestf(format string, args ...any) {
	log.Printf("[REQUEST] (%s) %s\n", time.Now().Format("2006-01-02 15:04:05"), fmt.Sprintf(format, args...))
}

// NewConsoleLogger creates a new ConsoleLogger instance.
func NewConsoleLogger() Service {
	return &ConsoleLogger{}
}
