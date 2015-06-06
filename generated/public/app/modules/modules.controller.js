app.controller('ModulesController', function($scope, $http, ModulesFactory) {
  
  $scope.$on('$stateChangeSuccess', function () {
    ModulesFactory.getNodeModules()
      .then(function(modules) {
        $scope.nodeModules = modules;
      });
  });

});