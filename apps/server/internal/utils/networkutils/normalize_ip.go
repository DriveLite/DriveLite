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

// Package networkutils provides utilities for working with IP normalization
// and related network helper functions.
package networkutils

import "net"

// NormalizeIP cleans and formats an IP address string.
func NormalizeIP(ip string) string {
	parsed := net.ParseIP(ip)
	if parsed != nil && parsed.IsLoopback() {
		return "127.0.0.1"
	}
	return ip
}
