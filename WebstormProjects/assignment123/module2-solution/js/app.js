( function () {
  "use strict";

  angular.module("ShoppingListCheckOff", [])
  .controller("ToBuyController", ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var shoppingList = this;

    shoppingList.itemName = "";
    shoppingList.itemQuantity = "";

    shoppingList.removeItem = function (itemname, itemquantity, itemIndex) {
      ShoppingListCheckOffService.removeItem(itemname, itemquantity, itemIndex);

    }
    shoppingList.items = ShoppingListCheckOffService.getItems();
  };

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.alreadyBought = ShoppingListCheckOffService.showItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var productItems = [
      {
        name: "cookies",
        quantity: 10
      },
      {
        name: "cookies",
        quantity: 50
      },
      {
        name: "cookies",
        quantity: 100
      },
      {
        name: "cookies",
        quantity: 200
      },
      {
        name: "cookies",
        quantity: 400
      }

    ];
    var boughtItems = [];


    service.getItems= function () {
      return productItems;
    }

    service.showItems = function () {
      return boughtItems;
    }

    service.removeItem = function (itemname, itemquantity, itemIndex) {
      var item = {
        name: itemname,
        quantity: itemquantity
      };
      boughtItems.push(item);
      productItems.splice(itemIndex, 1);
      return productItems.length;
    }


  }

})();
