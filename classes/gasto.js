class Gasto {
    constructor(date, concept, value) {
      this.date = date;
      this.concept = concept;
      this.value = value; 
    }
    newGasto(date, concept, value) {
        const g = new Gasto(date, concept, value);
        return g
    }
  }