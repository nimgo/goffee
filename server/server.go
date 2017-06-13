package server

import (
	"net/http"

	"github.com/nimgo/goffee/server/kernal"
	"github.com/nimgo/goffee/server/middleware"
	"github.com/tylerb/graceful"
)

func serveFile(filename string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filename)
	}
}

// StartServer is the entry point to start the server with configurations
func StartServer(config Configuration) {

	mux := kernal.NewMux()
	mux.GET("/", serveFile("./webroot/index.html"))
	mux.GET("/inline", func(w http.ResponseWriter, req *http.Request) {
		w.Write([]byte("Hello from an inline func!"))
	})

	krnl := kernal.New()
	krnl.UseHandler(middleware.NewColorLogger())
	krnl.UseHandler(middleware.NewRecovery())
	krnl.UseHandler(middleware.NewStatic(http.Dir("./webroot/public/")))

	krnl.Use(mux)

	if config.Debug {
		kernal.Run(krnl, config.Host+":"+config.Port)
	} else {
		graceful.Run(config.Port, config.Graceful.Timeout, krnl) // Production
	}
}
