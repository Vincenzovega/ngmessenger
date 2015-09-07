/**
 * Created by vincentleyne on 03/10/2014.
 */
angular.module('myNgSite.page2', ['ngRoute'])

    .controller('page2Ctrl', ['$scope', '$http', function ($scope, $http) {
        console.log('PAge2Ctrl opened');
        $scope.item = {};


        $scope.today = function () {
            $scope.item.date = new Date();
        };

        $scope.today();

        $scope.clear = function () {
            $scope.newRecord = {};
            $scope.newRecord.date = new Date();

            var d = $scope.newRecord.date;
            d.setHours(14);
            d.setMinutes(0);
            $scope.newRecord.time = d;

            console.dir($scope.newRecord);

        };

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };


        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.update = function () {

        };

        $scope.changed = function () {
            console.log('Time changed to: ' + $scope.item.time);
        };

        $scope.clear = function () {
            $scope.item.time = null;
        };


        $scope.updateList = function () {
            $http({method: "GET", url: '/api/callList'}).success(function (data, status, headers, config) {
                $scope.items = data;

            }).error(function (data, status, headers, config) {
                console.log('error', data);
                $scope.items = [];

            });
        };


        $scope.add_item = function (newRecord) {

            $http.post('/api/addItem', newRecord).success(function (data, status, headers, config) {
                $scope.items.push(data);
                $scope.clear();


            }).error(function (data, status, headers, config) {
                console.log('error', data);

            })
        };

        $scope.delete_item = function (item) {

            $http.post('/api/delItem', item).success(function (data, status, header, config) {
                $scope.items.splice($scope.items.indexOf(item), 1);

            })
        };


        $scope.updateList();

    }])

    .config(['$routeProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/page2', {
                templateUrl: '/partials/page2.html',
                controller: 'page2Ctrl',
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