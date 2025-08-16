package middlewares

import (
	"github.com/labstack/echo/v4"
	"github.com/unrolled/secure"
)

func SecureMiddleware() echo.MiddlewareFunc {
	secureMiddleware := secure.New(secure.Options{
		FrameDeny:             true,
		ContentTypeNosniff:    true,
		BrowserXssFilter:      true,
		ContentSecurityPolicy: "default-src 'self'",
	})
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			err := secureMiddleware.Process(c.Response(), c.Request())
			if err != nil {
				return err
			}
			return next(c)
		}
	}
}
