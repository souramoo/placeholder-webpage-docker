## Template to deploy a Node.js / p5.js Sketch with Docker-Compose to Rancher (Cattle)
This Template generates an (Node.js) Express Webserver and serves a p5.js Sketch. The 'Dockerfile' handles containerization process and exposes the port 8085. The 'Docker-Compose.yml' deploys the container and a Loadbalancer for accessing and scale the service inside the container. The 'Rancher-Composer.yml' connects both containers p5js and loadbalancer  

### Setup Rancher-Cli  
[Rancher-Cli Installation](http://rancher.com/docs/rancher/latest/en/cattle/rancher-compose/)  
  
### Quick Start
#### From Docker-Compose File > Rancher  
```  
git clone https://github.com/a6b8/ra-node-p5js.git  
cd ra-node-p5js 
rancher-compose -p #{service_name} up 
```  
  
  
### Deploy your own Service 
#### 1. [via Local] 'Dockerfile' > Docker-Compose > Rancher  
  
```   
git clone https://github.com/a6b8/ra-node-p5js.git  
cd ra-node-p5js
```  
  
  
Change [docker-compose.yml](https://github.com/a6b8/ra-node-p5js/blob/master/docker-compose.yml#L5-L6) **from**  
```  
    image:
      a6b8/ra-node-p5js
``` 
**to**
```  
    build: .

```  
  

```
rancher-compose -p #{service_name} up
``` 


#### 2. [via Docker-Hub] 'Dockerfile' > Docker-Hub > Docker-Compose > Rancher  
```  
git clone https://github.com/a6b8/ra-node-p5js.git  
cd ra-node-p5js
docker build -t #{docker_hub_username}/#{image_name} . 
docker push #{docker_hub_username}/#{image_name} 
```  
  
Change [docker-compose.yml](https://github.com/a6b8/ra-node-p5js/blob/master/docker-compose.yml#L6) Image to #{docker_hub_username}/#{image_name}  

```  
rancher-compose -p #{service_name} up
```  


#### 3. From Scratch  
```  
mkdir hello-world  
cd hello-world  
npm init  
touch index.js  
touch Dockerfile  
touch docker-compose.yml  
touch rancher-compose.yml  
``` 


Change **index.js**  
```  
var express = require('express');  
var app = express();  
var path = require('path');  
  
app.get(/^(.+)$/, function(req, res){  
     console.log('static file request : ' + req.params);  
     res.sendfile( __dirname + req.params[0]);  
});  
  
app.listen(8085);  
```  
  
Change **Dockerfile**  
```  
FROM node:7  
WORKDIR /app  
COPY package.json /app  
RUN npm install  
COPY . /app  
CMD node index.js  
EXPOSE 8085  
```  
  
Change **docker-compose.yml**  
```  
version: "2"  
  
services:  
  node-1:  
  build: .
  lb:  
    image: rancher/lb-service-haproxy:v0.7.9  
    ports:  
    - 8087:8087/tcp  
```  
  
Change **rancher-compose.yml**  
```  
version: '2'  
services:  
  node-1:  
    scale: 1  
    start_on_create: true  
  lb:  
    scale: 1  
    start_on_create: true  
    lb_config:  
      certs: []  
      port_rules:  
      - priority: 1  
        protocol: http  
        service: node-1  
        source_port: 8087  
        target_port: 8085  
    health_check:  
      response_timeout: 2000  
      healthy_threshold: 2  
      port: 42  
      unhealthy_threshold: 3  
      initializing_timeout: 60000  
      interval: 2000  
      reinitializing_timeout: 60000  
```  
  

```  
npm install —save express  
docker build -t #{docker_hub_username}/#{image_name}  .  
docker push #{docker_hub_username}/#{image_name} 
  
export RANCHER_URL=#{url}  
export RANCHER_ACCESS_KEY=#{key}  
export RANCHER_SECRET_KEY=#{secret}  

rancher-compose -p #{service_name} up  
```  