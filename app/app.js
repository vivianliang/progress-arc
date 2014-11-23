'use strict';

var progressIndicatorApp = angular.module('progressIndicatorApp',[]);

progressIndicatorApp.controller('IndicatorCtrl', function($scope){
	$scope.expected_val = 1;
	$scope.actual_val = .72;
});

progressIndicatorApp.directive('ngArc', function(){
	return {
		link: function (scope, element, attrs){

			var width = 200,
				height = 200,
				tau = 2 * Math.PI;				

			var arc_expected = d3.svg.arc()
			    .innerRadius(width/5)
			    .outerRadius(width/5+5)
			    .startAngle(0);

			var arc_actual = d3.svg.arc()
			    .innerRadius(width/4-3)
			    .outerRadius(width/4+5)
			    .startAngle(0);

			var svg_actual = d3.select(element[0]).append("svg")
			    .attr("width", width)
			    .attr("height", height)
			  .append("g")
			    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

			var cir = svg_actual.append("circle")
				.attr("fill", "#E6E6E6")
				.attr("r", width/6);

			var foreground_expected = svg_actual.append("path")
				.datum({endAngle: 0 * tau})
			    .style("fill", function(d){
					return "#6cbb3c";
			    })
			    .attr("d", arc_expected);

			/*
			 * The colors of the outer ring should change to orange or red
			 * when the actual is more than 25% or 50% behind expected.
			*/
			var foreground_actual = svg_actual.append("path")
			    .datum({endAngle: 0 * tau})
			    .style("fill", function(d){
			    	if (attrs.actual  < attrs.expected*.75 && attrs.actual >= attrs.expected*.50){
			    		return "orange";
			    	} else if (attrs.actual < attrs.expected*.50){
			    		return "red";
			    	} else{
			    		return "green";
			    	}
			    })
			    .attr("d", arc_actual);

			svg_actual.append("text")
				.text(function(d){
					return attrs.actual*100 + "\%";
				})
				.attr("font-size","20px")
				.attr("text-anchor", "middle")
				.attr("y",0)
			svg_actual.append("text").text("progress")
				.attr("font-size","15px")
				.attr("text-anchor", "middle")
				.attr("y",+10);				


			foreground_expected.transition().duration(1000).call(arcTween, attrs.expected*tau, arc_expected);
			foreground_actual.transition().duration(1000).call(arcTween, attrs.actual*tau, arc_actual);

			function arcTween(transition, newAngle, arc) {
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



progressIndicatorApp.directive('ngArcDynamic', function(){
	return {
		link: function (scope, element, attrs){

			attrs.$observe('expected_val', action);
			//attrs.$observe('actual_val', action);


			var width = 200,
				height = 200,
				tau = 2 * Math.PI;				

			var arc_expected = d3.svg.arc()
			    .innerRadius(40)
			    .outerRadius(45)
			    .startAngle(0);

			var arc_actual = d3.svg.arc()
			    .innerRadius(47)
			    .outerRadius(55)
			    .startAngle(0);

			var svg_actual = d3.select(element[0]).append("svg")
			    .attr("width", width)
			    .attr("height", height)
			  .append("g")
			    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

			var cir = svg_actual.append("circle")
				.attr("fill", "#E6E6E6")
				.attr("r", width/6);


			/*
			 * The colors of the outer ring should change to orange or red
			 * when the actual is more than 25% or 50% behind expected.
			*/

			var foreground_expected = svg_actual.append("path")
				.datum({endAngle: .9 * tau})
			    .style("fill", function(d){
					return "#6cbb3c";
			    })
			    .attr("d", arc_expected);

			var foreground_actual = svg_actual.append("path")
			    .datum({endAngle: 0 * tau})
			    .style("fill", function(d){
			    	if (attrs.actual  < attrs.expected*.75 && attrs.actual >= attrs.expected*.50){
			    		return "orange";
			    	} else if (attrs.actual < attrs.expected*.50){
			    		return "red";
			    	} else{
			    		return "green";
			    	}
			    })
			    .attr("d", arc_actual);

			svg_actual.append("text")
				.text(function(d){
					return attrs.actual*100 + "\%";
				})
				.attr("font-size","20px")
				.attr("text-anchor", "middle")
				.attr("y",0)
			svg_actual.append("text").text("progress")
				.attr("font-size","15px")
				.attr("text-anchor", "middle")
				.attr("y",+10);

			var action = function (){

				foreground_expected.transition().duration(1000).call(arcTween, attrs.expected*tau, arc_expected);
				foreground_actual.transition().duration(1000).call(arcTween, attrs.actual*tau, arc_actual);

				function arcTween(transition, newAngle, arc) {
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

	}

});