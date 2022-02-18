(function () {
    'use strict';

    const mainUrl = "https://davids-restaurant.herokuapp.com/";

    angular.module('data')
        .constant("menuCategoriesUrl", mainUrl + "categories.json")
        .constant("menuItemsUrlWithCategoryParameter", mainUrl + "menu_items.json?category=")
        .service('menuDataService', MenuDataService);

    MenuDataService.$inject = ["$http", "$q", "menuCategoriesUrl", "menuItemsUrlWithCategoryParameter"];
    function MenuDataService($http, $q, menuCategoriesUrl, menuItemsUrlWithCategoryParameter) {
        var service = this;

        // id, short_name, name, special_instructions, url
        service.getAllCategories = function () {
            return $http({
                method: "GET",
                url: menuCategoriesUrl
            }).then(function (result) {
                var foundCategories = result.data;
                return foundCategories;
            }, function (errorResponse) {
                // Example 1 for error handling: Display target page with error message
                return { errorObject: errorResponse };
            });
        };

        // id, short_name, name, description, price_small, price_large, small_portion_name, large_portion_name
        service.getItemsForCategory = function (categoryShortName) {
            // get url from categoryShortName

            return $http({
                method: "GET",
                url: menuItemsUrlWithCategoryParameter + categoryShortName
            }).then(function (result) {
                var foundMenuItemsAndCategory = result.data;
                return foundMenuItemsAndCategory;
            });
        };
    }

})();