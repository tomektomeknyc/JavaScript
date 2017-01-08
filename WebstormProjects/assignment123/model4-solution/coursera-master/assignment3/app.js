    /**
     * Created by tomaszosuchowski on 12/21/16.
     */
    (function () {
        'use strict';
        var app = angular.module('NarrowItDownApp', []);
        app.controller('NarrowItDownController', NarrowItDownController);
        app.service('MenuSearchService', MenuSearchService);
        app.directive('foundItems', FoundItems);
        app.constant('UrlPath', "https://davids-restaurant.herokuapp.com");


           function FoundItems() {

                var ddo = {
                    restrict:'AE' ,
                 templateUrl: 'html/foundItems.html',
                    scope: {items: '<',
                        onRemove: '&'
                           }
                   // controller: NarrowItDownController,
                  //  controllerAs: 'list',
                  //  bindToController: true

                };

             return ddo;
           };





        NarrowItDownController.$inject= ['MenuSearchService'];

        function NarrowItDownController(MenuSearchService) {

            var searchCtrl = this;
            searchCtrl.found = [];

            searchCtrl.searchItems = function() {
                searchCtrl.txt = 'show';
                searchCtrl.found = MenuSearchService.getMatchedMenuItems(searchCtrl.search);

            };


            searchCtrl.remove = function (index) {

                MenuSearchService.removeItems(searchCtrl.found, index);
            }




        }
    MenuSearchService.$inject = ['$http']
        function MenuSearchService($http) {

           var service = this;
            var  foundItems = [];

            service.getMatchedMenuItems = function(searchItem) {

                 $http({
                    method: 'GET',
                    url: ('https://davids-restaurant.herokuapp.com/menu_items.json')

                }).then (function(result) {
                     var menu_items = result.data.menu_items;
                     for (var i = 0; i < menu_items.length; i++) {
                         if (menu_items[i].description.indexOf(searchItem) > -1) {
                             foundItems.push(menu_items[i]);
                         }
                     }

                 });
                return foundItems;

            };
    service.removeItems = function(array, index) {

        array.splice(index, 1);
    };

        }




    }());
