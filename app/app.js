'use strict';

var progressIndicatorApp = angular.module('progressIndicatorApp',[]);

progressIndicatorApp.controller('IndicatorCtrl', function($scope){
	$scope.expected = 0.8;
	$scope.actual = 0.8;
	$scope.myData = [10,20,30,40,60, 80, 20, 50];
});


progressIndicatorApp.directive('ngArc', function(){
	return {
		restrict: 'EA',
		require: '^ngModel',
		scope: {
			ngModel: '='
		},
		template: '<div><h4>Number for {{ngModel}}</h4></div>',

		link: function (scope, element,attrs){

			var width= 200,height=200,τ = 2 * Math.PI;

			var arc = d3.svg.arc()
				.innerRadius(30)
				.outerRadius(50)
				.startAngle(0);
			var svg = d3.select(element[0]).append("svg")
			    .attr("width", width)
			    .attr("height", height)
			  .append("g")
			    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
			var background = svg.append("path")
			    .datum({endAngle: τ})
			    .style("fill", "#ddd")
			    .attr("d", arc);
			var foreground = svg.append("path")
			    .datum({endAngle: 0 * τ})
			    .style("fill", "orange")
			    .attr("d", arc);
			
			foreground.transition().duration(1000).call(arcTween, attrs.expect*τ);


			var arc_actual = d3.svg.arc()
			    .innerRadius(60)
			    .outerRadius(80)
			    .startAngle(0);
			var svg_actual = d3.select(element[0]).append("svg")
			    .attr("width", width)
			    .attr("height", width)
			  .append("g")
			    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
			var background_actual = svg_actual.append("path")
			    .datum({endAngle: τ})
			    .style("fill", "#ddd")
			    .attr("d", arc_actual);
			var foreground_actual = svg_actual.append("path")
			    .datum({endAngle: 0 * τ})
			    .style("fill", "green")
			    .attr("d", arc_actual);

			foreground_actual.transition().duration(1000).call(arcTween, attrs.act*τ);


			function arcTween(transition, newAngle) {
			  transition.attrTween("d", function(d) {
			    var interpolate = d3.interpolate(d.endAngle, newAngle);
			    return function(t) {
			      d.endAngle = interpolate(t);
			      return arc(d);
			    };
			  });
			}

		}

	}

});