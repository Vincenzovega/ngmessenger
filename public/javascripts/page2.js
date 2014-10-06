/**
 * Created by vincentleyne on 03/10/2014.
 */
angular.module('myNgSite.page2', ['ngRoute'])

    .controller('page2Ctrl', ['$scope', function ($scope) {
        console.log('PAge2Ctrl opened');
        $scope.item = {};
        $scope.items = [
            {target: "item1", label: "item1"},
            {target: "item1", label: "item2"},
            {target: "item1", label: "item3"},
            {target: "item1", label: "item4"},
            {target: "item1", label: "item5"}
        ];

        $scope.add_item = function (item) {
            $scope.items.push(item);
            $scope.item = {};

        }
        ;


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