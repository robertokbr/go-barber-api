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

## 🏗 Architecture:
* `Runtime`: Node.JS with TypeScript 
* `API`: RESTfull
* `Architectural pattern`: Data mapper pattern
* `DB Abstraction`: Typeorm
* `Persistent data store`: Postgres + Docker
* `Authentication`: JWT

## 🎈 Project Style

* EditorConfig
* Eslint -config-airbnb
* Prettier

## 🕹 Features

* Create User
* Create Session by E-mail and Password and get a JWT token
* Use Authenticated Routes
* Create Appointments with ( User->Appointments ) relation one to many
* Get Appointments
* Upload Avatar
* Update Avatar 

## 🔧 Other configs

* Global Exception catch class


## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [Yarn v1.13][yarn] or higher installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/robertokbr/GoBarber

# Go into the repository
$ cd GoBarber

# Install dependencies
$ yarn install

# Run the app
$ yarn dev:server
```
---
