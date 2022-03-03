(function () {
    "use strict";

    // see: https://stackoverflow.com/questions/12864887/angularjs-integrating-with-server-side-validation

    angular.module('public')
        .directive('shortNameExists', ShortNameExists);

    ShortNameExists.$inject = ['MenuService'];
    function ShortNameExists(MenuService) {
        var toId;
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                //when the scope changes, check the email.
                scope.$watch(attr.ngModel, function (value) {
                    // if there was a previous attempt, stop it.
                    if (toId) clearTimeout(toId);

                    // start a new attempt with a delay to keep it from
                    // getting too "chatty".
                    toId = setTimeout(function () {
                        // call to some API that returns something like  { isValid: true } or { isValid: false }
                        MenuService.getMenuItem(value).then(function () {
                            //set the validity of the field
                            ctrl.$setValidity('shortNameExists', true);
                        }).catch(function (reason) {
                            if (typeof reason === "string") {
                                // ToDo
                            } else if (parseInt(reason.data.status, 10) === 500) {
                                //set the validity of the field
                                ctrl.$setValidity('shortNameExists', false);
                            }
                        });

                    }, 200);
                })
            }
        }
    }

})();

//  <input type="text" ng-model="userfavoriteDish" name="userfavoriteDish" required short-name-exists />
// <span ng-show="myFormName.userfavoriteDish.$error.shortNameExists">Favorite Dish does not exist.</span>
