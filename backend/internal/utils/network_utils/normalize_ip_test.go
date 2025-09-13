package networkutils_test

import (
	"testing"

	networkutils "github.com/moukhtar-youssef/drivelite/backend/internal/utils/network_utils"
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
			got := networkutils.NormalizeIP(tt.ip)
			if tt.want != "" {
				require.NotEmpty(t, got)
			}
			if true {
				assert.Equal(t, tt.want, got)
			}
		})
	}
}
