(function(){
  'use strict';
  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;
    toBuy.toBuyList = ShoppingListCheckOffService.getToBuyList();
    toBuy.buy = function(index){
      ShoppingListCheckOffService.boughtItem(index);
    }

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var alreadyBought = this;
    this.alreadyBoughtList = ShoppingListCheckOffService.getAlreadyBoughtList();
  }

  function ShoppingListCheckOffService(){
    var service = this;
    var toBuyList = [
      { name: "cookies", quantity: 10 },
      { name: "chips", quantity: 5 },
      { name: "milk", quantity: 2 },
      { name: "bread", quantity: 10 },
      { name: "Orange Juice", quantity: 100 }
    ];
    var alreadyBoughtList = [];

    this.boughtItem = function(index){
      alreadyBoughtList.push(toBuyList[index]);
      toBuyList.splice(index,1);
    }

    this.getToBuyList = function(){
      return toBuyList;
    }

    this.getAlreadyBoughtList = function (){
      return alreadyBoughtList;
    }
  }

})();
