angular.module('myNgSite', ['ngRoute',
    'myNgSite.page2',
    'myNgSite.main',
    'myNgSite.login'])

    .config(['$routeProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/main'
            });
    }])
    .factory("authenticationSvc", function ($http, $q, $window) {
        var userInfo;


        function getUserInfo() {
            return userInfo;
        }

        function login(userName, password) {
            var deferred = $q.defer();

            $http.post("/api/login", {
                userName: userName,
                password: password
            }).then(function (result) {
                userInfo = {
                    accessToken: result.data.access_token,
                    userName: result.data.userName
                };
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                deferred.resolve(userInfo);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function init() {
            if ($window.sessionStorage["userInfo"]) {
                userInfo = JSON.parse($window.sessionStorage["userInfo"]);
            }
        }

        init();

        return {
            login: login,
            getUserInfo: getUserInfo
        }
    })

    .controller('navCtrl', ['$scope', '$location', function ($scope, $location) {

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
    }])
    .run(["$rootScope", "$location", function ($rootScope, $location) {
        $rootScope.$on("$routeChangeSuccess", function (userInfo) {
            console.log(userInfo);
        });

        $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
            if (eventObj.authenticated === false) {
                $location.path("/login");
            }
        });
    }]);


