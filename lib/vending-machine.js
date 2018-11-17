class VendingMachine {
  constructor(json) {
    this.data = require(json);
  }
  queryStock() {
    const data = Object.entries(this.data.products);
    return data
      .reduce((acc, product) => {
        acc.push(`${product[1].name}: ${product[1].quantity}`);
        return acc;
      }, [])
      .join(", ");
  }

  queryEmpty() {}
}

module.exports = VendingMachine;
