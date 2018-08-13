# Customizable Placeholder Webpage with Docker

In this repo contains all files to build and setup a docker image to create a Placeholder- (Status- / Fallback- ...) Webpage behind a load balancer. The image uses a nodejs/express server with the javascript library p5js for the animation ( inspired by [Atari Bouncing Ball](https://www.youtube.com/watch?v=BvSP2JUDk80) ) and dom creation. The text and the images have default variables set but can be changed by the docker environemnt feature (-e / -environment). The Idea was to build a docker image, in a quick and elegant way, which can be inplemented in a larger docker-compose files without dependencies. The pre-build image can be found on docker hub. 100 % of the Text & Images can be changed via the environment variables.

Port exposed: **8085**


**Libraries used:**
- [x] P5Js
- [x] Express
- [x] NodeJS
- [x] Docker 
- [x] Docker-Compose
- [x] Cattle (Rancher) ready


**Environment Variables:**
- PAGETITLE (default: "PAGETITLE")
- HEADLINE (default: "HEADLINE")
- DESCRIPTION (default: "DESCRIPTION")
- URL_HOMEPAGE (default: "https://www.example.com")
- EMAIL (default: "your@email.com")
- URL_IMAGE (default: "https://googlechrome.github.io/samples/picture-element/images/kitten-large.png")
- URL_FOOTER_LEFT_NAME (default: "ABCDEFGHIJKLM-LEFT")
- URL_FOOTER_LEFT (default: "https://www.example.com/footer_left")
- URL_FOOTER_RIGHT_NAME (default: "ABCDEFGHIJKLM-RIGHT")
- URL_FOOTER_RIGHT (default: "https://www.example.com/footer_right")



**Preview:** [Index.html](http://htmlpreview.github.io/?https://github.com/a6b8/customizable-placeholder-webpage-docker/blob/master/public/index.html)


## Getting Started
There are 2 ways to deploy the images:

1. Quickstart: Deploy the image from the pre-build docker image
2. Build your own image, upload it to docker hub and deploy from your own account


### 1. Quick Start
#### with Docker
#### with Docker-Compose

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
docker build -t {{docker_hub_username}}/{{image_name}}
docker push {{docker_hub_username}}/{{image_name}}
```
