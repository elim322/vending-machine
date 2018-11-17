const VendingMachine = require("../lib/vending-machine.js");

describe("VendingMachine", () => {
  let vendingMachine;

  describe("queryStock", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine("../data.json");
    });
    describe("currentStock", () => {
      it("should return current number of bottles", () => {
        expect(vendingMachine.queryStock()).toEqual(
          "coke: 5, pepsi: 7, sprite: 9, water: 4, orange: 3, apple: 8"
        );
      });
    });
  });
  describe("queryDispense", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine("../data.json");
    });
    describe("dispense", () => {
      it("should return one one less coke", () => {
        expect(vendingMachine.queryEmpty()).toEqual("coke: 4");
      });
    });
  });
});
