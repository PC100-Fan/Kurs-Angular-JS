(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', lunchCheckController);

    lunchCheckController.$inject = ["$scope"];
    function lunchCheckController($scope) {
        $scope.lunchItems = "";
        $scope.result = "Input your lunch items separated by comma!";
        $scope.checkLunch = function () {
            var numberItems = CountItems($scope.lunchItems);

            $scope.input_state = "exists";
            switch (numberItems) {
                case 0:
                    $scope.result = "Please enter data first";
                    $scope.input_state = "missing";
                    break;
                case 1:
                case 2:
                case 3:
                    $scope.result = "Enjoy!";
                    break;
                default:
                    $scope.result = "Too much!";
                    break;
            }
        };
    }

    function CountItems(itemString) {
        const re = /\s*(?:,|$)\s*/

        var items = itemString.split(re).filter(word => word.length > 0);
        return items.length;
    }
})();