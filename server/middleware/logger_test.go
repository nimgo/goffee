package middleware

import (
	"bytes"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/nimgo/nim/server/anni"
)

func TestLogger(t *testing.T) {
	buff := bytes.NewBufferString("")
	recorder := httptest.NewRecorder()

	l := NewLogger()
	l.Logger = log.New(buff, "[n.] ", 0)

	n := anni.New()
	// replace log for testing
	n.UseHandler(l)
	n.UseFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNotFound)
	})

	req, err := http.NewRequest("GET", "http://localhost:3001/foobar", nil)
	if err != nil {
		t.Error(err)
	}

	n.ServeHTTP(recorder, req)
	expect(t, recorder.Code, http.StatusNotFound)
	refute(t, len(buff.String()), 0)
}
