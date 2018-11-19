const VendingMachine = require("../lib/vending-machine.js");

describe("VendingMachine", () => {
  let vendingMachine;

  describe("queryStock", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine("../data.json");
    });
    describe("currentStock", () => {
      it("should return name, quantity, price, and code of products", () => {
        expect(vendingMachine.queryStock()).toEqual(
          "coke: 5 135 A1, pepsi: 7 130 A2, sprite: 9 130 B1, water: 4 120 B2, orange: 3 90 C1, apple: 8 90 C2"
        );
      });
    });
  });

  describe("queryCode", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine("../data.json");
    });
    describe("get item by code", () => {
      it("should return item associated to code", () => {
        expect(vendingMachine.queryCode("A1")).toEqual("coke");
      });
    });
    describe("should not return product if product does not exist", () => {
      it("should return message", () => {
        expect(vendingMachine.queryCode("A3")).toEqual(undefined);
      });
    });
  });

  describe("queryCoins", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine("../data.json");
    });
    describe("query coins inventory", () => {
      it("should return coins inventory", () => {
        expect(vendingMachine.queryCoins()).toEqual(
          "nickel: 10, dime: 15, quarter: 12, loonie: 5, twoonie: 5"
        );
      });
    });

    describe("queryDispense", () => {
      beforeEach(() => {
        vendingMachine = new VendingMachine("../data.json");
      });
      describe("should dispense one coke", () => {
        it("should return one less coke quantity", () => {
          expect(vendingMachine.queryDispense("A1")).toEqual(4);
        });
      });
      // describe("returnChange", () => {
      //   describe("should return change when product dispenses", () => {
      //     it("should return correct change", () => {
      //       expect(vendingMachine.customerInput("twoonie", "A1")).toEqual(65);
      //     });
      //   });
      // });
    });

    describe("should not dispense if not enough coins inserted", () => {
      beforeEach(() => {
        vendingMachine = new VendingMachine("../data.json");
      });
      it("should return message", () => {
        expect(vendingMachine.customerInput("nickel")).toEqual(
          "insufficient funds"
        );
      });
    });
  });

  describe("queryRefill", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine("../data.json");
      vendingMachine.queryDispense("A2");
    });
    describe("should refill stock", () => {
      it("should refill contents of vending machine", () => {
        expect(vendingMachine.queryRefill()).toEqual("items refilled");
      });
    });
  });
  describe("coinsRefill", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine("../data.json");
    });
    describe("should refill coins", () => {
      it("should refill coins of vending machine", () => {
        expect(vendingMachine.coinsRefill()).toEqual("coins refilled");
      });
    });
  });
});
