(function () {
  "use strict";

  angular.module('public')
    .controller('InfoController', InfoController);

  InfoController.$inject = ['MenuService', 'SignUpService'];
  function InfoController(MenuService, SignUpService) {
    var $ctrl = this;

    $ctrl.user = SignUpService.getUserData();
    $ctrl.userDataExists = typeof $ctrl.user === "object";

    if ($ctrl.userDataExists) {
      MenuService.getMenuItem($ctrl.user.favoriteDish).then(function(result) {
        $ctrl.favoriteDishDoesNotExist = false;
        $ctrl.menuItem = result;
      }).catch(function (reason) {
        if (typeof reason === "string") {
          // ToDo
        } else if (parseInt(reason.data.status, 10) === 500) {
          $ctrl.favoriteDishDoesNotExist = true;
        }
      });
    }
  }

})();
