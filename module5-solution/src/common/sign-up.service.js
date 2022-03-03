(function () {
  "use strict";

  angular.module('common')
    .service('SignUpService', SignUpService);

  SignUpService.$inject = ['$http', 'ApiPath'];
  function SignUpService($http, ApiPath) {
    var service = this;
    var myUser;

    service.setUserData = function (user) {
      myUser = user;
    };

    service.getUserData = function () {
      return myUser;
    };
  }

})();
