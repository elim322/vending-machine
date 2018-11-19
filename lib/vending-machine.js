class VendingMachine {
  constructor(json) {
    this.data = require(json);
  }
  queryStock() {
    const data = Object.entries(this.data.products);
    return data
      .reduce((acc, product) => {
        acc.push(
          `${product[1].name}: ${product[1].quantity} ${product[1].price} ${
            product[1].code
          }`
        );
        return acc;
      }, [])
      .join(", ");
  }
  queryDispense(arg) {
    const data = Object.entries(this.data.products);
    let item = data.find(element => element[1].code === arg);
    item[1].quantity = item[1].quantity - 1;
    return item[1].quantity;
  }
  queryRefill() {
    const data = Object.entries(this.data.products);
    console.log(data);
    data.forEach(element => {
      if (element[1].quantity < element[1].limit)
        element[1].quantity = element[1].limit;
    });
    return "items refilled";
  }
}

module.exports = VendingMachine;
