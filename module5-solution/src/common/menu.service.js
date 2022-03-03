(function () {
  "use strict";

  angular.module('common')
    .service('MenuService', MenuService);


  MenuService.$inject = ['$http', 'ApiPath', '$q'];
  function MenuService($http, ApiPath, $q) {
    var service = this;

    service.getCategories = function () {
      return $http.get(ApiPath + '/categories.json').then(function (response) {
        return response.data;
      });
    };


    service.getMenuItems = function (category) {
      var config = {};
      if (category) {
        config.params = { 'category': category };
      }

      return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
        return response.data;
      });
    };

    service.getMenuItem = function (shortName) {
      var config = {};

      if (typeof shortName === "string") {
        return $http.get(ApiPath + '/menu_items/' + shortName.toUpperCase() + '.json', config)
          .then(function (response) {
            return response.data;
          });
      } else {
        return $q.reject("Short name is not a string!");
      }
    };

  }



})();
