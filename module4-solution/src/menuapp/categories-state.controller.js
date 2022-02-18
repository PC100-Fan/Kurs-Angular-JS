(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoriesStateController', CategoriesStateController);

    CategoriesStateController.$inject = ['categoryItems', '$state'];
    function CategoriesStateController(categoryItems, $state) {
        var categoriesState = this;

        categoriesState.categoriesStateItems = categoryItems;

        categoriesState.listMenus = function (catShortName) {
            console.log("categoriesState.listMenus(catShortName = \"" + catShortName + "\") in CategoriesStateController, file: category-state.controller.js");
            $state.go('items', {categoryShortName: catShortName});
        }

        categoriesState.$onInit = () => {
            console.log("Init CategoriesStateController in categories-state.controller.js - categoryItems = ", categoryItems);
        };
    }
})();