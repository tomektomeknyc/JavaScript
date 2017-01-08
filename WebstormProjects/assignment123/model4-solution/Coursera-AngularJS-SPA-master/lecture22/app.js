(function () {
  'use strict';

  angular.module('ShoppingListApp',[])
  .controller('ShoppingListController', ShoppingListController)
  .provider('ShoppingListService', SLSP)
  .config(Config);

  Config.$inject = ['ShoppingListServiceProvider'];
  function Config(slsp) {
    slsp.defaults.maxItems = 2;
  }

  ShoppingListController.$inject = ['ShoppingListService'];
  function ShoppingListController(sls) {
    var list = this;

    list.items = sls.getItems();

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function () {
      try{
        sls.addItem(list.itemName, list.itemQuantity);
      }catch(e){
        list.errorMessage = e.message;
      }
    };

    list.removeItem = function (itemIndex) {
      sls.removeItem(itemIndex);
    };
  }

  function ShoppingListService(maxItems) {
    var service = this;

    var items = [];

    service.addItem = function(itemName, quantity){
      if((maxItems === undefined) ||
          (maxItems !== undefined) && (items.length < maxItems)){
            var item = {
              name: itemName,
              quantity: quantity
            };
            items.push(item);
          }
          else{
            throw new Error("Max items (" + maxItems + ") reached.");
          }
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };

    service.getItems = function () {
      return items;
    };
  }

  function SLSP() {
    var provider = this;

    provider.defaults = {
      maxItems: 10
    };

    provider.$get = function () {
      var shoppingList = new ShoppingListService(provider.defaults.maxItems);

      return shoppingList;
    };
  }
})();
