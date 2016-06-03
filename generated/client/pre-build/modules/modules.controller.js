app.controller('ModulesController', function($scope, ModulesFactory) {

	$scope.init = function() {
		$scope.nodeModules = [];
		$scope.defaultMessage = "";
  	};
  	$scope.init();

	$scope.$on('$stateChangeSuccess', function () {
		var defaultMessage = 'If you don\'t see a list of links here, you need to seed your database!\nIn your terminal, go to this app\'s directory and run `gulp seedDB`.\nThen try this page again.';

		ModulesFactory.getNodeModules()
	  		.then(function(modules) {
				$scope.nodeModules = modules;
		
				if (!$scope.nodeModules.length) {
		  			$scope.defaultMessage = defaultMessage;
				}
	  		})
	  		.catch(function(err) {
	  			console.error(err);
	  		});
  	});
});