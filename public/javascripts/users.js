/**
 * Created by vincentleyne on 06/10/2014.
 */
/**
 * Created by vincentleyne on 03/10/2014.
 */
angular.module('myNgSite.users', ['ngRoute', 'myNgSite'])
    .controller('usersCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.users = {};
        console.log('usersCtrl opened');
        $http({method: "GET", url: '/api/userlist'}).success(function (data, status, headers, config) {
            $scope.users = data;

        }).error(function (data, status, headers, config) {
            console.log('error', data);

        })


    }]).config(['$routeProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/users', {
                templateUrl: '/partials/users.html',
                controller: 'usersCtrl',

            });
    }]);