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

package middlewares

import (
	"sync/atomic"
	"time"

	ratelimter "github.com/moukhtar-youssef/drivelite/backend/internal/utils/ratelimterutils"
	"github.com/ulule/limiter/v3"
)

type RateLimitMiddleware struct {
	count             int64 // Use int64 for atomic operations
	limit             int64
	reset             time.Duration
	ticker            *time.Ticker
	limit10ReqPerHour *limiter.Limiter
	limit10ReqPerMin  *limiter.Limiter
	limit100ReqPerMin *limiter.Limiter
	limit200ReqPerSec *limiter.Limiter
}

func NewRateLimitMiddleware(limit int64, reset time.Duration) *RateLimitMiddleware {
	rl := &RateLimitMiddleware{
		limit10ReqPerHour: ratelimter.In_memory_ratelimiter("10-H"),
		limit10ReqPerMin:  ratelimter.In_memory_ratelimiter("10-M"),
		limit100ReqPerMin: ratelimter.In_memory_ratelimiter("100-M"),
		limit200ReqPerSec: ratelimter.In_memory_ratelimiter("200-S"),
		limit:             limit,
		reset:             reset,
		ticker:            time.NewTicker(reset),
	}
	go func() {
		for range rl.ticker.C {
			atomic.StoreInt64(&rl.count, 0)
		}
	}()
	return rl
}
