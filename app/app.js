'use strict';

var progressIndicatorApp = angular.module('progressIndicatorApp',[]);

progressIndicatorApp.controller('IndicatorCtrl', function($scope){
	$scope.expected = 0.8;
	$scope.actual = 0.8;
	$scope.myData = [10,20,30,40,60, 80, 20, 50];
});



progressIndicatorApp.directive('ngSparkline', function(){
	return {
		restrict: 'EA',
		require: '^ngModel',
		scope: {
			ngModel: '='
		},
		template: '<div class="sparkline"><h4>Weather for {{ngModel}}</h4></div>'
	}

});


progressIndicatorApp.directive('ngArc', function(){
	return {
		restrict: 'EA',
		require: '^ngModel',
		scope: {
			ngModel: '='
		},
		template: '<div class="sparkline"><h4>Number for {{ngModel}}</h4></div>',

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

			// Add the background arc, from 0 to 100% (τ).
			var background = svg1.append("path")
			    .datum({endAngle: τ})
			    .style("fill", "#ddd")
			    .attr("d", arc1);

			// Add the foreground arc in orange, currently showing 12.7%.
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

			// Add the background arc, from 0 to 100% (τ).
			var background_actual = svg_actual.append("path")
			    .datum({endAngle: τ})
			    .style("fill", "#ddd")
			    .attr("d", arc_actual);

			// Add the foreground arc in orange, currently showing 12.7%.
			var foreground_actual = svg_actual.append("path")
			    .datum({endAngle: 0 * τ})
			    .style("fill", "green")
			    .attr("d", arc_actual);

			foreground_actual.transition().duration(1000).call(arcTween, attrs.act*τ);

			    /*
			setInterval(function() {
			  foreground.transition()
			      .duration(750)
			      .call(arcTween, Math.random() * τ);
			}, 1500);*/

			// Creates a tween on the specified transition's "d" attribute, transitioning
			// any selected arcs from their current angle to the specified new angle.
			function arcTween(transition, newAngle) {

			  // The function passed to attrTween is invoked for each selected element when
			  // the transition starts, and for each element returns the interpolator to use
			  // over the course of transition. This function is thus responsible for
			  // determining the starting angle of the transition (which is pulled from the
			  // element's bound datum, d.endAngle), and the ending angle (simply the
			  // newAngle argument to the enclosing function).
			  transition.attrTween("d", function(d) {

			    // To interpolate between the two angles, we use the default d3.interpolate.
			    // (Internally, this maps to d3.interpolateNumber, since both of the
			    // arguments to d3.interpolate are numbers.) The returned function takes a
			    // single argument t and returns a number between the starting angle and the
			    // ending angle. When t = 0, it returns d.endAngle; when t = 1, it returns
			    // newAngle; and for 0 < t < 1 it returns an angle in-between.
			    var interpolate = d3.interpolate(d.endAngle, newAngle);

			    // The return value of the attrTween is also a function: the function that
			    // we want to run for each tick of the transition. Because we used
			    // attrTween("d"), the return value of this last function will be set to the
			    // "d" attribute at every tick. (It's also possible to use transition.tween
			    // to run arbitrary code for every tick, say if you want to set multiple
			    // attributes from a single function.) The argument t ranges from 0, at the
			    // start of the transition, to 1, at the end.
			    return function(t) {

			      // Calculate the current arc angle based on the transition time, t. Since
			      // the t for the transition and the t for the interpolate both range from
			      // 0 to 1, we can pass t directly to the interpolator.
			      //
			      // Note that the interpolated angle is written into the element's bound
			      // data object! This is important: it means that if the transition were
			      // interrupted, the data bound to the element would still be consistent
			      // with its appearance. Whenever we start a new arc transition, the
			      // correct starting angle can be inferred from the data.
			      d.endAngle = interpolate(t);

			      // Lastly, compute the arc path given the updated data! In effect, this
			      // transition uses data-space interpolation: the data is interpolated
			      // (that is, the end angle) rather than the path string itself.
			      // Interpolating the angles in polar coordinates, rather than the raw path
			      // string, produces valid intermediate arcs during the transition.
			      return arc(d);
			    };
			  });
			}

		}

	}

});


