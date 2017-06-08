package nim

import (
	"log"
	"net/http"
	"os"

	"github.com/nimgo/gomux"
	"github.com/nimgo/nim/server/core"
)

// NewMux returns a new gomux Router
func NewMux() *gomux.Router {
	return gomux.New()
}

// New returns a core stack
func New() *core.Stack {
	return core.New()
}

// SubPath returns the substack generated for the sub route
func SubPath(parent *gomux.Router, method string, path string) *core.Stack {
	substack := &core.Stack{}
	parent.Handle(method, path, substack)
	return substack
}

// Run is a convenience function that runs the nim stack as an HTTP
// server. The addr string takes the same format as http.ListenAndServe.
func Run(ns *core.Stack, addr ...string) {
	l := log.New(os.Stdout, "[n.] ", 0)
	address := detectAddress(addr...)
	l.Printf("Server is listening on %s", address)
	l.Fatal(http.ListenAndServe(address, ns))
}

const (
	// DefaultAddress is used if no other is specified.
	defaultServerAddress = ":3000"
)

// detectAddress
func detectAddress(addr ...string) string {
	if len(addr) > 0 {
		return addr[0]
	}
	if port := os.Getenv("PORT"); port != "" {
		return ":" + port
	}
	return defaultServerAddress
}
