(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    // .service ShoppingListCheckOffService

    ToBuyController.$inject = ["ShoppingListCheckOffService"];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.buy = ShoppingListCheckOffService.buy;
    }

    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var boughtItems = [],
            toBuyItems = [
                { name: "Cookies", quantity: 10 },
                { name: "Gelbwurst", quantity: 1 },
                { name: "Drops", quantity: 2 },
                { name: "Fränkische Bratwürste", quantity: 4 },
                { name: "Flaschen Bier", quantity: 2 }
            ];

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };

        service.buy = function (index) {
            if (index >= 0 && index < toBuyItems.length) {
                var transferredItems = toBuyItems.splice(index, 1);
                boughtItems.push(transferredItems[0]);
            }
        };
    }



})();