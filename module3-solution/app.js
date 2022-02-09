(function () {
    'use strict';

    const mainUrl = "http://davids-restaurant.herokuapp.com/";
    // http://davids-restaurant.herokuapp.com/categories.json
    // http://davids-restaurant.herokuapp.com/menu_items.json
    // http://davids-restaurant.herokuapp.com/menu_items.json?categorie=B

    angular.module("NarrowItDownApp", [])
        .controller("NarrowItDownController", NarrowItDownController)
        .service("menuSearchService", MenuSearchService)
        .directive("menuItems", MenuItemsDirective)
        .constant("mainUrl", mainUrl)
        .constant("menuItemsUrl", mainUrl + "menu_items.json");

    /* MenuItemDirective.$inject(""); */
    function MenuItemsDirective() {
        var ddo = {
            templateUrl: "menuItems.html",
            restrict: "E",
            /* scope: false (default)
            scope: true */
            scope: {
                myFoundItems: "<foundItems",
                myRemoveMenuItem: "&onRemove"
            }
        };
        return ddo;
    }

    NarrowItDownController.$inject = ["menuSearchService"];
    function NarrowItDownController(menuSearchService) {
        var down = this;

        // found-Array, used the name "foundItems" instead of "found"
        down.foundItems = null;

        down.getMatchedMenuItems = function () {
            menuSearchService.getMatchedMenuItems(down.searchTerm.toLowerCase()).then(function (result) {
                down.foundItems = result;
            }).catch(function (error) {
                down.foundItems = [];
                console.log(error);
            });
        };

        down.removeMenuItem = function (menuItemIndex) {
            if (down.foundItems instanceof Array &&
                menuItemIndex >= 0 && menuItemIndex < down.foundItems.length) {
                down.foundItems.splice(menuItemIndex, 1);
            }
        };
    }

    MenuSearchService.$inject = ["$http", "$q", "menuItemsUrl"]
    function MenuSearchService($http, $q, menuItemsUrl) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            if (!searchTerm) {
                return $q.reject("No searchTerm.");
            }

            return $http({
                method: "GET",
                url: menuItemsUrl
            }).then(function (result) {
                // found-Array
                var foundItems = result.data.menu_items
                    .filter(menuItem => menuItem.description.toLowerCase().indexOf(searchTerm) >= 0)
                return foundItems;
            });
        };
    }

})();
