# GreenBee

## Docker version

From the root of the project, execute these commands:

```shell
docker build -t mongomaker --file=./mongo/Dockerfile .

docker build -t nodemaker --file=./node/Dockerfile .


docker run --name greenbeedb -d -p 27017:27017 mongomaker

docker run --name greenbeeserver -d -p 8888:3000 --link greenbeedb:greenbeedb nodemaker
```