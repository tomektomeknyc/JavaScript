(function () {
  'use strict';

  angular.module('ShoppingListDirectiveApp', [])
  .controller('ShoppingListController1', ShoppingListController1)
  .controller('ShoppingListController2', ShoppingListController2)
  .factory('ShoppingListFactory', ShoppingListFactory)
  .controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
  .directive('shoppingList', ShoppingList)

  function ShoppingList() {
    var ddo = {
      templateUrl : 'shoppingList.html',
      scope: {
        items: '<',
        title: '@'
      },
      // controller: ShoppingListDirectiveController,
      // controllerAs: 'list',
      controller: 'ShoppingListDirectiveController as list',
      bindToController: true
    };

    return ddo;
  }

  function ShoppingListDirectiveController() {
    var list = this;

    list.cookiesInList = function () {
      for(var i = 0; i < list.items.length; i++){
        var name = list.items[i].name.toLowerCase();
        if(name.indexOf('cookie') !== -1){
          return true;
        }
      }
      return false;
    };
  }

  // LIST #1 - controller
  ShoppingListController1.$inject = ['ShoppingListFactory'];
  function ShoppingListController1(ShoppingListFactory) {
    var list = this;

    var shoppingList = ShoppingListFactory();

    list.items = shoppingList.getItems();
    var origTitle = 'Shopping List #1';
    list.title = origTitle + " (" + list.items.length + " items)";

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function () {
      shoppingList.addItem(list.itemName, list.itemQuantity);
      list.title = origTitle + " (" + list.items.length + " items)";
    };

    list.removeItem = function (itemIndex) {
      shoppingList.removeItem(itemIndex);
      list.title = origTitle + " (" + list.items.length + " items)";
    };

  }

  ShoppingListController2.$inject = ['ShoppingListFactory'];
  function ShoppingListController2(ShoppingListFactory) {
    var list = this;

    var shoppingList = ShoppingListFactory(3);

    list.items = shoppingList.getItems();

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function () {
      try {
          shoppingList.addItem(list.itemName, list.itemQuantity);
      } catch (e) {
        list.errorMessage = e.message;
      }
    };

    list.removeItem = function (itemIndex) {
      shoppingList.removeItem(itemIndex);
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

  function ShoppingListFactory() {
    var factory = function (maxItems) {
      return new ShoppingListService(maxItems);
    };

    return factory;
  }

})();
