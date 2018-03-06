package main

import (
	"fmt"

	"bitbucket.org/jabbl/goffee/server"
)

func main() {
	config := server.LoadConfiguration("./configs/config.json")
	//server.StartServer(config)
	fmt.Println(config)
}
