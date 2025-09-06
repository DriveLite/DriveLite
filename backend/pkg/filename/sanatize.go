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

// Package filename provides utility functions to sanitize filenames.
package filename

import (
	"path/filepath"
	"regexp"
)

var safefilenameRegex = regexp.MustCompile(`^[a-zA-Z0-9._-]+$`)

// SanatizeFilename sanitizes a filename by removing invalid characters.
func SanatizeFilename(name string) string {
	base := filepath.Base(name)
	if !safefilenameRegex.MatchString(base) {
		return "file"
	}
	return base
}
