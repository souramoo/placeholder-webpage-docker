Preview: [HTML](http://htmlpreview.github.io/?https://github.com/a6b8/placeholder-webpage-docker/blob/master/public/index.html)   |   Docker Hub: [Pre-Build Image](https://hub.docker.com/r/a6b8/placeholder-webpage-docker/)

# Placeholder Webpage with Docker

In this repo contains all files to build and setup a docker image to create a Placeholder- (Status- / Fallback- ...) Webpage behind a load balancer. The image uses a nodejs/express server with the javascript library p5js for the animation ( inspired by [Atari Bouncing Ball](https://www.youtube.com/watch?v=BvSP2JUDk80) ) and dom creation. The text and the images have default variables set but can be changed by the docker environemnt feature (-e / -environment). The Idea was to build a docker image, in a quick and elegant way, which can be inplemented in a larger docker-compose files without dependencies. The pre-build image can be found on docker hub. 100 % of the Text & Images can be changed via the environment variables.

The Docker Image use Port: **80**


**Features:**
- [x] All Variables Customizable
- [x] P5Js - Dom creation and Animation
- [x] Express - Server
- [x] NodeJS - Hand Variables from Docker to P5js
- [x] Docker - Container Build/Image
- [x] Docker-Compose Ready - Deploy Structure
- [x] Cattle (Rancher) Ready - Infrastructure


**Environment Variables:**
- `PAGETITLE` (default: "PAGETITLE")
- `HEADLINE` (default: "HEADLINE")
- `DESCRIPTION` (default: "DESCRIPTION")
- `URL_HOMEPAGE` (default: "")
- `EMAIL` (default: "")
- `URL_IMAGE` (default: "https://googlechrome.github.io/samples/picture-element/images/kitten-large.png")
- `URL_FOOTER_LEFT_NAME` (default: "ABCDEFGHIJKLM-LEFT")
- `URL_FOOTER_LEFT` (default: "https://www.example.com/footer_left")
- `URL_FOOTER_RIGHT_NAME` (default: "ABCDEFGHIJKLM-RIGHT")
- `URL_FOOTER_RIGHT` (default: "https://www.example.com/footer_right")



**Preview:** [Index.html](http://htmlpreview.github.io/?https://github.com/a6b8/customizable-placeholder-webpage-docker/blob/master/public/index.html)


## Getting Started
There are 2 ways to deploy the images:

1. Deploy the image from the pre-build docker image >> [https://hub.docker.com/r/a6b8/placeholder-webpage-docker/](https://hub.docker.com/r/a6b8/placeholder-webpage-docker/)
2. Build your own image, upload it to docker hub and deploy from your own account


### 1. Quick Start
#### Docker run
Example 1:
- Make Port 4242 Public (-p), 
- Change Text (-e)
```
docker run -p 4242:8085 -e HEADLINE="My New Headline One" a6b8/placeholder-webpage-docker:latest
```

Example 2:
```
docker run \
-p 4242:8085 \
-e PAGETITLE="Example Two" \
-e HEADLINE="Headline Two" \
-e DESCRIPTION="Description Two" \
-e URL_HOMEPAGE="https://www.google.com" \
-e EMAIL="me@me.com" \
-e URL_IMAGE="https://googlechrome.github.io/samples/picture-element/images/butterfly.jpg" \
-e URL_FOOTER_LEFT_NAME="LEFT" \
-e URL_FOOTER_LEFT="https://www.example.com/left" \
-e URL_FOOTER_RIGHT_NAME="        RIGHT" \
-e URL_FOOTER_RIGHT="https://www.example.com/right" \
a6b8/placeholder-webpage-docker:latest
```


#### Docker-Compose
Pull Repository
```
git clone https://github.com/a6b8/placeholder-webpage-docker.git
cd placeholder-webpage-docker/
```

Change yml values 
```
version: "2"
services:
  placeholder-webpage:
    image: a6b8/placeholder-webpage-docker:latest
    ports:
      - "4242:8085"
    environment:
      PAGETITLE: "Example Two"
      HEADLINE: "Headline Two"
      DESCRIPTION: "Description Two"
      URL_HOMEPAGE: "https://www.google.com"
      EMAIL: "me@me.com"
      URL_IMAGE: "https://googlechrome.github.io/samples/picture-element/images/butterfly.jpg"
      URL_FOOTER_LEFT_NAME: "LEFT"
      URL_FOOTER_LEFT: "https://www.example.com/left"
      URL_FOOTER_RIGHT_NAME: "        RIGHT"
      URL_FOOTER_RIGHT: "https://www.example.com/right"
```

Deploy
```
docker-compose up
```

#### HA-Proxy Snippet
```
version: "2"
services:
  placeholder-webpage:
    image: a6b8/placeholder-webpage-docker:latest
    environment:
      PAGETITLE: "Example Two"
      HEADLINE: "Headline Two"
      DESCRIPTION: "Description Two"
      URL_HOMEPAGE: "https://www.google.com"
      EMAIL: "me@me.com"
      URL_IMAGE: "https://googlechrome.github.io/samples/picture-element/images/butterfly.jpg"
      URL_FOOTER_LEFT_NAME: "LEFT"
      URL_FOOTER_LEFT: "https://www.example.com/left"
      URL_FOOTER_RIGHT_NAME: "        RIGHT"
      URL_FOOTER_RIGHT: "https://www.example.com/right"
```


#### Remove --all-- Containers
```
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

### 2. Build your own Image from Source

Clone & Load Dependencies
```
git clone https://github.com/a6b8/placeholder-webpage-docker.git
cd placeholder-webpage-docker/
npm install
```

Test Webbrowser
```
node index.js
goto >> http://localhost:8085
```

Build Image & Push to Docker Hub
```
docker build -t {{docker_hub_username}}/{{image_name}} .
docker push {{docker_hub_username}}/{{image_name}}
```
