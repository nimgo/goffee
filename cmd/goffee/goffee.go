package main

import "github.com/nimgo/goffee/server"

func main() {

	// Create a new router. The API is the same as httprouter.New()
	server.StartServer()
}
