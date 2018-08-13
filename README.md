# Customizable Placeholder Webpage with Docker

In this repo contains all files to build and setup a docker image to create a Placeholder- (Status- / Fallback- ...) Webpage behind a load balancer. The image uses a nodejs/express server with the javascript library p5js for the animation and dom creation. The text and the images have default variables set but can be changed by the docker environemnt feature (-e / -environment). The Idea was to build a docker image, in a quick and elegant way, which can be inplemented in a larger docker-compose files without dependencies. The pre-build image can be found on docker hub. 100 % of the Text & Images can be changed via the environment variables.

The Image expose Port: 8085


## Getting Started
There are 2 ways to deploy the images:

1. Quickstart: Deploy the image from the pre-build docker image
2. Build your own image, upload it to docker hub and deploy from your own account


### 1. Quick Start
#### with Docker
#### with Docker-Compose

### 2. Build your own Image from Source
