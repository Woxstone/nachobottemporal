class User {
    constructor(id, username, first_name, status, gastos) {
      this.id = id;
      this.username = username;
      this.first_name = first_name;
      this.status = status;
      this.gastos = [];
    }
    newUser(id, username, first_name, status, gastos) {
      const u = new User(id, username, first_name, status, gastos);
      return u
    }
    addGasto(gasto) {
      const g = gasto;
      this.gastos.push(g); // hacer que devuelva un exito si el gasto se ha push correctamente
    }
    get allGastos() {
      return this.gastos
    }
  }