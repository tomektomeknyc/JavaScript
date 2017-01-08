(function(){
  'use strict';
  angular.module('NarrowItDownApp',[])
  .constant('ApiBasePath',"https://davids-restaurant.herokuapp.com")
  .controller('NarrowItDownController',NarrowItDownController)
  .service('menuSearchService',MenuSearchService)
  .directive('foundItems',FoundItems);

  function FoundItems(){
    var ddo = {
      templateUrl: 'narrowItems.html',
      restrict: 'E',
      scope:{
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundItemsController',
      bindToController: true,
      link: FoundItemsDirectiveLink
    };

    return ddo;
  }

  function FoundItemsDirectiveLink(scope, element, attrs, controller){
    scope.$watch('foundItemsController.listIsEmpty()', function (newValue, oldValue) {    

      if (newValue === true) {
        scope.foundItemsController.showNothingMsg = true;
      }
      else {
        scope.foundItemsController.showNothingMsg = false;
      }
    });
  }

  function FoundItemsDirectiveController(){
    var foundItemsController = this;
    foundItemsController.showNothingMsg = false;
    foundItemsController.listIsEmpty = function(){
      return foundItemsController.found == null ? false : foundItemsController.found.length > 0? false:true;
    }

  }

  NarrowItDownController.$inject = ['menuSearchService'];
  function NarrowItDownController(menuSearchService){
    var narrowController = this;
    narrowController.found = null;
    narrowController.searchTerm = "";

    narrowController.removeItem = function(index){
      narrowController.found.splice(index,1);
    };

    narrowController.narrowIt = function(){
      narrowController.found = [];

      if(narrowController.searchTerm){
        var promise = menuSearchService.getMatchedMenuItems(narrowController.searchTerm);
        promise.then(function(data){
          narrowController.found = data;
        });
      }else{
        narrowController.found = [];
      }
    };
  }

  MenuSearchService.$inject = ['$http','ApiBasePath'];
  function MenuSearchService($http,ApiBasePath){
    var menuService = this;

    menuService.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: 'GET',
        url: ApiBasePath+'/menu_items.json'
      }).then(function(response){
          var foundItems = [];
          var itemsGet = response.data.menu_items;
          for(var i = 0; i < itemsGet.length; i++){
            if(itemsGet[i].description.indexOf(searchTerm) != -1){
              foundItems.push(itemsGet[i]);
            }
          }
          return foundItems;
      }).catch(function(response){
          console.log(response);
      });
    }
  }

})();
