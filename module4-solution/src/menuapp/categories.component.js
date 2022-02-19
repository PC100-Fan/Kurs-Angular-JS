(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: "src/menuapp/templates/categories.template.html",
            controller: ['$transitions', CategoriesComponentController],
            bindings: {
                myCategoryItems: "<",
                onListMenus: "&"
            }
        });

    // CategoriesComponentController.$inject = ['...']; would be already done by inline notation
    // controller: ['...', '...', CategoriesComponentController]
    function CategoriesComponentController($transitions) {
        var $ctrl = this;

        $ctrl.doListMenus = function (myCategoryShortName) {
            console.log("$ctrl.doListMenus(myCategoryShortName= \"" + myCategoryShortName +
                "\") in CategoriesComponentController, file: categories.component.js");
            $ctrl.onListMenus({ theShortName: myCategoryShortName });
        }

        $ctrl.$onInit = () => {
            console.log("Init CategoriesComponentController in categories.component.js - myCategoryItems = ", $ctrl.myCategoryItems);
        };

        // Example 3 for error handling: Display error on source page and do not display target page
        var criteria = {};
        var cancel = $transitions.onError(criteria, function (trans) {
            var reason = trans.error(),
                detail = reason.detail;
            $ctrl.longErrorMessage = reason.message + "\n" +
                detail.config.url + "\nStatus: " +
                detail.status + " " + detail.statusText;

            // Display error message, which is on top
            window.scrollTo(0, 0);
        });

        $ctrl.$onDestroy = function () {
            cancel();
        };
    }
})();