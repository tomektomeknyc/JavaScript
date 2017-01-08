(function () {
  'use strict';
  angular.module('ShoppingListApp',[])
  .controller('ShoppingListAddController', ShoppingListAddController)
  .controller('ShoppingListShowController', ShoppingListShowController)
  .service('ShoppingListService', ShoppingListService);
  // ShoppingListAddController.$inject = ['$scope'];
  // ShoppingListShowController.$inject = ['$scope'];
  ShoppingListAddController.$inject = ['ShoppingListService'];
  function ShoppingListAddController(sls) {
    var itemAdder = this;
    itemAdder.itemName = "";
    itemAdder.itemQuantity = "";
    itemAdder.addItem = function () {
      sls.addItem(itemAdder.itemName, itemAdder.itemQuantity);
    };
  }

  ShoppingListShowController.$inject = ['ShoppingListService'];
  function ShoppingListShowController(sls) {
    var showList = this;
    showList.items = sls.getItems();
    showList.removeItem = function (itemIndex) {
      sls.removeItem(itemIndex);
    };
  }
  function ShoppingListService() {
    var service = this;
    var items = [];
    service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    };
    service.getItems = function () {
      return items;
    };
    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    }
  }
})();
