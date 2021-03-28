<h1 align="center">
    <img src="https://camo.githubusercontent.com/ab9f94b1f47bf05fbf0f99d65a802f638cb38f21/68747470733a2f2f692e696d6775722e636f6d2f613334616f30782e706e67" width="100px" /><br>
    <br>
  Go Barber API
</h1>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/robertokbr/GoBarber.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/robertokbr/GoBarber.svg">

  <a href="https://www.codacy.com/app/robertokbr/GoBarber?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=robertokbr/GoBarber&amp;utm_campaign=Badge_Grade">
    <img alt="Codacy grade" src="https://img.shields.io/codacy/grade/1b577a07dda843aba09f4bc55d1af8fc.svg">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/robertokbr/GoBarber.svg">
  <a href="https://github.com/robertokbr/GoBarber/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/robertokbr/GoBarber.svg">
  </a>

  <a href="https://github.com/robertokbr/GoBarber/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/robertokbr/GoBarber.svg">
  </a>

# 🚧 In progress

## 🕹 Features

* Create User
* Create Session by JWT
* Request password recover by email
* Reset password
* Update Avatar
* Show logged user data
* Update logged User data
* Show user profile
* Create Provider account
* Show providers
* Show providers month availability
* Show providers day time availability
* Create Appointment
* Get Appointments
* Create Appointment notifications


## 🏗 Architecture:
* `Architectural pattern`: Data mapper pattern + DDD
* `Runtime`: Node.JS with TypeScript
* `API`: Express
* `ORM`: Typeorm
* `Persistent SQL data storage`:  Postgres
* `Persistent NoSQL data storage`:  MongoDB
* `Cache storage`:  Redis
* `Authentication`: Jsonwebtoken
* `Dependencie injection`: Tsyringe
* `Mail smtp`: Nodemailer
* `Dev email client`: Ethereal
* `Prod email client`: Amazon SES
* `Template engine`: Handlebars
* `Multimidia storage`: Amazon S3

## 🧪 Test lib
* Jest
  * 100% services TDD coverage ✅

## 🔧 Other configs

* Global Exception catch class
* Middleware ```ensureAuthenticated``` to compare the auth JWT token with the provided key
* Date-fns to handle the Date
* Middleware ```rateLimiter``` to create a request limiter to the same IP by the provided time range, avoinding DDos attacks

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), Node.js v10.16 or higher + yarn v1.13 or higher installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/robertokbr/GoBarber

# Go into the repository
$ cd GoBarber

# Install dependencies
$ yarn
```
---

## How to Run all databases at Docker

* [Install Docker](https://www.notion.so/Instalando-Docker-6290d9994b0b4555a153576a1d97bee2)

```bash
# Create a Postgres Image
$ docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:54
32 -d postgres

docker run --name mogodb -p 27017:27017 -d -t mongo

docker run --name redis -p 6379:6379 -d -t redis:alpine
```

## How to start Database:
```bash
# Run migrations
  $ yarn typeorm migratios:run

# Run seeds
  $ yarn seed:run
```

## How to Run the Server:
```bash
# Run localhost server
$ yarn dev:server
```
---

#### Thank you for visit, don't forget to conect with me on [Linkedin](https://www.linkedin.com/in/robertojrcdc/) ✌
