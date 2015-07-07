app.config(function ($stateProvider) {
    $stateProvider.state('modules', {
        url: '/modules',
        templateUrl: '/pre-build/modules/modules.html',
        controller: 'ModulesController'
    });
});