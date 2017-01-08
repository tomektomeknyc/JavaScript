(function(){
  'use strict';
  angular.module('LunchCheck',[])
  .controller('LunchCheckController', LunchCheckController);
  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope){
    $scope.itemList = "";
    $scope.message = "";
    $scope.messageClass = "";
    $scope.textboxClass = "";
    $scope.checkItems = function(){
      var array = $scope.itemList.split(',');
      var count = 0;
      for(var i = 0; i < array.length; i++){
        if(array[i].trim() != ""){
          count = count + 1;
        }
      }
      if(count == 0)
      {
        $scope.message = "Please enter data first";
        $scope.messageClass = "redFont";
        $scope.textboxClass = "redBorder";
      }else{
        $scope.messageClass = "greenFont";
        $scope.textboxClass = "greenBorder";
        if(count <= 3){
          $scope.message = "Enjoy!";
        }else{
          $scope.message = "Too much!";
        }
      }
    };
  }
})();
