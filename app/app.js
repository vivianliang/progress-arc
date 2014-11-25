'use strict';

var progressIndicatorApp = angular.module('progressIndicatorApp',[]);

progressIndicatorApp.controller('IndicatorCtrl', function($scope){
	$scope.expected = 0;
	$scope.actual = 0;
});

progressIndicatorApp.directive('ngArc', function(){
	return {
		restrict: 'E',
		scope: {
			actual: '=',
			expected: '='
		},
		link: function (scope, element, attrs){

			if (!attrs.expected || isNaN(attrs.expected) || attrs.expected < 0){
				attrs.expected = 0;
			} else if (attrs.expected > 1){
				attrs.expected = 1;
			}
			if (!attrs.actual || isNaN(attrs.actual) || attrs.actual < 0){
				attrs.actual = 0;
			} else if (attrs.actual > 1){
				attrs.actual = 1;
			}

			var width = 200,
				height = 200,
				tau = 2 * Math.PI;
			var expected_inner_r = width/5,
				expected_outer_r = width/5+5,
				actual_inner_r = width/4-3,
				actual_outer_r = width/4+5;

			var arc_expected = d3.svg.arc()
			    .innerRadius(expected_inner_r)
			    .outerRadius(expected_outer_r)
			    .startAngle(0);

			var arc_actual = d3.svg.arc()
			    .innerRadius(actual_inner_r)
			    .outerRadius(actual_outer_r)
			    .startAngle(0);

			var svg = d3.select(element[0]).append("svg")
			    .attr("width", width)
			    .attr("height", height)
			  .append("g")
			    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

			var cir = svg.append("circle")
				.attr("fill", "#E6E6E6")
				.attr("r", width/6);

			var foreground_expected = svg.append("path")
				.datum({endAngle: 0 * tau})
			    .style("fill", function(d){
					return "#6cbb3c";
			    })
			    .attr("d", arc_expected);

			var foreground_actual = svg.append("path")
			    .datum({endAngle: 0 * tau})
			    .style("fill", function(d){
			    	return get_color();
			    })
			    .attr("d", arc_actual);

			svg.append("text")
				.text(function(d){
					return attrs.actual*100;
				})
				.attr("font-size","20px")
				.attr("font-family", "Open Sans")
				.attr("text-anchor", "middle")
				.attr("x",-3)
				.attr("y",+1)
			svg.append("text").text("\%")
				.attr("font-family", "Open Sans")
				.attr("font-size","12px")
				.attr("x", function(d){
					if (attrs.actual*100 < 10) return "+5";
					else if (attrs.actual*100 > 99) return +"+15";
					else return "+10";
				})
				.attr("y",+1)				
			svg.append("text").text("Progress")
				.attr("font-family", "Open Sans")
				.attr("font-size","10px")
				.attr("text-anchor", "middle")
				.attr("y",+12);				


			foreground_expected.transition().duration(1000).call(arcTween, attrs.expected*tau, arc_expected);
			foreground_actual.transition().duration(1000).call(arcTween, attrs.actual*tau, arc_actual);

			// Expected rounded arc end (start)
		    svg.append("circle") 
		        .attr('id','circle_expected_start')
		        .attr("r", (expected_outer_r-expected_inner_r)/2)
		        .attr('fill',"#6cbb3c")
		        .attr("cx", arc_expected.centroid({startAngle: 0, endAngle: 0})[0])
		        .attr("cy", arc_expected.centroid({startAngle: 0, endAngle: 0})[1]);

/*			// Expected rounded arc end (end)
		    var end_circle = svg.append("circle") 
		        .attr('id','circle_expected_end')
		        .attr("r", ((width/5+5)-(width/5))/2)
		        .attr('fill',"#57893e")
		        .attr("cx",  arc_expected.centroid({startAngle: 0, endAngle: attrs.expected*tau})[0])
		        .attr("cy", arc_expected.centroid({startAngle: 0,endAngle: attrs.expected*tau})[1]);
		    end_circle.append("path").datum({endAngle: 0 * tau}).attr("d", arc_expected);
		    //end_circle.transition().duration(1000).call(arcTween, attrs.expected*tau, arc_expected);
*/
			// Actual rounded arc end (start)
		    svg.append("circle") 
		        .attr('id','circle_actual_start')
		        .attr("r", (actual_outer_r-actual_inner_r)/2)
		        .attr('fill',function(d){
					return get_color();
			    })
		        .attr("cx", arc_actual.centroid({startAngle: 0, endAngle: 0})[0])
		        .attr("cy", arc_actual.centroid({startAngle: 0, endAngle: 0})[1]);

			// The colors of the outer ring should change to orange or red
			// when the actual is more than 25% or 50% behind expected.
			function get_color(){
					if (attrs.actual  < attrs.expected*.75 && attrs.actual >= attrs.expected*.50) return "orange";
			    	else if (attrs.actual < attrs.expected*.50) return "red";
					else return "green";
			};

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
		restrict: 'E',
		scope: {
			actual: '=',
			expected: '='
		},
		link: function (scope, element, attrs){

			if (!attrs.expected || isNaN(attrs.expected) || attrs.expected < 0){
				attrs.expected = 0;
			} else if (attrs.expected > 1){
				attrs.expected = 1;
			}
			if (!attrs.actual || isNaN(attrs.actual) || attrs.actual < 0){
				attrs.actual = 0;
			} else if (attrs.actual > 1){
				attrs.actual = 1;
			}

			var width = 200,
				height = 200,
				tau = 2 * Math.PI;
			var expected_inner_r = width/5,
				expected_outer_r = width/5+5,
				actual_inner_r = width/4-3,
				actual_outer_r = width/4+5;

			var arc_expected = d3.svg.arc()
			    .innerRadius(expected_inner_r)
			    .outerRadius(expected_outer_r)
			    .startAngle(0);

			var arc_actual = d3.svg.arc()
			    .innerRadius(actual_inner_r)
			    .outerRadius(actual_outer_r)
			    .startAngle(0);

			var svg = d3.select(element[0]).append("svg")
			    .attr("width", width)
			    .attr("height", height)
			  .append("g")
			    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

			var cir = svg.append("circle")
				.attr("fill", "#E6E6E6")
				.attr("r", width/6);

			var foreground_expected = svg.append("path")
				.datum({endAngle: 0 * tau})
			    .style("fill", function(d){
					return "#6cbb3c";
			    })
			    .attr("d", arc_expected);

			var foreground_actual = svg.append("path")
			    .datum({endAngle: 0 * tau})
			    .style("fill", function(d){
			    	return get_color();
			    })
			    .attr("d", arc_actual);

			svg.append("text")
				.text(function(d){
					return attrs.actual*100;
				})
				.attr("font-size","20px")
				.attr("font-family", "Open Sans")
				.attr("text-anchor", "middle")
				.attr("x",-3)
				.attr("y",+1)
			svg.append("text").text("\%")
				.attr("font-family", "Open Sans")
				.attr("font-size","12px")
				.attr("x", function(d){
					if (attrs.actual*100 < 10) return "+5";
					else if (attrs.actual*100 > 99) return +"+15";
					else return "+10";
				})
				.attr("y",+1)				
			svg.append("text").text("Progress")
				.attr("font-family", "Open Sans")
				.attr("font-size","10px")
				.attr("text-anchor", "middle")
				.attr("y",+12);				


			foreground_expected.transition().duration(1000).call(arcTween, attrs.expected*tau, arc_expected);
			foreground_actual.transition().duration(1000).call(arcTween, attrs.actual*tau, arc_actual);

			// Expected rounded arc end (start)
		    svg.append("circle") 
		        .attr('id','circle_expected_start')
		        .attr("r", (expected_outer_r-expected_inner_r)/2)
		        .attr('fill',"#6cbb3c")
		        .attr("cx", arc_expected.centroid({startAngle: 0, endAngle: 0})[0])
		        .attr("cy", arc_expected.centroid({startAngle: 0, endAngle: 0})[1]);

/*			// Expected rounded arc end (end)
		    var end_circle = svg.append("circle") 
		        .attr('id','circle_expected_end')
		        .attr("r", ((width/5+5)-(width/5))/2)
		        .attr('fill',"#57893e")
		        .attr("cx",  arc_expected.centroid({startAngle: 0, endAngle: attrs.expected*tau})[0])
		        .attr("cy", arc_expected.centroid({startAngle: 0,endAngle: attrs.expected*tau})[1]);
		    end_circle.append("path").datum({endAngle: 0 * tau}).attr("d", arc_expected);
		    //end_circle.transition().duration(1000).call(arcTween, attrs.expected*tau, arc_expected);
*/
			// Actual rounded arc end (start)
		    svg.append("circle") 
		        .attr('id','circle_actual_start')
		        .attr("r", (actual_outer_r-actual_inner_r)/2)
		        .attr('fill',function(d){
					return get_color();
			    })
		        .attr("cx", arc_actual.centroid({startAngle: 0, endAngle: 0})[0])
		        .attr("cy", arc_actual.centroid({startAngle: 0, endAngle: 0})[1]);

			// The colors of the outer ring should change to orange or red
			// when the actual is more than 25% or 50% behind expected.
			function get_color(){
					if (attrs.actual  < attrs.expected*.75 && attrs.actual >= attrs.expected*.50) return "orange";
			    	else if (attrs.actual < attrs.expected*.50) return "red";
					else return "green";
			};

			function arcTween(transition, newAngle, arc) {
			  transition.attrTween("d", function(d) {
			    var interpolate = d3.interpolate(d.endAngle, newAngle);
			    return function(t) {
			      d.endAngle = interpolate(t);
			      return arc(d);
			    };
			  });
			}

            scope.$watch('actual', function(newValue, oldValue) {
            	
                if (newValue){

                		var foreground_actual = svg.append("path")
			    		.datum({endAngle: oldValue * tau})
			    		.style("fill", function(d){
			    		return get_color();
			    		})
			    		.attr("d", arc_actual);

					foreground_actual.transition().duration(1000).call(arcTween, newValue*tau, arc_actual);
                    console.log("I see a data change! new" +newValue + "old"+ oldValue);
                }
            }, true);

			scope.$watch('expected', function(newValue, oldValue) {

                if (newValue){
                	attrs.expected = newValue;
					var foreground_expected = svg.append("path")
						.datum({endAngle: oldValue * tau})
					    .style("fill", function(d){
							return "#6cbb3c";
					    })
					    .attr("d", arc_expected);

					foreground_actual.transition().duration(1000).call(arcTween, newValue*tau, arc_expected);
                    console.log("I see a data change! new" +newValue + "old"+ oldValue);
                }
            }, true);
			

		}

	}

});