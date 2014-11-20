'use strict';

var progressIndicatorApp = angular.module('progressIndicatorApp',[]);

progressIndicatorApp.controller('IndicatorCtrl', function($scope){
	$scope.expected = 0.6;
	$scope.actual = 0.8;
});


progressIndicatorApp.directive('circularDirective', function () {
    return {
        link: function ($scope, element, attrs) {


        }
    };
});