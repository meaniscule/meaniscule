app.controller('HomeController', function($scope, $http) {
  
  $scope.$on('$stateChangeSuccess', function () {
    return $http.get('/api/modules/')
      .then(function(res) {
        $scope.nodeModules = res.data;
      });
  });

});