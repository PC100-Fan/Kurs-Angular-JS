(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsStateController', ItemsStateController);

    ItemsStateController.$inject = ['menuItemsAndCategory'];
    function ItemsStateController(menuItemsAndCategory) {
        var itemsState = this;

        // Clone mmenu_items as we change the prices ;-)
        itemsState.menuItems = JSON.parse(
            JSON.stringify(menuItemsAndCategory.menu_items));
        itemsState.category = menuItemsAndCategory.category;

        // Change price representation!
        itemsState.menuItems.forEach(menuItem => {
            menuItem.price_small_formatted = CurrencyFormatted(menuItem.price_small);
            menuItem.price_large_formatted = CurrencyFormatted(menuItem.price_large);
        });

        itemsState.$onInit = () => {
            console.log("Init ItemsStateController in items-state.controller.js - menuItemsAndCategory = ", menuItemsAndCategory);
        };
    }

    // https://css-tricks.com/snippets/javascript/format-currency/
    function CurrencyFormatted(amount) {
        // from Chris Coyier

        if (!amount) { return null; }
        var i = parseFloat(amount);
        if (isNaN(i)) { i = 0.00; }
        var minus = '';
        if (i < 0) { minus = '-'; }
        i = Math.abs(i);
        i = parseInt((i + .005) * 100);
        i = i / 100;
        var s = new String(i);
        if (s.indexOf('.') < 0) { s += '.00'; }
        if (s.indexOf('.') == (s.length - 2)) { s += '0'; }
        s = minus + s;
        return s;
    }
})();