(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: "src/menuapp/templates/categories.template.html",
            controller: CategoriesComponentController,
            bindings: {
                myCategoryItems: "<",
                onListMenus: "&"
            }
        });

    // CategoriesComponentController.$inject = ['...']; would be already done by inline notation
    // controller: ['...', '...', CategoriesComponentController]
    function CategoriesComponentController() {
        var $ctrl = this;

        $ctrl.doListMenus = function (myCategoryShortName) {
            console.log("$ctrl.doListMenus(myCategoryShortName= \"" + myCategoryShortName +
                        "\") in CategoriesComponentController, file: categories.component.js");
            $ctrl.onListMenus({theShortName: myCategoryShortName});
        }

        $ctrl.$onInit = () => {
            console.log("Init CategoriesComponentController in categories.component.js - myCategoryItems = ", $ctrl.myCategoryItems);
        };
    }
})();