const fs = require('fs')

// Ler Arquivos

// fs.readFile('./gabriel.shank', { encoding: 'utf-8' }, (erro, dados) => {
//   if (erro) {
//     console.log('Ocorreu uma falha durante a leitura do arquivo!' + erro)
//   } else {
//     console.log(dados)
//   }
// })

// Escrever Arquivos

// fs.writeFile('./gabriel.shank', 'Novo conteúdo do arquivo!', (err) => {
//   if (err) {
//     console.log('Ocorreu uma falha durante o salvamento do arquivo!' + err)
//   }
// })

// Ler e Escrever arquivos .json

// function modificarUsuario(nome, idade, nick) {
//   fs.readFile('./usuario.json', { encoding: 'utf-8' }, (erro, dados) => {
//     if (erro) {
//       console.log('Ocorreu uma falha durante a leitura do arquivo!' + erro)
//     } else {
//       var conteudo = JSON.parse(dados) // Texto para objeto

//       conteudo.nome = nome
//       conteudo.idade = idade
//       conteudo.nick = nick

//       fs.writeFile('./usuario.json', JSON.stringify(conteudo), (erro) => {
//         if (erro) {
//           console.log('Ocorreu uma falha durante o salvamento do arquivo!' + erro)
//         }
//       })
//     }
//   })
// }

// modificarUsuario('Jorge Paulo', 22, 'Jorgito22')
