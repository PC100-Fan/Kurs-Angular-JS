(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MenuService', 'SignUpService'];
  function SignUpController(MenuService, SignUpService) {
    var $ctrl = this;

    $ctrl.submit = function () {
      var shortName = $ctrl.user.favoriteDish;

      if (shortName) {
        MenuService.getMenuItem(shortName).then(function () {
          $ctrl.favoriteDishDoesNotExist = false;
          SignUpService.setUserData($ctrl.user);
          $ctrl.completed = true;
        }).catch(function (reason) {
          if (typeof reason === "string") {
            // ToDo
          } else if (parseInt(reason.data.status, 10) === 500) {
            $ctrl.favoriteDishDoesNotExist = true;
            $ctrl.completed = false;
          }
        });
      } else {
        $ctrl.favoriteDishDoesNotExist = false;
        $ctrl.completed = true;
      }
    };
  }

})();
