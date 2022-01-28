class Users {     // estudiar teoria de classes
    constructor(arrayOfUsers = []) { // mirar mejor esto
      this.usersArry = [];
      this.usersMapId = [];
      arrayOfUsers.forEach(usersJson => { // estudiar el funcionamiento
        let proxUser = new User(usersJson.id, usersJson.username, usersJson.first_name, usersJson.status, usersJson.gastos);
        this.addUser(proxUser);
      })
    }
    addUser(user) {
      const u = user;
      this.usersArry.push(u);
      regenertareMapId();
    }
    regenertareMapId() {
      this.usersMapId = this.usersArry.map(this.usersArry.id);
    }
    get allUsers() {
      return this.usersArry;
    }
    get numberOfUsers() {
      return this.usersArry.length;
    }
    isUserStore(user) {
        let result = false;
        result = (this.usersMapId.includes(user.id));
        return result;
    }
  } // Y como se usa esto????