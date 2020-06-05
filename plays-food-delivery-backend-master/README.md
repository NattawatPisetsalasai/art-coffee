# Docker notes
- To build image
```
$ docker build -t <tag name> .
# $ docker build -t playtorium/plays-food-delivery-backend .
```
- To list images
```
$ docker images
```
- Run the image
```
$ docker run -p 49060:8080 -d <tag name>
# The -p flag redirects a public port to a private port inside the container
# docker run -p 49060:8080 -e ENV_NAME="local" -e DB_USER="test_user" -e DB_PASSWORD="<db password>" -e DB_HOST="docker-testing-env.playtorium.co.th" -e DB_PORT="5432" -e DB_NAME="test_db" -d --name plays-food-delivery-backend playtorium/plays-food-delivery-backend
```
- Get container ID or container name
```
$ docker ps
```
- Get container ID or container name with removed ones
```
$ docker ps -a
```
- Print app output
```
$ docker logs <container id or container name>
```
- Enter the container
```
$ docker exec -it <container id or container name> /bin/bash
```
- Stop the container
```
$ docker stop <container id or container name>
```
- Remove the container
```
$ docker rm <container id or container name>
```
- Remove the container
```
$ docker rmi <image id>
```
- Look inside docker image
```
$ docker run -it playtorium/plays-food-delivery-backend sh
```

# Gitlab notes
- Clone
  - NOTE: Please ask for `admin@playtorium.co.th` to add you as a member on this repository first.
```
$ git clone https://gitlab.com/admin434/plays-food-delivery-backend.git
```
- Push to gitlab repo
```
$ git add .
$ git commit -m "<some commit message>"
$ git push origin <branch>
```
- <branch>
  - `features` > nothing to be deployed
  - `develop` > deployed on docker-testing-env.playtorium.co.th
  - `release` > deployed on staging.playtorium.co.th

# References
- https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/
