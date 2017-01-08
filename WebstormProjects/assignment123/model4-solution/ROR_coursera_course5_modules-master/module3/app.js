(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'listItems.html',
    scope: {
      items: '<',
      searchTerm: '@term',
      message: '@message',
      onRemove: '&'
    },
    controller: FoundItemsController,
    controllerAs: 'list',
    bindToController: true
  };
  return ddo;
}

function FoundItemsController() {
  var menu = this;

  menu.items = [];
  menu.message = "Nothing Found!";
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.narrowDown = function () {
    MenuSearchService.getMatchedMenuItems(menu.searchTerm)
    .then(function (result) {
      menu.items = result.foundItems;
      menu.term = result.searchTerm;
      if (result.foundItems.length > 0) {
        menu.message = "";
      } else {
        menu.message = "Nothing Found!!";
      }
    });
  }

  menu.removeItem = function (index) {
    //console.log("Index:", index);
    menu.items.splice(index, 1);
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath)
    })
    .then(function (result) {
      var allItems = result.data;
      var foundItems = [];

      for(var i=0; i < allItems.menu_items.length; i++) {
        var curItem =  allItems.menu_items[i];
        if (searchTerm != null && searchTerm !== "" && curItem.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItems.push(curItem);
        }
      }
      return { searchTerm: searchTerm, foundItems: foundItems };
    })
    .catch(function (error) {
      console.log("Something is Terribly Wrong!!");
      return { searchTerm: "", foundItems: [] };
    });
  }

}


})();
