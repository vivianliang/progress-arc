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
				.attr('id','foreground_expected')			
				.datum({endAngle: 0 * tau})
			    .style("fill", function(d){
					return "#6cbb3c";
			    })
			    .attr("stroke-linejoin", "round")
			    .attr("d", arc_expected);

			var foreground_actual = svg.append("path")
				.attr('id','foreground_actual')
			    .datum({endAngle: 0 * tau})
			    .style("fill", function(d){
			    	return get_color();
			    })
			    .attr("d", arc_actual);

			var text = svg.append("text")
				.text(function(d){
					return 0;
				})
				.attr("font-size","20px")
				.attr("font-family", "Open Sans")
				.attr("text-anchor", "middle")
				.attr("x",-3)
				.attr("y",+1)
			var percent = svg.append("text").text("\%")
				.attr("font-family", "Open Sans")
				.attr("font-size","12px")
				.attr("x", function(d){
					if (attrs.actual*100 < 10) return "+5";
					else if (attrs.actual*100 > 99) return "+15";
					else return "+10";
				})
				.attr("y",+1)				
			svg.append("text").text("Progress")
				.attr("font-family", "Open Sans")
				.attr("font-size","10px")
				.attr("text-anchor", "middle")
				.attr("y",+12);				

			// Expected rounded arc end (start)
		    var expected_start_cir = svg.append("circle") 
		        .attr('id','circle_expected_start')
		        .attr("r", (expected_outer_r-expected_inner_r)/2)
		        .attr('fill',"#6cbb3c")
		        .attr("cx", arc_expected.centroid({startAngle: 0, endAngle: 0})[0])
		        .attr("cy", arc_expected.centroid({startAngle: 0, endAngle: 0})[1]);

			// Actual rounded arc end (start)
		    var actual_start_cir = svg.append("circle") 
		        .attr('id','circle_actual_start')
		        .attr("r", (actual_outer_r-actual_inner_r)/2)
		        .attr('fill',function(d){
					return get_color();
			    })
		        .attr("cx", arc_actual.centroid({startAngle: 0, endAngle: 0})[0])
		        .attr("cy", arc_actual.centroid({startAngle: 0, endAngle: 0})[1]);

			// The colors of the outer ring should change to orange or red
			// when the actual is more than 25% or 50% behind expected.
			var local_actual = attrs.actual;
			var local_expected = attrs.expected;

			function get_color(){
					if (local_actual  < local_expected*.75 && local_actual >= local_expected*.50) return "orange";
			    	else if (local_actual < local_expected*.50) return "red";
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

			function setAngle(mySvg, value){
				mySvg.datum({endAngle: value * tau});
			}
			function setStyleColor(mySvg, color_func){
				mySvg.style("fill", color_func());
			}
			function setAttrColor(mySvg, color_func){
				mySvg.attr("fill", color_func());
			}
			function doTransition(mySvg, value, arc){
				mySvg.transition().duration(1000).call(arcTween, value*tau, arc);
			}
			function setPercentage(textSvg, percentSvg, decimal){
				textSvg.text(function(d){
						return decimal*100;
					});
				percentSvg.attr("x", function(d){
						if (decimal*100 < 10) return "+5";
						else if (decimal*100 > 99) return "+15";
						else return "+10";
					});

			}

            scope.$watch('actual', function(newValue, oldValue) {
				if (isNaN(newValue)){
					alert("Decimals must have leading 0.");
				} else if (newValue){

					// The only time oldValue will be out of bounds is if
					// that's the original value, so we can set newValue and oldValue
					// at the same time and avoid extra if statements.
					if (oldValue < 0 || newValue < 0){
						newValue = 0;
						oldValue = 0;
					}
					if (oldValue > 1 || newValue > 1){
						newValue = 1;
						oldValue = 1;
					}

					local_actual = newValue;
                
                	// Forces transition on load for static attributes.
                	if (newValue === oldValue) oldValue = 0;

					setAngle(foreground_actual, oldValue);
					setStyleColor(foreground_actual, get_color);
					setAttrColor(actual_start_cir, get_color);
					setPercentage(text, percent, newValue);

					doTransition(foreground_actual, newValue, arc_actual);
                }
            });

			scope.$watch('expected', function(newValue, oldValue) {
				if (isNaN(newValue)){
					alert("Decimals must have leading 0.");
				} else if (newValue){

					if (oldValue < 0 || newValue < 0){
						newValue = 0;
						oldValue = 0;
					}
					if (oldValue > 1 || newValue > 1){
						newValue = 1;
						oldValue = 1;
					}

                	local_expected = newValue;

					if (newValue === oldValue) oldValue = 0;

					setAngle(foreground_expected, oldValue);

					// Update actual arc's color in relation to new expected value
					setStyleColor(foreground_actual, get_color);
					setAttrColor(actual_start_cir, get_color);

					doTransition(foreground_expected, newValue, arc_expected);
                }
            });
			

		}

	}

});