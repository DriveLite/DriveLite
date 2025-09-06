// Copyright 2025.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
