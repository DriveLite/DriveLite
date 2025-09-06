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

// NewConsoleLogger creates a new ConsoleLogger instance.
func NewConsoleLogger() Service {
	return &ConsoleLogger{}
}
