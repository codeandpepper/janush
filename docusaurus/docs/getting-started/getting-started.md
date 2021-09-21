---
sidebar_position: 1
title: Getting Started
---

# Getting Started

## Clone repository

```sh
git clone https://github.com/JacekKosciesza/FakeTube.git
cd FakTube
```

## Cloud

`Cloud` is infrastructure and backend code. It uses [AWS (Amazon Web Services) serverless computing](https://aws.amazon.com/serverless/). We are using IaC (Infrastructure as Code) approach using [AWS CDK (Cloud Development Kit)](https://aws.amazon.com/cdk/), where we define cloud services using TypeScript. We need to deploy it to AWS before we can use our web application.

Install npm dependencies

```sh
cd cloud
npm install
```

bootstrap CDK

```sh
cdk bootstrap
```

deploy to AWS

```sh
cdk deploy
```

set environment variables needed by web application

```sh
bash ./scripts/setEnvs.bash
```

## Web

Web is React web application, based on [Create React App](https://create-react-app.dev/) TypeScript template.

Install npm dependencies

```sh
cd web
npm install
```

run the app

```sh
npm start
```
