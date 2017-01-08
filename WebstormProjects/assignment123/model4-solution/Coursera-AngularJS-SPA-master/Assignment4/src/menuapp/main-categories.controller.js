(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('MainCategoriesController', MainCategoriesController);

  MainCategoriesController.$inject = ['categorylist'];
  function MainCategoriesController(categorylist) {
    var ctrl = this;

    ctrl.categories = 1;
    ctrl.categorylist = categorylist;
  }
})();
