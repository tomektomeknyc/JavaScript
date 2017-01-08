(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.items = "";
  $scope.style = '';
  $scope.message = '';

  $scope.lunchTooMuch = function () {
    var trimmedItems = ($scope.items || '').trim();


    if (trimmedItems.length == 0) {
      $scope.style = 'error';
      $scope.message = 'Please enter data first';
      return;
    }

    var checkEmptyItem = function (element, index, array) {
      return element.trim().length > 0;
    };
    
    var filteredItems = trimmedItems.split(',').filter(checkEmptyItem);

    if(filteredItems.length > 3){
      $scope.style = 'success';
      $scope.message = 'Too much!';
    }else{
      $scope.style = 'success';
      $scope.message = 'Enjoy!';
    }

  };
}

})();
