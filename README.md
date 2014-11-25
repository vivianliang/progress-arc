# progress-arc

AngularJS directive that renders a circular progress
indicator.

The directive should take two float inputs, expected and actual, between
0.0 and 1.0. The thicker outer circle is drawn based on actual, and the
thinner inner circle is drawn based on the expected. The text should be the actual.

Please render the widget as a SVG, use D3's arc generator to produce the
arcs, and code it using CoffeeScript if possible.

The final output should be as high fidelity as possible. The colors of the
outer ring should change to orange or red when the actual is more than 25%
or 50% behind expected.

Please also animate the arcs and color transitions, add unit tests, and
have reasonable handling of unexpected values.

Example:

    <ng-arc actual=".50" expected=".75"></ng-arc>

	<input type="number" min="0" max="1" ng-model="expected" step=".1">
	<input type="number" min="0" max="1" ng-model="actual" placeholder=".5" step=".1">
	<ng-arc actual="actual" expected="expected"></ng-arc>

![Alt text](https://github.com/vivianliang/progress-arc/blob/master/arc1.png)
![Alt text](https://github.com/vivianliang/progress-arc/blob/master/arc2.png)


(Current arc: Only one end of the arc is rounded, Issue #7)

## Files

Implementaton in JavaScript:

	app/index.html
	app/app.js

Implementation in CoffeeScript:

	app/coffeescript/index.html
	app/coffeescript/coffee_app.coffee compiles to app/coffeescript/coffee_app.js

## Playground:

	app/index.html

### Unit Tests

	app/app_test.js

## Handling of unexpected values

If "actual" or "expected" attributes are less than 0, not numbers, or not specified, they default to 0. If they are greater than 1, they default to 1.