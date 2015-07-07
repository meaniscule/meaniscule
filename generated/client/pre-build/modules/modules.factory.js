app.factory('ModulesFactory', function($http) {
  return {
    getNodeModules: function() {
      return $http.get('/api/modules/')
        .then(function(res) {
          return res.data;
        });    
    }
  };
});