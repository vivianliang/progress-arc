'use strict';

var progressIndicatorApp = angular.module('progressIndicatorApp',[]);

progressIndicatorApp.controller('IndicatorCtrl', function($scope){

});

progressIndicatorApp.directive('ngArc', function(){
	return {
		link: function (scope, element,attrs){

			var width= 105,
				height=105,
				τ = 2 * Math.PI;

			// Expected
			var arc = d3.svg.arc()
				.innerRadius(35)
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
			    .style("fill", "#6CBB3C")
			    .attr("d", arc);

			svg.append("text")
				.text(function(d){
					return attrs.expected*100 + "\%";
				})
				.attr("font-size","30px")
				.attr("y",+20)
				.attr("x", -30);
			svg.append("text").text("expected")
				.attr("y",-10)
				.attr("x",-30);


			foreground.transition().duration(1000).call(arcTween, attrs.expected*τ);


			// Actual
			var arc_actual = d3.svg.arc()
			    .innerRadius(35)
			    .outerRadius(50)
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

			/*
			 * The colors of the outer ring should change to orange or red
			 * when the actual is more than 25% or 50% behind expected.
			*/

			var foreground_actual = svg_actual.append("path")
			    .datum({endAngle: 0 * τ})
			    .style("fill", function(d){
			    	if (attrs.actual  < attrs.expected*.75 && attrs.actual >= attrs.expected*.50){
			    		return "orange";
			    	} else if (attrs.actual/attrs.expected < .50){
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
				.attr("font-size","30px")
				.attr("y",+20)
				.attr("x", -20);
			svg_actual.append("text").text("actual")
				.attr("y",-10)
				.attr("x",-20);

			foreground_actual.transition().duration(1000).call(arcTween, attrs.actual*τ);

			// arctween: http://bl.ocks.org/mbostock/5100636
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