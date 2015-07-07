app.controller('ModulesController', function($scope, $http, ModulesFactory) {
  
  $scope.$on('$stateChangeSuccess', function () {
    var defaultMessage = 'If you don\'t see a list of links here, you need to seed your database!\nIn your terminal, go to this app\'s directory and run `gulp seedDB`.\nThen try this page again.';

    ModulesFactory.getNodeModules()
      .then(function(modules) {
        $scope.nodeModules = modules;
        
        if (!$scope.nodeModules.length) {
          $scope.defaultMessage = defaultMessage;
        }
      });
  });
});