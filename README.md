# progress-arc
===========

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

![Alt text](https://github.com/vivianliang/progress-arc/blob/master/arc.png)
