(function () {
var app = angular.module('NarrowItDownApp', []);
app.controller('NarrowItDownController', NarrowItDownController);
app.directive('foundItems', FoundItemsDirective);
app.service('NarrowItDownService', NarrowItDownService);


function FoundItemsDirective() {

  var ddo = {
    templateUrl : 'html/foundItems.html',
    restrict: 'AE',
    scope : {
      items : '<',
      onRemove : '&'
    }
  };
  return ddo;
};


NarrowItDownController.$inject = ['NarrowItDownService']
function NarrowItDownController(NarrowItDownService) {

  var narrowCtrl = this;
  narrowCtrl.found = [];

  narrowCtrl.searchItems = function() {
    narrowCtrl.txt = 'show';
    narrowCtrl.found = NarrowItDownService.getFoundItems(narrowCtrl.search);
  };

  narrowCtrl.removeItems = function(index) {
   NarrowItDownService.dontWantItems(narrowCtrl.found, index);
  }
}

NarrowItDownService.$inject = ['$http']
function NarrowItDownService($http) {
  var service = this;
  service.getFoundItems = function (searchItem) {
    var foundItems = [];
    var total;
    $http({
      method: 'GET',
      url : ('https://davids-restaurant.herokuapp.com/menu_items.json')
    }).then(function (result) {

        var menu_items = result.data.menu_items;
        for (var i = 0; i < menu_items.length; i++) {
          if (menu_items[i].description.indexOf(searchItem) > -1) {
            foundItems.push(menu_items[i]);
          }



        }

    });

    return foundItems;
  };

  service.dontWantItems = function (array, index) {
    array.splice(index, 1);
  };

}
}());
