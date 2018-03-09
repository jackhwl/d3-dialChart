//
// DialChart
//
NBXDialChart = function() {

  var w = 256,
      h = 256,
      m = [ 0, 0, 0, 0 ], // top right bottom left
      domain = [0, 1],
      range = [-135, 135],
      minorTicks = 4,
      minorMark = 'line',

      dial = [ 1.00, 0.95, 0.92, 0.85 ],
      scale = [ 0.71, 0.75, 0.76 ], // mark line from centre of circle start, number from centre of circle, mark line from centre of circle end
      needle = [ 0.83, 0.05 ], //length, width
      pivot = [ 0.10, 0.05 ], //centre outside radius
      needleParam = {color: '#f00', type: 0, needle:[ 0.83, 0.05 ] };

  function dialchart(g) {
    console.log(g);
    g.each(function(d, i) {

      var wm = w - m[1] - m[3],
          hm = h - m[0] - m[2],
          a = d3.scale.linear().domain(domain).range(range);

      var r = Math.min(wm / 2, hm / 2);

      var g = d3.select(this).select('g');
      if (g.empty()) {

        g = d3.select(this).append('svg:g')
          .attr('transform', 'translate(' + (m[3] + wm / 2) + ',' + (m[0] + hm / 2) + ')');

        var y2 = needleParam.type===1 ? -r * needleParam.needle[0]:0;
        createDefs(g.append('svg:defs'), 0,0,0.5,1);
        drawRim(a(d), g, r);
        drawScale(a, g, r);
        drawGlare(g, r);

        // needle
        var n = g.append('svg:g')
          .attr('class', 'needle')
          .attr('filter', 'url(#dropShadow)')
          .attr('transform', function(d) { return 'rotate(' + a(d) + ')'; })
          ;

        if (needleParam.type>0) {
            if (needleParam.type===1) {
              n.append('svg:line')
              .attr('class', 'needle')
              .attr('stroke', needleParam.color)
              .attr('stroke-width', (needleParam.needle[1] * 40) +'px')
              .attr('x1', 0)
              .attr('y1', 0)
              .attr('x2', 0)
              .attr('y2', -r * needleParam.needle[0]);
            } else {
              n.append('svg:path')
                .attr('d', 'M ' + (-r * needleParam.needle[1]) + ',0 L0,' + (-r * needleParam.needle[0])+ ' L' + r * needleParam.needle[1] + ',0')
                .attr('fill', needleParam.color);
            }

          n.append('svg:circle')
            .attr('r', r * pivot[1])
            .style('fill', needleParam.color)
            ;
        } else {
          n.append('svg:path')
            .attr('d', 'M ' + (-r * needle[1]) + ',0 L0,' + (-r * needle[0])+ ' L' + r * needle[1] + ',0')
            .attr('fill', needleParam.color);

          n.append('svg:circle')
            .attr('r', r * pivot[0])
            .style('fill', 'url(#outerGradient)');

          n.append('svg:circle')
            .attr('r', r * pivot[1])
            .style('fill', 'url(#innerGradient)');
        }

      } else {

        g.select('g.needle')
          .transition().ease('elastic')
          .attr('transform', function(d) { return 'rotate(' + a(d) + ')'; })
          ;

      }

    });
    d3.timer.flush();
  }

  function drawRim(endRange, g, r) {
    if (needleParam.type>0) {
        //scale gradient arc
        var arc = d3.svg.arc()
            .innerRadius(r* scale[2]-35)
            .outerRadius(r* scale[2]-1.8)
            .startAngle(range[0] * (Math.PI/180)) //converting from degs to radians
            .endAngle(endRange * (Math.PI/180)); //just radians

        g.append("path")
            .attr("d", arc)
            //.attr("stroke-width", "20")
            .attr("fill", "url(#gradient0)")

      } else {
        //face
        g.append('svg:circle')
          .attr('r', r * dial[0])
          .style('fill', 'url(#outerGradient)')
          .attr('filter', 'url(#dropShadow)');

        g.append('svg:circle')
          .attr('r', r * dial[1])
          .style('fill', 'url(#innerGradient)');

        g.append('svg:circle')
          .attr('r', r * dial[2])
          .style('fill', 'url(#faceGradient)');
      }

  }

  function drawScale(a, g, r) {
    if (needleParam.type>0) {
      //scale arc thin rim
        var arc = d3.svg.arc()
            .innerRadius(r* scale[2]-2)
            .outerRadius(r* scale[2]+1)
            .startAngle(range[0] * (Math.PI/180)) //converting from degs to radians
            .endAngle(range[1] * (Math.PI/180)); //just radians

        g.append("path")
            .attr("d", arc)
            .attr("fill", "#37A6FE")
    }

    var tick0 = 10;
    var major = a.ticks(tick0);
    var minor = a.ticks(tick0 * minorTicks).filter(function(d) { return major.indexOf(d) == -1; });
    var middle = a.ticks(tick0 * minorTicks).filter(function(d) { return major.indexOf(d) != -1; });
    var majorRange = [major[0], major[major.length-1]];
    // console.log('major');
    // console.log(major);
    // console.log(minor);
    // console.log(middle);
    // console.log(majorRange);

    g.selectAll('text.label')
        .data(needleParam.type>0 ? majorRange : major)
      .enter().append('svg:text')
        .attr('class', 'label')
        .attr('x', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * r * scale[1]; })
        .attr('y', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * r * scale[1]; })
        .attr('text-anchor', 'middle')
        .attr('dy', '0.5em')
        .text(a.tickFormat());

    if (minorMark == 'circle') {
      g.selectAll('circle.label')
          .data(minor)
        .enter().append('svg:circle')
          .attr('class', 'label')
          .attr('cx', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * (r * scale[1]); })
          .attr('cy', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * (r * scale[1]); })
          .attr('r', 2);
    }

    if (minorMark == 'line') {
      if (needleParam.type>0) {
        g.selectAll('line.label')
            .data(minor)
          .enter().append('svg:line')
            .attr('class', 'mlabel')
            .attr('x1', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * (r * (scale[0]+0.01)); })
            .attr('y1', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * (r * (scale[0]+0.01)); })
            .attr('x2', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * (r * scale[2]); })
            .attr('y2', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * (r * scale[2]); });
        g.selectAll('line.label')
            .data(middle)
          .enter().append('svg:line')
            .attr('class', 'mlabel')
            .attr('x1', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * (r * (scale[0]-0.02)); })
            .attr('y1', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * (r * (scale[0]-0.02)); })
            .attr('x2', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * (r * scale[2]); })
            .attr('y2', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * (r * scale[2]); });
      } else {
        g.selectAll('line.label')
            .data(minor)
          .enter().append('svg:line')
            .attr('class', 'label')
            .attr('x1', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * (r * scale[0]); })
            .attr('y1', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * (r * scale[0]); })
            .attr('x2', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * (r * scale[2]); })
            .attr('y2', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * (r * scale[2]); });

      }
    }

  }

  function drawGlare(g, r) {
    if (needleParam.type===0) {
      // gradient on top panel
      var rdial3 = r * dial[3];
      g.append('svg:path')
        .attr('class', 'dial-glare')
        .attr('d', 'M ' + (-rdial3) + ',0 A' + rdial3 + ',' + rdial3 + ' 0 0,1 ' + rdial3 + ',0 A' + (rdial3 * 5) + ',' + (rdial3 * 5) + ' 0 0,0 ' + (-rdial3) + ',0')
        .style('fill', 'url(#glareGradient)')
        ;
    }
  }

  function createDefs(defs, x1, y1, x2, y2) {

    // var arc0 = d3.svg.arc()
    //     .innerRadius(r* scale[2]-50)
    //     .outerRadius(r* scale[2]-20)
    //     .startAngle(-135 * (Math.PI/180)) //converting from degs to radians
    //     .endAngle(2.36); //just radians

    // g.append("path")
    //     .attr("d", arc0)
    //     .attr("fill", "url(#arcGradient)")

        // Define the gradient
      var	newGrad = defs.append("svg:linearGradient")
      		.attr("id", "newGrad")
      		.attr("spreadMethod", "pad");

      	// Define the gradient color stops
      	newGrad.append("svg:stop")
      		.attr("offset", "0%")
      		.attr("stop-color", "#000")
      		.attr("stop-opacity", 2);
      	newGrad.append("svg:stop")
      		.attr("offset", "100%")
      		.attr("stop-color", "#007AE1")
      		.attr("stop-opacity", 2);

        var red_gradient = defs.append("svg:linearGradient")
          .attr("id", "gradient0")
          .attr("x1", x1)
          .attr("y1", y1)
          .attr("x2", x2)
          .attr("y2", y2)
          .attr("spreadMethod", "pad");

        //first dark red color
            red_gradient.append("svg:stop")
                .attr("offset", "0%")
                .attr("stop-color", "#f00")
                .attr("stop-opacity", 1);
        //second light red color
            red_gradient.append("svg:stop")
                .attr("offset", "100%")
                .attr("stop-color", "#007AE1")
                .attr("stop-opacity", 1);

      var radial_gradient = defs.append("radialGradient")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("cx", '50%')
          .attr("cy", '50%')
          .attr("r", "50%")
          .attr("fx", '50%')
          .attr("fy", '50%')
          .attr('gradientTransform', "translate(-200,-200)")
          .attr("id", 'gradient2');
           radial_gradient.append("stop").attr("offset", "0%").style("stop-color", "black");
           //radial_gradient.append("stop").attr("offset", "55%").style("stop-color", "white");
           radial_gradient.append("stop").attr("offset", "95%").style("stop-color", "white");


    var gradient = defs.append('svg:linearGradient')
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", "0")
        .attr("x2", "0")
        .attr("id", "gradient")
        .attr("gradientUnits", "userSpaceOnUse")

    gradient
        .append("stop")
        .attr("offset", "0")
        .attr("stop-color", "#ff0")

    gradient
        .append("stop")
        .attr("offset", "0.5")
        .attr("stop-color", "#f00")

    var arcGradient = defs.append('svg:linearGradient')
      .attr('id', 'arcGradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%')
      .attr('spreadMethod', 'pad');

    arcGradient.selectAll('stop')
        .data([{ o: '0%', c: '#ffffff' }, { o: '100%', c: '#d0d0d0' }])
      .enter().append('svg:stop')
        .attr('offset', function(d) { return d.o; })
        .attr('stop-color', '#00f')
        .attr('stop-opacity', '1');

    var outerGradient = defs.append('svg:linearGradient')
      .attr('id', 'outerGradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%')
      .attr('spreadMethod', 'pad');

    outerGradient.selectAll('stop')
        .data([{ o: '0%', c: '#ffffff' }, { o: '100%', c: '#d0d0d0' }])
      .enter().append('svg:stop')
        .attr('offset', function(d) { return d.o; })
        .attr('stop-color', function(d) { return d.c; })
        .attr('stop-opacity', '1');

    var innerGradient = defs.append('svg:linearGradient')
      .attr('id', 'innerGradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%')
      .attr('spreadMethod', 'pad');

    innerGradient.selectAll('stop')
        .data([{ o: '0%', c: '#d0d0d0' }, { o: '100%', c: '#ffffff' }])
      .enter().append('svg:stop')
        .attr('offset', function(d) { return d.o; })
        .attr('stop-color', function(d) { return d.c; })
        .attr('stop-opacity', '1');

    var faceGradient = defs.append('svg:linearGradient')
      .attr('id', 'faceGradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%')
      .attr('spreadMethod', 'pad');

    faceGradient.selectAll('stop')
        .data([{ o: '0%', c: '#000000' }, { o: '100%', c: '#494949' }])
      .enter().append('svg:stop')
        .attr('offset', function(d) { return d.o; })
        .attr('stop-color', function(d) { return d.c; })
        .attr('stop-opacity', '1');

    var glareGradient = defs.append('svg:linearGradient')
      .attr('id', 'glareGradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%')
      .attr('spreadMethod', 'pad');

    glareGradient.selectAll('stop')
        .data([{ o: '0%', c: '#ffffff', op: 0.60 }, { o: '100%', c: '#ffffff', op: 0.00 }])
      .enter().append('svg:stop')
        .attr('offset', function(d) { return d.o; })
        .attr('stop-color', function(d) { return d.c; })
        .attr('stop-opacity', function(d) { return d.op; });

    var dropShadowFilter = defs.append('svg:filter')
      .attr('id', 'dropShadow');
    dropShadowFilter.append('svg:feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 3);
    dropShadowFilter.append('svg:feOffset')
      .attr('dx', 2)
      .attr('dy', 2)
      .attr('result', 'offsetblur');
    var feMerge = dropShadowFilter.append('svg:feMerge');
    feMerge.append('svg:feMergeNode');
    feMerge.append('svg:feMergeNode')
      .attr('in', "SourceGraphic");

  }

  function GradientColorGenerater(svg, colors) {
      if (!svg) return;
      let defs = svg.append("svg:defs");
      let res = [];
      if (Array.isArray(colors)) {
          colors.forEach(function (item, index) {
              let next = colors[index + 1] || colors[0];
              let id = `color_gradient_${index}`;
              let gradient = defs.append("svg:linearGradient")
                  .attr("id", id);

              gradient.append("svg:stop")
                  .attr("offset", "0%")
                  .attr("stop-color", item.color);

              gradient.append("svg:stop")
                  .attr("offset", "100%")
                  .attr("stop-color", next.color);

              res[index] = {
                  gradient:gradient,
                  color: `url(#${id})`,
                  percent: item.percent
              }
          });
      }
      return res;
  }

  dialchart.width = function(d) {
    if (!arguments.length) return w;
    w = d;
    return dialchart;
  };

  dialchart.height = function(d) {
    if (!arguments.length) return h;
    h = d;
    return dialchart;
  };

  dialchart.margin = function(d) {
    if (!arguments.length) return m;
    m = d;
    return dialchart;
  };

  dialchart.domain = function(d) {
    if (!arguments.length) return domain;
    domain = d;
    return dialchart;
  };

  dialchart.range = function(d) {
    if (!arguments.length) return range;
    range = d;
    return dialchart;
  };

  dialchart.scale = function(d) {
    if (!arguments.length) return scale;
    scale = d;
    return dialchart;
  };

  dialchart.minorTicks = function(d) {
    if (!arguments.length) return minorTicks;
    minorTicks = d;
    return dialchart;
  };

  dialchart.minorMark = function(d) {
    if (!arguments.length) return minorMark;
    minorMark = d;
    return dialchart;
  };

  dialchart.needleParam = function(d) {
    if (!arguments.length) return needleParam;
    needleParam = d;
    return dialchart;
  };

  dialchart.pivot = function(d) {
    if (!arguments.length) return pivot;
    pivot = d;
    return dialchart;
  };

  return dialchart;

};
