app.factory('WikipediaFactory', function($http) {
  	return {
	    getRandomArticles: _getRandomArticles    
    }

  	function _getRandomArticles() {
	  	return $http.get('/api/wikipedia/random')
	        .then(function(res) {
	          	return res.data;
	        })
	        .catch(function(err) {
	        	console.error(err);
	        });  
  	}
});