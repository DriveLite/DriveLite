package ratelimter

import (
	"github.com/ulule/limiter/v3"
	"github.com/ulule/limiter/v3/drivers/store/memory"
)

func In_memory_ratelimiter(interval string) *limiter.Limiter {
	store := memory.NewStore()
	rate, err := limiter.NewRateFromFormatted(interval)
	if err != nil {
		panic(err)
	}
	return limiter.New(store, rate)
}
