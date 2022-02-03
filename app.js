(function () {
    'use strict';

    angular.module('myFirstApp', [])
        .controller('myFirstController', function ($scope) {
            $scope.name = "Harald";
            $scope.sayHello = function () {
                return "Hello Harald!";
            }
        });

})();