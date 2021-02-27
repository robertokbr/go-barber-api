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

* Create Session by E-mail and Password, and get a JWT token
* Use Authenticated Routes
* Create Appointments with User - Appointments relation one to many
* Get Appointments
* Upload Avatar
* Update Avatar
* ...🔧


## 🏗 Architecture:
* `Runtime`: Node.JS with TypeScript
* `API`: Express
* `Architectural pattern`: Data mapper pattern + DDD
* `ORM`: Typeorm
* `Persistent data store`: Docker Postgres
* `Authentication`: Jsonwebtoken
* `Dependencie injection`: Tsyringe

## 🧪 Test lib
* Jest

## 🔧 Other configs

* Global Exception catch class
* Middleware ```ensureAuthenticated``` to compare the auth JWT token with the provided key
* BcryptJs to generate the user key as a hash

## 🔨 TO-DO
* Passsword recuperation
* Update user profile
* Service Provider dashboard
* Service Schedule

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

## How to Run Postgres Database at Docker

* [Install Docker](https://www.notion.so/Instalando-Docker-6290d9994b0b4555a153576a1d97bee2)

```bash
# Create a Postgres Image
$ docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:54
32 -d postgres
```

## Docker Alternative
* ``OBS``: If you dont wanna run the database at Docker, and you preferer a simple alternative  I recommend you to change the database to Sqlite3, for this you have to:
```bash
# Install Sqlite3
$ yarn add sqlite3
```
* Copy and paste it in the ormConfig.json:
```
{
  "name": "default",
  "type": "sqlite",
  "database": "./src/database/db.sqlite3",
  "autoSchemaSync": true,
  "entities": [
    "src/models/*.ts"
  ],
  "logging": {
    "logQueries": true
  },

  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/models",
    "migrationsDir": "./src/database/migrations"
  }
}

```

## How to Run the Server:
```bash
# Run migrations
$ yarn typeorm migratios:run

# Run localhost server
$ yarn dev:server
```
---

#### Thank you for visit, don't forget to conect with me on [Linkedin](https://www.linkedin.com/in/robertojrcdc/) ✌
