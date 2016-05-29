app.factory('WikipediaFactory', function($http) {
  	return {
	    getRandomArticles: _getRandomArticles    
    }

  	function _getRandomArticles(num) {
	  	return $http.get('/api/wikipedia/random?num=' + num)
	        .then(function(res) {
	          	return res.data;
	        })
	        .catch(function(err) {
	        	console.error(err);
	        });  
  	}
});