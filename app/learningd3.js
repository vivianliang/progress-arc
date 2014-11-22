'use strict';

var d3App = angular.module('d3App',[]);

d3App.controller('d3Ctrl', function($scope){

});

d3App.directive('learningd3', function(){
	return {
		link: function(scope, element, attrs){
		//var data = [attrs.act, attrs.expect];
		var data = [5, 10, 15, 20, 25];
		d3.select(element[0]).selectAll("p")
			.data(data)
			.enter()
			.append("p")
			.text(function(d){
				return "I can count up to " + d;
			})
			.style("color", function(d){
				if (d > 15) return "red";
				else return "black";
			});
		}
	}
});

d3App.directive('learningd3svg', function(){
	return {
		link: function(scope, element, attrs){
		//var data = [attrs.act, attrs.expect];
		var data = [30, 10, 15, 20, 25];
		d3.select(element[0]).selectAll("p")
			.data(data)
			.enter()
			.append("p")
			.text(function(d){
				return "I can count up to " + d;
			})
			.style("color", function(d){
				if (d > 15) return "red";
				else return "black";
			});
		}
	}
});