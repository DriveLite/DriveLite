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
package networkutils_test

import (
	"net"
	"testing"

	"github.com/moukhtar-youssef/drivelite/backend/internal/utils/networkutils"
	"github.com/stretchr/testify/assert"
)

func TestNormalizeIP(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"127.0.0.1", "127.0.0.1"},
		{"::1", "127.0.0.1"},
		{"192.168.1.10", "192.168.1.10"},
		{"2001:db8::1", "2001:db8::1"},
		{"", ""},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			assert.Equal(t, tt.expected, networkutils.NormalizeIP(tt.input))
		})
	}
}

func FuzzTestNormalizeIP(f *testing.F) {
	seeds := []string{
		"127.0.0.1",
		"::1",
		"192.168.0.1",
		"255.255.255.255",
		"0.0.0.0",
		"2001:db8::1",
	}

	for _, seed := range seeds {
		f.Add(seed)
	}

	f.Fuzz(func(t *testing.T, input string) {
		output := networkutils.NormalizeIP(input)

		parsed := net.ParseIP(input)
		if parsed != nil && parsed.IsLoopback() {
			assert.Equal(t, "127.0.0.1", output,
				"loopback %q should normalize to 127.0.0.1", input)
		} else {
			assert.Equal(t, input, output,
				"non-loopback or invalid %q should stay unchanged", input)
		}

		assert.Equal(t, output, networkutils.NormalizeIP(output),
			"NormalizeIP should be idempotent for %q", input)
	})
}
