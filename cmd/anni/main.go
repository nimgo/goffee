package main

import (
	"net/http"

	"github.com/nimgo/gomux"
	"github.com/nimgo/nim/server/anni"
)

func main() {

	// Create a new router. The API is the same as httprouter.New()
	mux := anni.NewMux()
	mux.GET("/public/post/:id", appHandler("viewing: /public/post/:id"))
	mux.GET("/inlinefunc", func(w http.ResponseWriter, req *http.Request) {
		w.Write([]byte("Hello from an inline func!"))
	})

	// Create a subrouter using mainRouter.Path(method, path)
	// Add in the required middleware
	pttStack := anni.SubPath(mux, "GET", "/protected/*path")
	pttStack.UseFunc(middlewareA)
	pttStack.UseFunc(middlewareB)
	pttStack.UseHandlerFunc(middlewareC)
	pttMux := pttStack.SubMux()
	{
		pttMux.GET("/protected/users/:id", appHandler("viewing: /protected/users/:id"))
		pttMux.GET("/protected/users", appHandler("viewing: /protected/users"))
	}

	// Another way to handle this mux.
	auth := anni.NewMux()
	{
		auth.GET("/auth/boy/:id", appHandler("boy"))
		auth.GET("/auth/girl", appHandler("girl"))
	}

	stack := anni.New()
	stack.UseFunc(middlewareA)
	stack.UseFunc(middlewareB)
	stack.Use(auth)

	mux.GET("/auth/*stack", stack.ServeHTTP)

	// mux.NotFound = http.FileServer(http.Dir("assets/index.html"))
	// mux.ServeFiles("/p/_filepath", http.Dir("public/"))
	mux.NotFound = &notfound{}

	n := anni.New()
	n.Use(mux)
	anni.Run(n, ":3000")
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
	w.Write([]byte("[n.] I am middlewareA \n"))
	//bun := hax.GetBundle(c)
	//bun.Set("valueA", ": from middlewareA")
}

func middlewareB(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("[n.] I am middlewareB \n"))
	//bun := hax.GetBundle(c)
	//bun.Set("valueB", ": from middlewareB")
}

func middlewareC(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	w.Write([]byte("[n.] I am middlewareC \n"))
	next(w, r)
}

type notfound struct{}

func (nf *notfound) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("[n.] I am not found \n"))
	//bun := hax.GetBundle(c)
	//bun.Set("valueB", ": from middlewareB")
}
