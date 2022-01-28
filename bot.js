const { Telegraf } = require('telegraf')
const archivo = require('./archivo.js')
const config = require('./config.js')
const Gasto = require('./classes/gasto')
const User = require('./classes/User')
const Users_lib = require('./classes/Users')

const bot = new Telegraf(config.botToken)
// esto devuleve una promesa como gestinarla.  adsfaefefaefafaefffaefeafeaf

let users_db = archivo.lee(config.datafile) ?? [] 
// aqui esta dando problemas en el terminal  Users = archivo.lee(config.datafile) ?? []
// ^

// TypeError: Assignment to constant variable. si pongo let me dice que Users ya esta defiana 
// que le cambio de mobr? porque en realidad son dos cosas 
let usersOfSystem = new Users_lib(users_db);

bot.start((ctx) => {
  ctx.reply('Hola, soy vuestro robot de Telegram')
})

bot.help((ctx) => {
  //contexto es el contexto del mensaje
  ctx.reply(
    'Este bot te ayudará a gestionar tus gastos.\n escribe /gastos para ver los gastos',
  )
})

// Los comandos deben ir juntos al prinicpio, nunca detras del bot.on
bot.command('gastos', (ctx) => {
  const texto = ctx.message.text
  const username = ctx.message.from.username
  const nombre = ctx.message.from.first_name
  let devuelve = `Hola ${nombre}, aquí están tus gastos.\n`

  const user = Users.filter((user) => user.username === username)
  user[0].gastos.forEach((gasto) => {
    devuelve += `He guardado el ${gasto}€\n`
  })
  ctx.reply(devuelve)

  // archivo.graba(config.datafile, usuarios)
})
// cambair los commandos
bot.command('nuevo_usuario', (ctx) => {
  const iduser = ctx.message.from.id;
  let respuesta = 'Algo a ido mal en nuevo usuario';
  // asegurarte que la promesa esta contestada por ahora siempre funciona pero no es como deberia hacerse
  // se podria hacer un a funcion global de esto para usarla en todos lo camandos que necesite
  messageUser = new User(iduser, ctx.message.from.username, ctx.message.from.first_name, 'parado', []);
   // cambair esto usando las nuevas propiedades
  if (!usersOfSystem.isUserStore(messageUser)) {
    usersOfSystem.addUser(messageUser);
    respuesta = `Acabo de crear tu usuario ${messageUser.first_name}.\n crea tu primer gasto con /graba`
    archivo.graba(config.datafile, Users)
  } else {
    respuesta = `Ya tienes un usuario ${messageUser.first_name}.\n crea tus gastos con /graba`
  }
  ctx.reply(respuesta);
  return;
})

bot.command('graba', (ctx) => {
  const iduser = ctx.message.from.id;
  let answer;
  let user = Users.filter((user) => user.id === iduser)  // getUserById
  if (user.length === 0) {
    ctx.reply(`${ctx.message.from.first_name} no tienes un usuario ahora te lo creo.`);
    Users.push({
      id: iduser,
      username: ctx.message.from.username,
      nombre: ctx.message.from.first_name,
      status: 'parado', // https://es.wikipedia.org/wiki/M%C3%A1quina_de_estados
      gastos: [],
    })
    answer = `Acabo de crear tu usuario ${ctx.message.from.first_name}.\n crea tu primer gasto con /gastos`
    archivo.graba(config.datafile, Users)
  } else {
    answer = `Ya tienes un usuario ${ctx.message.from.first_name}.\n crea tus gastos con /gasto`
  }
  ctx.reply(answer);

  user = Users.find(user => user.id === iduser);
  user.status = 'listening';
  while (user.status === 'listening') { // 1 pasar el json a array de objetos 2 modificarlo 3 volverlo a escribir entero 
    
    archivo.graba(config.datafile, user)  // no se como puntar esto a que grabe en gasto
    ctx.reply('Estoy grabando los gastos.')
    if (ctx.message.text === 'F') {
      user.status = 'parado';
    }
  };
    ctx.reply('Tus gastos an sido guardados.');
})

bot.hears('pablo', (contexto) => {
  contexto.reply('Pablo, recuerda apuntar tus gastos.')
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

// console.log(ctx.message);

bot.launch()
console.log('Bot iniciado. Envia comandos desde Telegram')