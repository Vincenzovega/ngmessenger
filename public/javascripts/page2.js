/**
 * Created by vincentleyne on 03/10/2014.
 */
angular.module('myNgSite.page2', ['ngRoute'])
    .controller('page2Ctrl', ['$scope', function ($scope) {
        console.log('PAge2Ctrl opened');

    }]).config(['$routeProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/page2', {
                templateUrl: '/partials/page2.html',
                controller: 'page2Ctrl'

            });
    }]);