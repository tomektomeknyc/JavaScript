(function(){
  'use strict';
  angular.module('MsgApp',[])
  .controller('MsgController', MsgController);
  MsgController.$inject = ['$scope'];
  function MsgController($scope){
    $scope.name = "Waqas";
    $scope.bulbState = "off";
    $scope.message = "hi";
    $scope.sayMessage = function(){
      return "Waqas likes to Play Tekken all day";
    };
    $scope.switchBulb = function(){
      if($scope.bulbState === "off"){
        $scope.bulbState = "on";
      }else{
        $scope.bulbState = "off";
      }
    }
  }
})();
