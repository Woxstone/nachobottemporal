class Users {
    constructor() {
      this.usersArry = [];
      this.usersMapId = []
    }
    addUser(user) {
      const u = user;
      this.usersArry.push(u);
      regenertareMapId();
      return u
    }
    regenertareMapId() {
      this.usersMapId = this.usersArry.map(this.usersArry.id);
    }
    get allUsers() {
      return this.usersArry
    }
    get numberOfUsers() {
      return this.usersArry.length
    }
    noEqualId() { // le he quitado el setter los setter tienen que ir con val al que le imprimes un propiedad
        for (let i = 0; i<this.usersMapId.length; i++) {
            for (let j = 0; j<this.usersMapId.length; j++) {
                if(this.usersMapId[i] === this.usersMapId[j]) {
                    console.log(`Hay dos id iguales en incide ${i}`);
                    return false
                };
            };
        };
        return true
    }
    set chekId(user) {
        for (let i = 0; i<this.usersMapId; i++) {
            if (user.id === this.usersMapId[i]) {
                console.log(`Hay dos id iguales en incide ${i}`);
                const devuelve = [false, i]; // apagno se puede hacer de otra forma?
                return devuelve
            };
        };
        return true
    }
  } // Y como se usa esto????