(function () {
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller(
    'NarrowItDownController',
    NarrowItDownController)
  .controller(
    'FoundItemsDirectiveConroller',
    FoundItemsDirectiveConroller)
  .service(
    'MenuSearchService',
    MenuSearchService)
  .directive(
    'foundItems',
    FoundItemsDirective)
  .constant(
    'ApiBasePath',
    "https://davids-restaurant.herokuapp.com/");

  function FoundItemsDirective() {
    var ddo ={
      restrict:'E',
      templateUrl: 'foundItems.html',
      controller: 'FoundItemsDirectiveConroller as found',
      bindToController: true,
      scope:{
        foundItems: '<',
        onRemove: '&',
        message: '@'
      }
    };

    return ddo;
  }

  function FoundItemsDirectiveConroller() {
    var found = this;

    found.messageExists = function () {
      return found.message.length > 0;
    }

    found.tableExists = function () {
      return found.foundItems.length > 0;
    }
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;

    narrow.found = [];
    narrow.searchTerm = '';

    narrow.getMatchedMenuItems = function () {
      if(narrow.searchTerm.length > 0){
        MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
        .then(function (result) {
          narrow.found = result;
          if(narrow.found.length == 0){
            narrow.message = "Nothing Found";
          }else{
            narrow.message = "";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }else{
        narrow.message = "Nothing Found";
        narrow.found = [];
      }
    };

    narrow.removeItem = function (itemIndex) {
      narrow.found.splice(itemIndex, 1);
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm){
      return $http({
        method:"GET",
        url:(ApiBasePath + "/menu_items.json"),
      })
      .then(
        function (result) {
          // process result and only keep items that match
          var foundItems = [];

          for(var i = 0; i < result.data.menu_items.length; i++){
            if(
              result.data.menu_items[i]
              .description.toLowerCase()
              .indexOf(searchTerm.toLowerCase()) != -1){
              foundItems.push(result.data.menu_items[i]);
            }
          }
          // return processed items
          return foundItems;
        });
    };
  }
})();
