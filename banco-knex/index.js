var database = require('./database')

// INSERT

// var dados = [
//   {
//     name: 'Battlefield 1',
//     price: 62.9,
//   },
//   {
//     name: 'GTA 5',
//     price: 56.2,
//   },
// ]

// database
//   .insert(dados)
//   .into('games')
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// ---------------------------------------

// SELECT

// database
//   .select(['id', 'price'])
//   .table('games')
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// ---------------------------------------

// NESTED QUERIES

// database
//   .insert({ name: 'Slime Rancher', price: 27.9 })
//   .into('games')
//   .then((data) => {
//     database
//       .select()
//       .table('games')
//       .then((data) => {
//         console.log(data)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// ---------------------------------------

// WHERE

// database
// .select()
// .where({ name: 'GTA 5' })
// .orWhere({ id: 2 })
// .whereRaw("name = 'GTA 5' AND price > 50")
// .table('games')
// .then((data) => {
//   console.log(data)
// })
// .catch((err) => {
//   console.log(err)
// })

// ---------------------------------------

// RAW

// database
//   .raw('SELECT * FROM games')
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// ---------------------------------------

// DELETE

// database
//   .where({ id: 3 })
//   .delete()
//   .table('games')
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// ---------------------------------------

// UPDATE

// database
//   .where({ id: 6 })
//   .update({ name: 'Rainbow Six', price: 41.6 })
//   .table('games')
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// ---------------------------------------

// ORDER BY

// database
//   .select()
//   .table('games')
//   .orderBy('price', 'asc')
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// ASSOCIATED INSERTS

// database
//   .insert({
//     name: 'Ubisoft',
//     gameid: 6,
//   })
//   .table('studios')
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// ---------------------------------------

// INNER JOIN ( 1 to 1 )

// database
//   .select(['games.*', 'studios.name as studio_name'])
//   .table('games')
//   .innerJoin('studios', 'studios.gameId', 'games.id')
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// ---------------------------------------

// INNER JOIN WITH WHERE ( 1 to 1 )

// database
//   .select(['games.*', 'studios.name as studio_name'])
//   .table('games')
//   .innerJoin('studios', 'studios.gameId', 'games.id')
//   .where('games.id', 6)
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// ---------------------------------------

// INNER JOIN ( 1 TO M )

// database
//   .select(['games.*', 'studios.name as studio_name'])
//   .table('games')
//   .innerJoin('studios', 'studios.gameId', 'games.id')
//   .where('games.id', 6)
//   .then((data) => {
//     let studiosArray = data
//     let game = {
//       id: 0,
//       name: '',
//       studios: [],
//     }

//     game.id = data[0].id
//     game.name = data[0].name

//     data.forEach((studio) => {
//       game.studios.push({ name: studio.studio_name })
//     })

//     console.log(game)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// ---------------------------------------

// INNER JOIN ( M TO M )

// database
//   .select(['studios.name as studio_name', 'games.name as game_name'])
//   .table('games_studios')
//   .innerJoin('games', 'games.id', 'games_studios.game_id')
//   .innerJoin('studios', 'studios.id', 'games_studios.studio_id')
//   .where('games.id', '6')
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// ---------------------------------------

// TRANSACTIONS

async function transactionTest() {
  try {
    await database.transaction(async (trans) => {
      await database.insert({ name: 'Valve' }).table('studios')
      await database.insert({ name: 'Pubg Corporation' }).table('studios')
      await database.insert({ name: 'Mojang' }).table('studios')
    })
  } catch (err) {
    console.log(err)
  }
}

transactionTest()

// ---------------------------------------
