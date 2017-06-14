package main

import "github.com/nimgo/goffee/server"

func main() {
	config := server.LoadConfiguration("./configs/config.json")
	server.StartServer(config)
}
