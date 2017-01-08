(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/main-categories.template.html',
    controller: 'MainCategoriesController as ctrl',
    resolve: {
      categorylist: ['MenuDataService',function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  .state('categories.items', {
      url: '/cateory-items/{cat}',
      templateUrl: 'src/menuapp/templates/main-items.template.html',
      controller: 'ItemDetailController as itemDetail',
      resolve:{
        items: ['$stateParams','MenuDataService', function ($stateParams, MenuDataService) {
                return MenuDataService.getItemsForCategory($stateParams.cat);
              }]
      }
    })
}

})();
