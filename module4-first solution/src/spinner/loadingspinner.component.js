(function () {
  'use strict';

  angular.module('Spinner')
    .component('loadingSpinner', {
      templateUrl: 'src/spinner/loadingspinner.template.html',
      controller: SpinnerController
    });


  // see https://ui-router.github.io/ng1/docs/latest/modules/transition.html
  // and https://ui-router.github.io/ng1/docs/latest/classes/transition.transition-1.html
  SpinnerController.$inject = ['$transitions']
  function SpinnerController($transitions) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $transitions.onStart({},
        function (trans) {
          $ctrl.showSpinner = true;

          trans.promise.finally(
            function (trans) {
              $ctrl.showSpinner = false;
            });
        });
    };
  };

})();
