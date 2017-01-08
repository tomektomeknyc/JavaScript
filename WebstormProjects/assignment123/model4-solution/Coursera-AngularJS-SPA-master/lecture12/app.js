(function (){
  'use strict';

  angular.module('MsgApp', [])
  .controller('MsgController', MsgController);

  MsgContorller.$inject = ['$scope', '$filter'];
  function MsgController($scope, $filter){
    $scope.name = "Waqas";
    $scope.stateOfBeing = "hungry";

    $scope.sayMessage = function (){
      var msg = "Waqas likes to drink pepsi at night";
      var output = $filter('uppercase')(msg)
      return output;
    };

    $scope.feedWaqas = function(){
      $scope.stateOfBeing = "fed";
    };
  }
})();
