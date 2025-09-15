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

package network_test

import (
	"testing"

	"github.com/moukhtar-youssef/drivelite/backend/internal/utils/network"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNormalizeIP(t *testing.T) {
	tests := []struct {
		name string // description of this test case
		// Named input parameters for target function.
		ip   string
		want string
	}{
		{
			name: "A loopback",
			ip:   "::1",
			want: "127.0.0.1",
		},
		{
			name: "normal ip",
			ip:   "127.0.0.1",
			want: "127.0.0.1",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := network.NormalizeIP(tt.ip)
			if tt.want != "" {
				require.NotEmpty(t, got)
			}
			if true {
				assert.Equal(t, tt.want, got)
			}
		})
	}
}
