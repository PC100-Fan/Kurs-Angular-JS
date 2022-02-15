(function () {
    'use strict';

    angular.module("MenuApp")
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

            // Home page
            .state('home', {
                url: '/',
                templateUrl: 'src/menuapp/templates/home.template.html'
            })

            // Categories list
            .state("categories", {
                url: '/categories',
                templateUrl: "src/menuapp/templates/categories.template.html",
                controller: 'CategoriesListController as categoriesList',
                resolve: {
                    categoryItems: ['menuDataService', function (menuDataService) {
                        return menuDataService.getAllCategories();
                    }]
                }
            })

            // Items list
            .state("items", {
                url: '/categories.menu-items-for-category/{categorieShortName}',
                templateUrl: "src/menuapp/templates/items.template.html",
                controller: 'MenuItemsListController as menuItemsList',
                resolve: {
                    // $transition$, see https://ui-router.github.io/ng1/docs/latest/modules/injectables.html#_transition_
                    menuItemsAndCategory: ['menuDataService', '$transition$',
                        function (menuDataService, $transition$) {
                            return menuDataService.getItemsForCategory($transition$.params().categorieShortName);
                        }]
                }
            });

    }
})();