( function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getItems();

  toBuyList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.addItem(itemIndex);
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.showItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  var boughtItems = [];

  // List of tobuy items
  var itemsToBuy = [
    {
      name: "AngularJS Books",
      quantity: "1"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolates",
      quantity: "5"
    },
    {
      name: "Coursera SPA ",
      quantity: "10"
    },
    {
      name: "Beers",
      quantity: "10"
    }
  ];

  service.getItems = function () {
    return itemsToBuy;
  };

  service.showItems = function () {
    return boughtItems;
  };

  service.removeItem = function (itemIndex) {
    itemsToBuy.splice(itemIndex, 1);
  };

  service.addItem = function (itemIndex) {
    var item = {
      name: itemsToBuy[itemIndex].name,
      quantity: itemsToBuy[itemIndex].quantity
    };
    boughtItems.push(item);
  }
}

})();
