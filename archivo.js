const fs = require('fs')

exports.graba = (filename, data) => {
  let dataBase = lee(filename);
  let n = 0; // arelgra lo del n
  // esto esta mal 
  do {
    n += 1;
  } while (data.id === dataBase[n - 1].id);
  dataBase[n - 1] = data; // esto no deberia ser un push? dataBase.push(data);
  fs.writeFile(filename, JSON.stringify(dataBase), (err) => {
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
