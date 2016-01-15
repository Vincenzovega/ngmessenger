angular.module('myNgSite', ['ngRoute',
    'ui.bootstrap',
    'ngAnimate',
    'myNgSite.page2',
    'myNgSite.main',
    'myNgSite.login',
    'myNgSite.arduino',
    'myNgSite.users'])

    .config(['$routeProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/main'
            });
    }])

    .factory("authenticationSvc", function ($http, $q, $window) {
        var userInfo = null;


        function getUserInfo() {
            return userInfo;
        }

        function login(userName, password) {
            var deferred = $q.defer();

            $http.post("/api/login", {
                userName: userName,
                password: password
            }).then(function (result) {
                accessToken = result.data.token;
                userInfo = {
                    user: result.data.user,
                    role: result.data.role
                };
                $window.sessionStorage["accessToken"] = accessToken;
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                deferred.resolve(userInfo);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function logout() {
            userInfo = null;
            $window.sessionStorage["userInfo"] = null;
            $window.sessionStorage["accessToken"] = null;

        }

        function init() {
            if ($window.sessionStorage["userInfo"]) {
                userInfo = JSON.parse($window.sessionStorage["userInfo"]);

            }
        }

        init();

        return {
            login: login,
            logout: logout,
            getUserInfo: getUserInfo
        }
    })


    .factory('AuthInterceptor', function ($window, $q) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.getItem('accessToken')) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.getItem('accessToken');

                }
                return config || $q.when(config);
            },
            response: function (response) {
                if (response.status === 401) {
                    // TODO: Redirect user to login page.
                }
                return response || $q.when(response);
            }
        };
    })

    .config(function ($httpProvider) {

        $httpProvider.interceptors.push('AuthInterceptor');
    })


    .controller('navCtrl', ['$scope', '$location', 'authenticationSvc', function ($scope, $location, authenticationSvc) {

        $scope.user = {};
        $scope.logged = false;

        $scope.$watch(authenticationSvc.getUserInfo, function (newUser) {
            if (newUser !== null) {
                console.log('new user is:' + newUser);
                $scope.user = newUser.user;
                $scope.logged = true;
            } else {
                $scope.logged = false;
            }

        });

        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) || 'view1';
            return page === currentRoute ? 'active' : '';
        };

        $scope.logout = function () {
            authenticationSvc.logout();
        }



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



