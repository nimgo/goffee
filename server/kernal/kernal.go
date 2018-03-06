package kernal

import (
	"log"
	"net/http"
	"os"

	"bitbucket.org/jabbl/gomux"
)

// NewMux returns a new gomux Router
func NewMux() *gomux.Router {
	return gomux.New()
}

// SubPath returns the substack generated for the sub route
func SubPath(parent *gomux.Router, method string, path string) *Stack {
	substack := &Stack{}
	parent.Handle(method, path, substack)
	return substack
}

// SubMux returns an instance of gomux with a substack middleware
func (s *Stack) SubMux() *gomux.Router {
	submux := gomux.New()
	s.Use(submux)
	return submux
}

// Run is a convenience function that runs the anni stack as an HTTP
// server. The addr string takes the same format as http.ListenAndServe.
func Run(ns *Stack, addr string) {
	l := log.New(os.Stdout, "[n.] ", 0)
	l.Printf("Server is listening on %s", addr)
	l.Fatal(http.ListenAndServe(addr, ns))
}
