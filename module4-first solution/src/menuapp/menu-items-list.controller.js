(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('MenuItemsListController', MenuItemsListController);


    MenuItemsListController.$inject = ['menuItemsAndCategory'];
    function MenuItemsListController(menuItemsAndCategory) {
        var menuItemsList = this;

        menuItemsList.category = menuItemsAndCategory.category;
        menuItemsList.menuItems = menuItemsAndCategory.menu_items;

        // BAD: Changes input!
        menuItemsList.menuItems.forEach(menuItem => {
            menuItem.price_small_formatted = CurrencyFormatted(menuItem.price_small);
            menuItem.price_large_formatted = CurrencyFormatted(menuItem.price_large);
        });
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