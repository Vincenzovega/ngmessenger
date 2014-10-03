/**
 * Created by vincentleyne on 03/10/2014.
 */
angular.module('myNgSite.main', ['ngRoute'])
    .controller('mainCtrl', ['$scope', function ($scope) {
        console.log('mainCtrl opened');

    }]).config(['$routeProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: '/partials/main.html',
                controller: 'mainCtrl'

            });
    }]);