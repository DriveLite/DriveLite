package filename

import (
	"path/filepath"
	"regexp"
)

var safefilenameRegex = regexp.MustCompile(`^[a-zA-Z0-9._-]+$`)

func SanatizeFilename(name string) string {
	base := filepath.Base(name)
	if !safefilenameRegex.MatchString(base) {
		return "file"
	}
	return base
}
