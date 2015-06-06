app.config(function ($stateProvider) {
    $stateProvider.state('modules', {
        url: '/modules',
        templateUrl: '/app/modules/modules.html',
        controller: 'ModulesController'
    });
});