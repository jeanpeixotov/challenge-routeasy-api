ROUTEASY CHALLENGE
=========


## Technologies

* NodeJs, PURE JS, Yarn, RabbitMQ, Mongo

## Dependecies

- Docker
- docker-compose

Make sure that you've these 2 tools installed beforehand.

## Setting up your host

First of all, the MongoDB assumes that your database path is located at `/data/db`, which is the default path. If your `dbpath` is something else ( e.g. `/var/lib/mongodb` ), feel free to change it on docker-compose file, at the mongodb volumes section, it can be a boring task for every container though. 

Any changes in the mongodb volume's path shouldn't be commited! In case you change it, make sure to bring it back to the default before submitting your changes.

In case you've never ran the MongoDB into your machine, you probably don't have the default dirs structure for the `dbpath` var. To build it, run into your terminal:

```
mkdir -p /data/db
sudo chown -R $(whoami) /data/db
```

This will be the directories linked as a volume to the MongoDB container, in order to permanent save the data on the host ( Seeing that all docker containers are stateless, they don't keep any data).

## Build & Running for Dev.

RUN WITH DOCKER

```bash
#run
docker-compose up --build # build step included

#tests
docker-compose run routeasy yarn test

#lint
docker-compose run routeasy yarn lint
```

## Good to know

You can always enter a running container ( Good for debugging ) running: `docker-compose exec ${CONTAINER_NAME} /bin/bash`

You can start a container and override the default CMD defiend on Dockerfile running: `docker-compose run ${CONTAINER_NAME} /bin/bash`
