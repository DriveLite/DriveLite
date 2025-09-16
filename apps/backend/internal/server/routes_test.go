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

package server_test

//
// import (
// 	"encoding/json"
// 	"net/http"
// 	"net/http/httptest"
// 	"reflect"
// 	"testing"
//
// 	"github.com/moukhtar-youssef/drivelite/backend/internal/handlers"
//
// 	"github.com/labstack/echo/v4"
// )
//
// type mockDB struct{}
//
// func (m *mockDB) Health() map[string]string {
// 	return map[string]string{"status": "ok"}
// }
//
// func (m *mockDB) Close() error {
// 	return nil
// }
//
// func TestHandler(t *testing.T) {
// 	e := echo.New()
// 	req := httptest.NewRequest(http.MethodGet, "/", nil)
// 	rec := httptest.NewRecorder()
// 	c := e.NewContext(req, rec)
//
// 	// Create a handler instance with mock database
// 	h := handlers.NewHandler(&mockDB{})
//
// 	// Call the HelloWorld handler
// 	if err := h.HelloWorld(c); err != nil {
// 		t.Errorf("HelloWorld() error = %v", err)
// 		return
// 	}
//
// 	if rec.Code != http.StatusOK {
// 		t.Errorf("HelloWorld() wrong status code = %v", rec.Code)
// 		return
// 	}
//
// 	expected := map[string]string{"message": "Hello World"}
// 	var actual map[string]string
//
// 	// Decode the response body into actual
// 	if err := json.NewDecoder(rec.Body).Decode(&actual); err != nil {
// 		t.Errorf("HelloWorld() error decoding response body: %v", err)
// 		return
// 	}
//
// 	if !reflect.DeepEqual(expected, actual) {
// 		t.Errorf("HelloWorld() wrong response body. expected = %v, actual = %v", expected, actual)
// 		return
// 	}
// }
