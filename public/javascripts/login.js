/**
 * Created by vincentleyne on 03/10/2014.
 */
angular.module('myNgSite.login', ['ngRoute', 'myNgSite'])
    .controller('loginCtrl', ['$scope', 'authenticationSvc', '$location', function ($scope, authenticationSvc, $location) {
        console.log('loginCtrl opened');
        $scope.creds = {};
        $scope.login = function (creds) {

            console.log('login');
            authenticationSvc.login(creds.userName, creds.password)
                .then(function (th) {
                    $location.path("main");
                }, function (error) {
                    console.log('error:' + error);
                }, function () {
                    console.log('progress');
                });


        }

    }])

    .config(['$routeProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/partials/login.html',
                controller: 'loginCtrl'

            });
    }]);
