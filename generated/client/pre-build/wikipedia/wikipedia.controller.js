app.controller('WikipediaController', function($scope, WikipediaFactory) {
  
  $scope.init = function() {
    $scope.articles = {};
  };
  $scope.init();

  $scope.$on('$stateChangeSuccess', function() {
    var defaultMessage = 'If you don\'t see any Wikipedia links here, craziness is afoot.';

    WikipediaFactory.getRandomArticles()
      .then(function(articles) {
        $scope.articles = articles;

        console.log(articles);
        
        if (!$scope.articles.length) {
          $scope.defaultMessage = defaultMessage;
        }
      })
      .catch(function(err) {
        console.err(err);
      });
  });

});