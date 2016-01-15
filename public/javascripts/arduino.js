/**
 * Created by vincentleyne on 18/11/2015.
 */
/**
 * Created by vincentleyne on 03/10/2014.
 */

"use strict";

angular.module('myNgSite.arduino', ['ngRoute', 'myNgSite'])
    .controller('arduinoCtrl', ['$scope', 'authenticationSvc', '$location', function ($scope, authenticationSvc, $location) {

        var socket = io();

        socket.on('arduino', function (data) {

        });
    }])
    .directive("neoRing", function () {
        return {
            restrict: "AE",
            scope: {
                sel: "&"
            },
            link: function (scope, element, attrs) {

                var h_in = function () {
                    this.attr({
                        "stroke": "#AAA"
                    });
                };
                var h_out = function () {
                    this.attr({
                        "stroke": "#000"
                    });
                };

                var h_select = function () {
                    this.selected = !this.selected;
                    this.attr({
                        "stroke-width": (this.selected) ? 4 : 1
                    });

                };
                var paper = Raphael(element[0], 200, 200);
                var pixel = [];
                for (var i = 0; i < 16; i++) {
                    pixel[i] = paper.rect(90, 90, 20, 20)
                        .attr({
                            transform: Raphael.format("R{0}t80,0", i * 360 / 16)
                        })
                        .attr({
                            fill: "white"
                        })
                        .hover(h_in, h_out)
                        .click(h_select)
                        .data("id", i);

                }
            }
        };
    })
    .directive("slider", function () {
        return {
            restrict: "AE",
            scope: {},
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {

                function down() {
                    this.ox = ngModel.$viewValue;
                }

                function mov(dx) {
                    var newVal = this.ox + dx;
                    if (newVal < 0) {
                        newVal = 0;
                    }
                    if (newVal > 99) {
                        newVal = 99;
                    }
                    ngModel.$setViewValue(newVal);
                    ngModel.$render();
                }

                var paper = Raphael(element[0], 120, 20);
                paper.rect(0, 0, 120, 20);
                paper.path("M10,10l100,0").attr({
                    "stroke-width": 5
                });
                var cursor = paper.circle(60, 10, 5).attr({
                    fill: attrs.cursorColor
                }).drag(mov, down);


                ngModel.$formatters.push(function (value) {
                    return parseInt(value);
                });

                ngModel.$render = function () {
                    cursor.attr({
                        cx: ngModel.$viewValue + 10
                    });
                };

            }
        };
    })
    .config(['$routeProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/arduino', {
            templateUrl: '/partials/arduino.html',
            controller: 'arduinoCtrl'
        });
    }]);
