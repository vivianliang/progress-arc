progressIndicatorApp = angular.module("progressIndicatorApp", [])
progressIndicatorApp.controller "IndicatorCtrl", ($scope) ->
  return

progressIndicatorApp.directive "ngArc", ->
  link: (scope, element, attrs) ->

    arcTween = (transition, newAngle, arc) ->
      transition.attrTween "d", (d) ->
        interpolate = d3.interpolate(d.endAngle, newAngle)
        (t) ->
          d.endAngle = interpolate(t)
          arc d

      return

    width = 200
    height = 200
    tau = 2 * Math.PI

    arc_expected = d3.svg.arc()
      .innerRadius(40)
      .outerRadius(45)
      .startAngle(0)
    arc_actual = d3.svg.arc()
      .innerRadius(47)
      .outerRadius(55)
      .startAngle(0)
    svg_actual = d3.select(element[0]).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    cir = svg_actual.append("circle")
      .attr("fill", "#E6E6E6")
      .attr("r", width / 6)
    foreground_expected = svg_actual.append("path")
      .datum(endAngle: 0 * tau)
      .style("fill", (d) ->
        "#6cbb3c"
      ).attr("d", arc_expected)
    foreground_actual = svg_actual.append("path")
      .datum(endAngle: 0 * tau)
      .style("fill", (d) ->
        if attrs.actual < attrs.expected * .75 and attrs.actual >= attrs.expected * .50
          "orange"
        else if attrs.actual < attrs.expected * .50
          "red"
        else
          "green"
      ).attr("d", arc_actual)
    svg_actual.append("text").text((d) -> attrs.actual * 100 + "%")
      .attr("font-size", "20px").attr("text-anchor", "middle").attr "y", 0
    svg_actual.append("text").text("progress")
      .attr("font-size", "15px").attr("text-anchor", "middle").attr "y", +10
      
    foreground_expected.transition().duration(1000).call arcTween, attrs.expected * tau, arc_expected
    foreground_actual.transition().duration(1000).call arcTween, attrs.actual * tau, arc_actual
    return
