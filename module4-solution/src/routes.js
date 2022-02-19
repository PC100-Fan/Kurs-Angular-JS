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
                template: "<categories my-category-items='categoriesState.categoriesStateItems' " +
                    "on-list-menus='categoriesState.listMenus(theShortName)'></categories>",
                controller: 'CategoriesStateController as categoriesState',
                resolve: {
                    categoryItems: ['menuDataService', function (menuDataService) {
                        return menuDataService.getAllCategories();
                    }]
                }
            })

            // Items list
            .state("items", {
                url: '/categories.menu-items-for-category/{categoryShortName}',
                template: "<items my-menu-items='itemsState.menuItems' " +
                    "my-category='itemsState.category'></items>",
                controller: 'ItemsStateController as itemsState',
                resolve: {
                    // $transition$, see https://ui-router.github.io/ng1/docs/latest/modules/injectables.html#_transition_
                    menuItemsAndCategory: ['menuDataService', '$transition$',
                        function (menuDataService, $transition$) {
                            return menuDataService.getItemsForCategory($transition$.params().categoryShortName)
                                /* .catch(function (error) {
                                    // Example 2 for (late) error handling: Do not display target page, display error message with alert.
                                    var errorMsg = "Error: " + error.config.url + "\n" + error.status + " " + error.statusText;
                                    console.log("Error while retrieving the data.\n" + errorMsg);
                                    alert(errorMsg);

                                    // throw error to not display the target page
                                    throw error;
                                }) */;
                        }]
                }
            });

    }
})();