## Setup Dev Environment

### Requirements

You should install these tools on your machine:

1. [Go](https://go.dev/doc/install)
2. [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) 
  or just 
  [Node](https://nodejs.org/en)
3. [Wails](https://wails.io/docs/gettingstarted/installation)
4. [Air](https://github.com/air-verse/air)
5. [Docker](https://www.docker.com/products/docker-desktop/)
  and 
  [Docker Compose](https://docs.docker.com/compose/install/linux/) 
  plugin
6. [Ollama](https://ollama.com/download)


### Start the API

1. `cd ./api`
2. `cp .env.example .env` - copy example env file into `.env`
3. `go mod tidy`
4. `docker compose -f ./docker-compose.yml up supalama_db` - start PostgreSQL container
5. `air` - start API server in watch mode


### Start the APP

1. `cd ./app`
2. `cp .env.example .env` - copy example env file into `.env`
3. `cd ./frontend`
4. `npm i` - install frontend dependencies
5. `../`
6. `wails dev` - start app in dev mode

## Supported platforms

* [x] macOS
* [x] Linux
* [ ] Windows - perhaps, not yet tested 😅