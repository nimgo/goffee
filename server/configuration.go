package server

import (
	"encoding/json"
	"fmt"
	"os"
	"time"
)

// Configuration contains the configurations of the webserver
type Configuration struct {
	Database struct {
		Host     string `json:"host"`
		Password string `json:"password"`
	} `json:"database"`
	Host string `json:"host"`
	Port string `json:"port"`

	Graceful struct {
		Timeout time.Duration `json:"timeout"` // milliseconds
	} `json:"graceful"`

	Debug bool `json:"debug"`
}

// LoadConfiguration loads the web configurations
func LoadConfiguration(filename string) Configuration {
	file, err := os.Open(filename)
	defer file.Close()
	if err != nil {
		fmt.Println(err.Error())
	}
	parser := json.NewDecoder(file)

	config := Configuration{}
	parser.Decode(&config)
	return config
}
