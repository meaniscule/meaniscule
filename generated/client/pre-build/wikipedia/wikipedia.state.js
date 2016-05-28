app.config(function ($stateProvider) {
    $stateProvider.state('wikipedia', {
        url: '/wikipedia',
        templateUrl: '/pre-build/wikipedia/wikipedia.html',
        controller: 'WikipediaController'
    });
});