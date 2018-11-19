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
  describe("queryDispense", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine("../data.json");
    });
    describe("should dispense one coke with the correct change", () => {
      it("should return one less coke quantity", () => {
        expect(vendingMachine.queryDispense("A1")).toEqual(4);
      });
    });
  });
  describe("queryRefill", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine("../data.json");
      vendingMachine.queryDispense("A2");
      console.log(vendingMachine.queryStock());
    });
    describe("should refill stock", () => {
      it("should refill contents of vending machine", () => {
        expect(vendingMachine.queryRefill()).toEqual("items refilled");
        console.log(vendingMachine.queryStock());
      });
    });
  });
});
