package server

import (
	"net/http"

	"github.com/nimgo/goffee/server/anni"
	"github.com/nimgo/goffee/server/middleware"
)

// StartServer is the entry point to start the server with configurations
func StartServer() {

	nni := anni.New()
	nni.UseHandler(middleware.NewColorLogger())
	nni.UseHandler(middleware.NewRecovery())
	nni.UseHandler(middleware.NewStatic(http.Dir("./public/")))

	anni.Run(nni, ":3000")

	// if c.DebugMode {
	// 	web.Run(c.Server_Port) // Development
	// } else {
	// 	graceful.Run(c.Server_Port, c.Server_Timeout, web) // Production
	// }
}
