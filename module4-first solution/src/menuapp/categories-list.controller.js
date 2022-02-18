(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoriesListController', CategoriesListController);


    CategoriesListController.$inject = ['categoryItems'];
    function CategoriesListController(categoryItems) {
        var categoriesList = this;
        categoriesList.categoryItems = categoryItems;
    }

})();