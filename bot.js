const { Telegraf } = require('telegraf')
const archivo = require('./archivo.js')
const config = require('./config.js')

const bot = new Telegraf(config.botToken)
// esto devuleve una promesa como gestinarla
let usuarios = archivo.lee(config.datafile) ?? []

bot.start((ctx) => {
  ctx.reply('Hola, soy vuestro robot de Telegram')
})

bot.help((contexto) => {
  //contexto es el contexto del mensaje
  contexto.reply(
    'Este bot te ayudará a gestionar tus gastos.\n escribe /gastos para ver los gastos',
  )
})

// Los comandos deben ir juntos al prinicpio, nunca detras del bot.on
bot.command('gastos', (contexto) => {
  const texto = contexto.message.text
  const username = contexto.message.from.username
  const nombre = contexto.message.from.first_name
  let devuelve = `Hola ${nombre}, aquí están tus gastos.\n`

  const user = users.filter((user) => user.username === username)
  user[0].gastos.forEach((gasto) => {
    devuelve += `He guardado el ${gasto}€\n`
  })
  contexto.reply(devuelve)

  // archivo.graba(config.datafile, usuarios)
})

bot.command('nuevo_usuario', (ctx) => {
  const iduser = ctx.message.from.id
  let respuesta
  // asegurarte que la promesa esta contestada por ahora siempre funciona pero no es como deberia hacerse 
  const user = usuarios.filter((user) => user.id === iduser)
  if (user.length === 0) {
    usuarios.push({
      id: iduser,
      username: ctx.message.from.username,
      nombre: ctx.message.from.first_name,
      status: 'parado', // https://es.wikipedia.org/wiki/M%C3%A1quina_de_estados
      gastos: [],
    })
    respuesta = `Acabo de crear tu usuario ${ctx.message.from.first_name}.\n crea tu primer gasto con /gastos`
    archivo.graba(config.datafile, usuarios)
  } else {
    respuesta = `Ya tienes un usuario ${ctx.message.from.first_name}.\n crea tus gastos con /gasto`
  }
  ctx.reply(respuesta)
  return
})

bot.hears('pablo', (contexto) => {
  contexto.reply('Pablo, recuerda apuntar tus gastos.')
})

bot.hears('graba', (contexto) => {
  archivo.graba(config.datafile, usuarios)
  contexto.reply('Estoy grabando los gastos.')
})

// bot.on('text', (contexto) => {
//   if (contexto.message.text === 'usuario') {
//     const texto = contexto.message.text
//     const username = contexto.message.from.username
//     const nombre = contexto.message.from.first_name
//     let user = users.filter((user) => user.username === username)
//     if (user.length === 0) {
//       users.push({
//         username,
//         nombre,
//         gastos: [],
//       })
//     }
//     user = users.filter((user) => user.username === username)
//     user[0].gastos.push(texto)
//     contexto.reply(`Acabo de crear tu usuario ${nombre}`)
//   } else {
//     contexto.reply('No entiendo ese comando')
//   }
// })

// update: {
//     update_id: 24475725,
//     message: {
//       message_id: 47,
//       from: {
//         id: 1557883152,
//         is_bot: false,
//         first_name: "Pablo",
//         username: "PabloRobotics",
//         language_code: "es",
//       },

bot.launch()
console.log('Bot iniciado. Envia comandos desde Telegram')
