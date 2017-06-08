package main

import (
	"fmt"
	"net/http"

	"github.com/nimgo/gomux"
	"github.com/nimgo/nim"
)

func main() {

	// Create a new router. The API is the same as httprouter.New()
	mux := nim.NewMux()
	mux.GET("/public/post/:id", appHandler("viewing: /public/post/:id"))
	mux.GET("/inlinefunc", func(w http.ResponseWriter, req *http.Request) {
		w.Write([]byte("Hello from an inline func!"))
	})

	// Create a subrouter using mainRouter.Path(method, path)
	// Add in the required middleware
	pttMux := nim.SubPath(mux, "GET", "/protected/*path").
		WithFunc(middlewareA).
		WithFunc(middlewareB).
		WithHandlerFunc(middlewareC).
		SubMux()
	{
		pttMux.GET("/protected/user/:id", appHandler("viewing: /protected/user/:id"))
		pttMux.GET("/protected/users", appHandler("viewing: /protected/users"))
	}

	// Another way to handle this mux.
	auth := nim.NewMux()
	{
		auth.GET("/auth/boy/:pants", appHandler("boy"))
		auth.GET("/auth/girl", appHandler("girl"))
	}
	stack := nim.New()
	stack.WithFunc(middlewareA)
	stack.WithFunc(middlewareB)
	stack.With(auth)

	mux.GET("/auth/*stack", stack.ServeHTTP)

	n := nim.New()
	n.With(mux)
	nim.Run(n, ":3000")
}

func appHandler(msg string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ps := gomux.GetMuxParams(r)
		id := ps.ByName("id")
		if id != "" {
			w.Write([]byte("[PARAM] id = " + id + "\n"))
		}
		w.Write([]byte("[OUTPUT] " + msg + "\n"))
	}
}

func middlewareA(w http.ResponseWriter, r *http.Request) {
	fmt.Println("[n.] I am middlewareA")
	//bun := hax.GetBundle(c)
	//bun.Set("valueA", ": from middlewareA")
}

func middlewareB(w http.ResponseWriter, r *http.Request) {
	fmt.Println("[n.] I am middlewareB")
	//bun := hax.GetBundle(c)
	//bun.Set("valueB", ": from middlewareB")
}

func middlewareC(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	w.Write([]byte("[n.] I am middlewareC \n"))
	next(w, r)
}
