app.factory('ModulesFactory', function($http) {
	return {
		getNodeModules: _getNodeModules
	}

    function _getNodeModules() {
  		return $http.get('/api/modules/')
    		.then(function(res) {
      			return res.data;
    		});    
  	}
});