progressIndicatorApp.directive('circularProgress', function(){
	return {
		restrict: 'EA',
		scope: {expected : '=',
    		actual : '='},
		link: function (scope, element){


			var width = 200,
			    height = 200,
				τ = 2 * Math.PI; // http://tauday.com/tau-manifesto

			// An arc function with all values bound except the endAngle. So, to compute an
			// SVG path string for a given angle, we pass an object with an endAngle
			// property to the `arc` function, and it will return the corresponding string.
			var arc = d3.svg.arc()
			    .innerRadius(30)
			    .outerRadius(50)
			    .startAngle(0);

			// Create the SVG container, and apply a transform such that the origin is the
			// center of the canvas. This way, we don't need to position arcs individually.
			var svg = d3.select(element[0]).append("svg")
			    .attr("width", width)
			    .attr("height", height)
			  .append("g")
			    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

			// Add the background arc, from 0 to 100% (τ).
			var background = svg.append("path")
			    .datum({endAngle: τ})
			    .style("fill", "#ddd")
			    .attr("d", arc);

			// Add the foreground arc in orange, currently showing 12.7%.
			var foreground = svg.append("path")
			    .datum({endAngle: .127 * τ})
			    .style("fill", "orange")
			    .attr("d", arc);


			var arc_actual = d3.svg.arc()
			    .innerRadius(60)
			    .outerRadius(80)
			    .startAngle(0);

			var svg_actual = d3.select(element[0]).append("svg")
			    .attr("width", width)
			    .attr("height", height)
			  .append("g")
			    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

			// Add the background arc, from 0 to 100% (τ).
			var background_actual = svg_actual.append("path")
			    .datum({endAngle: τ})
			    .style("fill", "#ddd")
			    .attr("d", arc_actual);

			// Add the foreground arc in orange, currently showing 12.7%.
			var foreground_actual = svg_actual.append("path")
			    .datum({endAngle: .8 * τ})
			    .style("fill", "green")
			    .attr("d", arc_actual);



			// Every so often, start a transition to a new random angle. Use transition.call
			// (identical to selection.call) so that we can encapsulate the logic for
			// tweening the arc in a separate function below.
			/*
			setInterval(function() {
			  foreground.transition()
			      .duration(750)
			      .call(arcTween, Math.random() * τ);
			}, 1500);*/

			// Creates a tween on the specified transition's "d" attribute, transitioning
			// any selected arcs from their current angle to the specified new angle.
			function arcTween(transition, newAngle) {

			  // The function passed to attrTween is invoked for each selected element when
			  // the transition starts, and for each element returns the interpolator to use
			  // over the course of transition. This function is thus responsible for
			  // determining the starting angle of the transition (which is pulled from the
			  // element's bound datum, d.endAngle), and the ending angle (simply the
			  // newAngle argument to the enclosing function).
			  transition.attrTween("d", function(d) {

			    // To interpolate between the two angles, we use the default d3.interpolate.
			    // (Internally, this maps to d3.interpolateNumber, since both of the
			    // arguments to d3.interpolate are numbers.) The returned function takes a
			    // single argument t and returns a number between the starting angle and the
			    // ending angle. When t = 0, it returns d.endAngle; when t = 1, it returns
			    // newAngle; and for 0 < t < 1 it returns an angle in-between.
			    var interpolate = d3.interpolate(d.endAngle, newAngle);

			    // The return value of the attrTween is also a function: the function that
			    // we want to run for each tick of the transition. Because we used
			    // attrTween("d"), the return value of this last function will be set to the
			    // "d" attribute at every tick. (It's also possible to use transition.tween
			    // to run arbitrary code for every tick, say if you want to set multiple
			    // attributes from a single function.) The argument t ranges from 0, at the
			    // start of the transition, to 1, at the end.
			    return function(t) {

			      // Calculate the current arc angle based on the transition time, t. Since
			      // the t for the transition and the t for the interpolate both range from
			      // 0 to 1, we can pass t directly to the interpolator.
			      //
			      // Note that the interpolated angle is written into the element's bound
			      // data object! This is important: it means that if the transition were
			      // interrupted, the data bound to the element would still be consistent
			      // with its appearance. Whenever we start a new arc transition, the
			      // correct starting angle can be inferred from the data.
			      d.endAngle = interpolate(t);

			      // Lastly, compute the arc path given the updated data! In effect, this
			      // transition uses data-space interpolation: the data is interpolated
			      // (that is, the end angle) rather than the path string itself.
			      // Interpolating the angles in polar coordinates, rather than the raw path
			      // string, produces valid intermediate arcs during the transition.
			      return arc(d);
			    };
			  });
			}

		}
	}

});

progressIndicatorApp.directive('arcBar', function(){
	return {
		restrict: 'E',
		scope: {expected : '=',
    			actual : '='},
		link: function (scope, element){
			var expected = scope.expected;
			var actual = scope.actual;


			var width = 200, height = 200;
			var color = d3.scale.category10();
			var pie = d3.layout.pie().sort(null);
			var arc = d3.svg.arc()
  						.outerRadius(width / 2 * 0.9)
  						.innerRadius(width / 2 * 0.5);
			var svg = d3.select(element[0]).append('svg')
  						.attr({width: width, height: height})
  						.append('g')
	    					.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
			// add the <path>s for each arc slice
			//svg.selectAll('path').data(pie([82, 62, 10, 32]))
			svg.selectAll('path').data(pie([expected, actual]))
  				.enter().append('path')
    			.style('stroke', 'white')
    			.attr('d', arc)
    			.attr('fill', function(d, i){ return color(i) });



		}
	}
});


progressIndicatorApp.
   //camel cased directive name
   //in your HTML, this will be named as bars-chart
   directive('barsChart', function ($parse) {
     //explicitly creating a directive definition variable
     //this may look verbose but is good for clarification purposes
     //in real life you'd want to simply return the object {...}
     var directiveDefinitionObject = {
         //We restrict its use to an element
         //as usually  <bars-chart> is semantically
         //more understandable
         restrict: 'E',
         //this is important,
         //we don't want to overwrite our directive declaration
         //in the HTML mark-up
         replace: false,
         //our data source would be an array
         //passed thru chart-data attribute
         scope: {data: '=chartData'},
         link: function (scope, element, attrs) {
           //in D3, any selection[0] contains the group
           //selection[0][0] is the DOM node
           //but we won't need that this time
           var chart = d3.select(element[0]);
           //to our original directive markup bars-chart
           //we add a div with out chart stling and bind each
           //data entry to the chart
            chart.append("div").attr("class", "chart")
             .selectAll('div')
             .data(scope.data).enter().append("div")
             .transition().ease("elastic")
             .style("width", function(d) { return d + "%"; })
             .text(function(d) { return d + "%"; });
           //a little of magic: setting it's width based
           //on the data value (d) 
           //and text all with a smooth transition
         } 
      };
      return directiveDefinitionObject;
   });