(function () {
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
      var buy = this;
      buy.items = ShoppingListCheckOffService.getItemsToBuy();
      buy.buyItem = function (itemIndex) {
        ShoppingListCheckOffService.buyItem(itemIndex);
      };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.items = ShoppingListCheckOffService.getItemsBought();
  }

function ShoppingListCheckOffService() {
  var service = this;
  var itemsToBuy = [
    {
      name:"cookies",
      quantity:"10"
    },
    {
      name:"Chips",
      quantity:"5"
    },
    {
      name:"Soda",
      quantity:"3"
    }
  ];
  var itemsBought = [];

  service.buyItem = function (itemIndex) {
    itemsBought.push(itemsToBuy[itemIndex]);
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  }

  service.getItemsBought = function () {
    return itemsBought;
  }
}
})();
