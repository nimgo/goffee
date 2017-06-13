package middleware

import (
	"bytes"
	"net/http"

	"github.com/nimgo/nim/server/anni"

	"net/http/httptest"
	"testing"
)

func TestStatic(t *testing.T) {
	rec := httptest.NewRecorder()
	rec.Body = new(bytes.Buffer)

	n := anni.New()
	n.UseHandler(NewStatic(http.Dir(".")))

	req, err := http.NewRequest("GET", "http://localhost:3000/static_test.go", nil)
	if err != nil {
		t.Error(err)
	}
	n.ServeHTTP(rec, req)
	expect(t, rec.Code, http.StatusOK)
	expect(t, rec.Header().Get("Expires"), "")
	if rec.Body.Len() == 0 {
		t.Errorf("Got empty body for GET request")
	}
}

func TestStaticHead(t *testing.T) {
	rec := httptest.NewRecorder()
	rec.Body = new(bytes.Buffer)

	n := anni.New()
	n.UseHandler(NewStatic(http.Dir(".")))
	n.Use(http.NotFoundHandler())

	req, err := http.NewRequest("HEAD", "http://localhost:3000/static_test.go", nil)
	if err != nil {
		t.Error(err)
	}

	n.ServeHTTP(rec, req)
	expect(t, rec.Code, http.StatusOK)
	if rec.Body.Len() != 0 {
		t.Errorf("Got non-empty body for HEAD request")
	}
}

func TestStaticAsPost(t *testing.T) {
	rec := httptest.NewRecorder()

	n := anni.New()
	n.UseHandler(NewStatic(http.Dir(".")))
	n.Use(http.NotFoundHandler())

	req, err := http.NewRequest("POST", "http://localhost:3000/static_test.go", nil)
	if err != nil {
		t.Error(err)
	}

	n.ServeHTTP(rec, req)
	expect(t, rec.Code, http.StatusNotFound)
}

func TestStaticBadDir(t *testing.T) {
	rec := httptest.NewRecorder()

	n := anni.New()
	n.UseHandler(NewRecovery())
	n.UseHandler(NewColorLogger())
	n.UseHandler(NewStatic(http.Dir("static")))

	n.Use(http.NotFoundHandler())

	req, err := http.NewRequest("GET", "http://localhost:3000/static_test.go", nil)
	if err != nil {
		t.Error(err)
	}

	n.ServeHTTP(rec, req)
	refute(t, rec.Code, http.StatusOK)
}

func TestStaticOptionsServeIndex(t *testing.T) {
	rec := httptest.NewRecorder()

	n := anni.New()
	s := NewStatic(http.Dir("."))
	s.indexFile = "anni.go"
	n.UseHandler(s)

	req, err := http.NewRequest("GET", "http://localhost:3000/", nil)
	if err != nil {
		t.Error(err)
	}

	n.ServeHTTP(rec, req)
	expect(t, rec.Code, http.StatusOK)
}

func TestStaticOptionsPrefix(t *testing.T) {
	rec := httptest.NewRecorder()

	n := anni.New()
	s := NewStatic(http.Dir("."))
	s.prefix = "/public"
	n.UseHandler(s)

	// Check file content behaviour
	req, err := http.NewRequest("GET", "http://localhost:3000/public/static_test.go", nil)
	if err != nil {
		t.Error(err)
	}

	n.ServeHTTP(rec, req)
	expect(t, rec.Code, http.StatusOK)
}
