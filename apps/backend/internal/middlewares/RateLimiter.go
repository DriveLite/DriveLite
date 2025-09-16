package middlewares

import (
	"sync/atomic"
	"time"

	ratelimter "github.com/moukhtar-youssef/drivelite/backend/internal/utils/Ratelimter"
	"github.com/ulule/limiter/v3"
)

type RateLimitMiddleware struct {
	count             int64 // Use int64 for atomic operations
	limit             int64
	reset             time.Duration
	ticker            *time.Ticker
	limit10ReqPerMin  *limiter.Limiter
	limit200ReqPerMin *limiter.Limiter
	limit200ReqPerSec *limiter.Limiter
}

func NewRateLimitMiddleware(limit int64, reset time.Duration) *RateLimitMiddleware {
	rl := &RateLimitMiddleware{
		limit10ReqPerMin:  ratelimter.In_memory_ratelimiter("10-M"),
		limit200ReqPerMin: ratelimter.In_memory_ratelimiter("200-M"),
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
