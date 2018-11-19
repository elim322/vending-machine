class VendingMachine {
  constructor(json) {
    this.data = require(json);
    this.coinInput = {
      nickel: 0,
      dime: 0,
      quarter: 0,
      loonie: 0,
      twoonie: 0
    };
    this.total = 0;
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

  queryCode(args) {
    const data = Object.entries(this.data.products);
    let code = undefined;

    data.map(product => {
      if (product[1].code === args) {
        return (code = `${product[1].name}`);
      } else {
        return code;
      }
    });
    return code;
  }

  queryDispense(arg) {
    const data = Object.entries(this.data.products);
    let item = data.find(element => element[1].code === arg);
    if (item[1].quantity === 0) {
      return "no product in stock";
    } else {
      item[1].quantity = item[1].quantity - 1;
      return item[1].quantity;
    }
  }

  queryCoins() {
    const data = Object.entries(this.data.balance);
    return data
      .reduce((acc, coins) => {
        acc.push(`${coins[1].name}: ${coins[1].quantity}`);
        return acc;
      }, [])
      .join(", ");
  }

  giveChange() {
    const data = Object.entries(this.data.products);
    let change = this.total - data[1].price;
    return change;
  }

  customerInput(coinInput, arg) {
    const data = Object.entries(this.data.products);
    if (coinInput === "nickel") this.coinInput.nickel++;
    if (coinInput === "dime") this.coinInput.dime++;
    if (coinInput === "quarter") this.coinInput.quarter++;
    if (coinInput === "loonie") this.coinInput.loonie++;
    if (coinInput === "twoonie") this.coinInput.twoonie++;

    const total = (this.total =
      this.coinInput.nickel * 5 +
      this.coinInput.dime * 10 +
      this.coinInput.quarter * 25 +
      this.coinInput.loonie * 100 +
      this.coinInput.twoonie * 200);
    if (total >= data[1].price) {
      this.queryDispense(arg);

      return this.giveChange();
    } else {
      return "insufficient funds";
    }
  }

  queryRefill() {
    const data = Object.entries(this.data.products);
    data.forEach(element => {
      if (element[1].quantity < element[1].limit)
        element[1].quantity = element[1].limit;
      if ((element[1].quantity = element[1].limit)) {
        return "vending machine full";
      }
    });
    return "items refilled";
  }

  coinsRefill() {
    const coins = Object.entries(this.data.balance);
    coins.forEach(coin => {
      if (coin[1].quantity < coin[1].limit) coin[1].quantity = coin[1].limit;
      if ((coin[1].quantity = coin[1].limit)) {
        return "coins full";
      }
    });
    return "coins refilled";
  }
}

module.exports = VendingMachine;
