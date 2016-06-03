app.controller('WikipediaController', function($scope, WikipediaFactory) {
  
	$scope.init = function() {
		$scope.articles = {};
		$scope.defaultMessage = "";
  	};
  	$scope.init();

	$scope.$on('$stateChangeSuccess', function() {
		var defaultMessage = 'If you don\'t see any Wikipedia links here, craziness is afoot.';

		WikipediaFactory.getRandomArticles(3)
	  		.then(function(articles) {
				$scope.articles = articles;

				if (!$scope.articles) {
					$scope.defaultMessage = defaultMessage;
				}
	  		})
	  		.catch(function(err) {
				console.error(err);
	  		});
  	});
});