(function () {
'use strict';

angular.module('foodModule',[])

.controller('foodController',foodController);
foodController.$inject = ['$scope'];

function foodController($scope){
  $scope.userInput = '';
  $scope.resultMessage = '';
  $scope.classMessage = '';
  $scope.showIfEmptyItem = false;
  $scope.borderRed = false;
  $scope.borderGreen = false;

  $scope.checkIfTooMuch = function(){
    $scope.borderRed = false;
    $scope.borderGreen = false;
    $scope.showIfEmptyItem = false;
    if($scope.userInput == ""){
      $scope.resultMessage = "Please enter data first";
      $scope.classMessage = "red";
      $scope.borderRed = true;
    }else{
        var inputArray = processInputText($scope.userInput);
        if(inputArray.length > 3){
          $scope.resultMessage = "Too much!";
        }else{
          $scope.resultMessage = "Enjoy!";
        }
        $scope.classMessage = "green";
        $scope.borderGreen = true;
    }
  };

  function processInputText(text){
    var arraySplited = text.split(',');
    var newArray = [];

    for(var i = 0; i < arraySplited.length; i++){
      if(arraySplited[i] != "" && arraySplited[i] != " "){
        newArray.push(arraySplited[i]);
      }else{
        $scope.showIfEmptyItem = true;
      }
    }

    return newArray;
  }
}

})();
