const fs = require('fs')

exports.graba = (filename, data) => {
  fs.writeFile(filename, JSON.stringify(data), (err) => {
    if (err) {
      console.log('Error al grabar.')
      throw err
    } else {
      console.log('Archivo grabado')
    }
  })
}
exports.lee = (filename) => {
  fs.readFile(filename, (err, data) => {
    if (err) {
      console.log(`Árchivo ${filename} no existe.`)
      // ver si es necesario un return quizas no es necesesaria la parte de:   ?? []
      return []
    } else {
      console.log('Archivo leido')
      return JSON.parse(data)
    }
  })
}
