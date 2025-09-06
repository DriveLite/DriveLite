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
