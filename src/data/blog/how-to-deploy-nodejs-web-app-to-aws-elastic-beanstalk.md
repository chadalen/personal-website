---
title: "How To Deploy Node.js Web App To AWS Elastic Beanstalk"
date: "2020-03-09"
tags: ['aws', 'elastic beanstalk']
---

---
title: "How To Deploy A Node.js App To Elastic Beanstalk"
date: "2020-03-09"
tags: ['aws']
---

### Intro

For this tutorial we are going to take a [Node.js](https://nodejs.org/en/) app and deploy it to Amazon Web Services ([AWS](https://aws.amazon.com/)) via [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/). I'm going to assume you already know what AWS (Amazon Web Services) and Elastic Beanstalk is. Also I'm going to assume you have a node.js app already but if you don't you can follow step 1 for an example.

###  1. Create a Node.js app (Skip this step if you already have one)
```npm init```
You can install any web server but for a simple web server I'll install express.js
```npm install express --save```
Create file named "app.js" add the following
```javascript
var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```
To run the command type
```node app.js```
To make sure the app is working, visit http://localhost:3000 in a browser and you should see "Hello World!"

### 2. Dockerize your node.js app
We are going to use [Docker](https://www.docker.com/) because Docker makes deploying to any platform a breeze. To begin create an acocunt at [https://hub.docker.com/](https://hub.docker.com/) if you don't already have an account. Once you have an account, we will create a `Dockerfile`. This file is basically an instruction on how to package and run your application using Docker.

So create a file called "Dockerfile" next to your node's `package.json`.
```
FROM node:13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && \
		npm cache clean

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]

```

To breakdown this file
`FROM node:13-alpine`
I'm using alpine because this will reduce the footprint of your Docker application. This basically tells Docker to use the alphine linux os which is designed to be secure and lightweight.

This line tells docker where to place your application within the docker container. This will create a folder /usr/src/app at the root directory.
`WORKDIR /usr/src/app`

This line tells docker to copy the package.json file so we can install only the dependencies in the next line.
`COPY package*.json ./`

This tells docker to first install the dependencies, then remove the cached dependencies. When we install depenencies in npm or yarn, it caches the dependencies so if we run npm install it doesn't have to fetch the dependencies again. We clean the dependencies here because we don't need to install any dependencies again. Also this will significantly reduce the size of your application.
```
RUN npm install && \
		npm cache clean
```

This tells docker to copy the entire directory over to docker at the working directory which in our case is /usr/src/app
`COPY . .`

This line tells docker to build our node.js application which can be for production or development.
`RUN npm run build`

This line tells docker to accept connections on port 3000. This port is the internal port, this doesn't need to be changed because we can route traffic from port 80 to the internal port 3000 via docker command later.
`EXPOSE 3000`

Finally this will run your application inside the docker container.
`CMD [ "npm", "start" ]`

To finally finish dockerizing the applicaiton we need to create a docker image. So type
`docker build -t yourdockerhubusername/your-image-name .`
The `-t` stands for "tag". This will be the name of our local image.

To test this image before deploying to docker hub you can type
`docker run -p 80:3000 yourdockerhubusername/your-image-name:latest`
`-p` stands for "port". The first port is the external port, and the second is the internal port. So when a user wants to connect to your application they would use port 80, then on the docker side traffic will be routed to port 3000 in your docker app. `:latest` tells docker to use the latest version of your app. Once you run that command you can visit `http://localhost` to see your app.

To publish this docker image to your docker hub you can type
`docker push yourdockerhubusername/your-image-name`

### 3. Deploy Docker Image To Elastic Beanstalk
The last step we need to deploy this docker image to AWS Elastic Beanstalk. So to do that, first create an AWS account if you don't already have one. [https://aws.amazon.com/resources/create-account/](https://aws.amazon.com/resources/create-account/)

If you already have an account log on and go to "AWS Management Console" then search "Elastic Beanstalk". Click "Create New Application". Name it whatever you want. Then click "Create Environment" select "Web Server Environment". Fill out form, but for Platform make sure to choose "Docker". Then in "application code" section choose "Upload your code". To make this easier we will create a `Dockerrun.aws.json` file. This file will tell AWS how to get and run your docker image. Next to your `Dockerfile` create a new file called "Dockerrun.aws.json" inside that put this.
```json
{
	"AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "yourdockerhubusername/your-image-name"
  },
  "Ports": [
    {
      "ContainerPort": 3000,
      "HostPort": 80
    }
  ]
}
  
```

This line just tells AWS what version this Dockerrun.aws.json file is.
`"AWSEBDockerrunVersion": "1"`

These lines tell AWS what the name of your Docker image is. This will grab the image off of Docker hub so you need your docker hub username and the name of your image.
```
"Image": {
    "Name": "yourdockerhubusername/your-image-name"
  }
  ```
  
  These lines tell docker what ports to use when it runs the docker file. e.g to replicate the same command we used previously `docker run -p 80:3000 yourdockerhubusername/your-image-name:latest`
  ```
    "Ports": [
    {
      "ContainerPort": 3000,
      "HostPort": 80
    }
  ]
  ```
  
  "HostPort" is the external port, "ContainerPort" is the internal port. After uploading click "create environment", then wait a minute and the status should show up green and saying successful. Once successful go to "Dashboard" then look for the URL at the top should be something like this
  "http://yourapp-env-1.eba-49gfb7qp.us-east-2.elasticbeanstalk.com/", click that and you should be able to see your web app.
