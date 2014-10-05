/**
 * Created by vincentleyne on 03/10/2014.
 */
angular.module('myNgSite.main', ['ngRoute', 'myNgSite'])
    .controller('mainCtrl', ['$scope', function ($scope) {
        console.log('mainCtrl opened');

    }]).config(['$routeProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: '/partials/main.html',
                controller: 'mainCtrl',
                resolve: {
                    auth: ["$q", "authenticationSvc", function ($q, authenticationSvc) {
                        var userInfo = authenticationSvc.getUserInfo();

                        if (userInfo) {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({ authenticated: false });
                        }
                    }]
                }

            });
    }]);