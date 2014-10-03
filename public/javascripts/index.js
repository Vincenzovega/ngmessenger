angular.module('myNgSite', ['ngRoute',
    'myNgSite.page2',
    'myNgSite.main'])

    .config(['$routeProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {

            })
            .otherwise({
                redirectTo: '/main'
            });
    }])

    .controller('navCtrl', ['$scope', '$location', function ($scope, $location) {
        console.dir($location);
        //$scope.$route = $route;
        //$scope.$location = $location;
        //$scope.$routeParams = $routeParams;

        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) || 'view1';
            return page === currentRoute ? 'active' : '';
        };
        $scope.load = function (destination) {
            $location.url('/' + destination);
        };
    }]);


