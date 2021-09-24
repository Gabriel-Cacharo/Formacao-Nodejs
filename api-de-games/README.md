<h1 align="center">🎮 Api de Games</h1>
<p align="center">CRUD game project, with the functionality to create, edit and delete.</p>

<hr />

## 🛠️ Technologies used

- [ExpressJS](https://expressjs.com/pt-br/)
- [NodeJS](https://nodejs.org/en/)
- [Sequelize](https://sequelize.org/)
- [JWT](https://jwt.io/)

<hr />

## 📗 How to use

#### 1. First, you need to have [NodeJS](https://nodejs.org/en/) and [MySQL](https://www.mysql.com/) installed on your machine and you need to clone the repository to your computer.

#### 2. You need to create a table named `apidegames` and put your mysql password in `/database/index.js` in `password`.

#### 3. Install dependencies with `npm i` or `yarn`.

#### 4. And to turn on the _backend_, run the command in your terminal: `npm start` or `yarn start`. And to turn on the _frontend_ just open the .html file in the `/client` folder.

<hr />

## 📖 Routes

#### ➡️ `GET` /games

Return all games.

#### ➡️ `GET` /game/`id`

Returns a specific game.

#### ➡️ `POST` /games/ ( title, price )

Create a new game.

#### ➡️ `DELETE` /game/`id`

Delete a specific game.

#### ➡️ `PUT` /game/`id`

Edit a specific game.

#### ➡️ `POST` /users

Create a new user.

#### ➡️ `POST` /auth

Authentication route, returning token.

<hr />

<h5 align="center">By: Gabriel Cacharo 🤍</h5>
