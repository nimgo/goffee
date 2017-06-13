package main

import "github.com/nimgo/goffee/server"

func main() {
	config := server.LoadConfiguration("config/config.json")
	server.StartServer(config)
}
