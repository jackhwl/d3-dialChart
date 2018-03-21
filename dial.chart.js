//
// DialChart
//
olapDialChart = function() {

  var w = 256,
      h = 256,
      m = [ 0, 0, 0, 0 ], // top right bottom left
      scaleDomain= [0, 1],
      range= [-135, 135],

      dial = [ 1.00, 0.95, 0.92, 0.85 ],
      scale = { text: {position: 0.75, dy: 0.5, color: '#f00', family: 'SegoeUI', size: 40, scale: 0.005, weight: '100'},
              position: {start: 0.71, end: 0.76 }, rim: 0.14
            },
      needle = {type: 1, length: 0.75, width: 0.05},
      pivot = [ 0.10, 0.02 ], //centre outside radius
      palette = {bg: '#000', scale:'#37A6FE', rim:['#031835', '#0279DF'], pivot: '#fff', needle: '#fff'},
      tick = {minor: 5, major: 0, mark: 'line', exact: false},
      caption = [{text: 209, dy: -1.2, color: '#37A6FE', family: 'SegoeUI', size: 40, scale:0.005, weight: '100'},
                {text: 'Speed Score', dy: -0.9, color: '#37A6FE', family: "SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif", size: 20, scale: 0.005, weight: '100'}]
      ;

  function dialchart(selection) {
    selection.each(function(d) {
      var wm = w - m[1] - m[3],
          hm = h - m[0] - m[2],
          a = d3.scale.linear().domain(domain).range(range);

      var r = Math.min(wm / 2, hm / 2);

      var g = d3.select(this).select('g');

      if (g.empty()) {

        g = d3.select(this).append('svg:g')
          .attr('transform', 'translate(' + (m[3] + wm / 2) + ',' + (m[0] + hm / 2) + ')');

        var y2 = needle.type===1 ? -r * needle.length:0;
        drawCaption(g, r);
        createDefs(g.append('svg:defs'), 0,0,0.5,1);
        drawRim(a(d), g.append('svg:g').attr('class', 'rim'), r);
        drawScale(a, g.append('svg:g').attr('class', 'scale'), r);
        drawGlare(g, r);
        drawNeedle(a, g, r);

      } else {

        g.select('g.needle')
          .transition().ease('elastic')
          .attr('transform', function(d) { return 'rotate(' + a(d) + ')'; })
          ;
        // g.select('g.rim')
        //   .transition().ease('elastic')
        //   .attr('transform', function(d) { return 'rotate(' + a(d) + ')'; })
        //   ;

      }

    });
    d3.timer.flush();

    function drawRim(endRange, g, r) {
      if (needle.type>0) {
          //scale gradient arc
          // var arc = d3.svg.arc()
          //     .innerRadius(r* scale.position.end-35)
          //     .outerRadius(r* scale.position.end-1.8)
          //     .startAngle(range[0] * (Math.PI/180)) //converting from degs to radians
          //     .endAngle(endRange * (Math.PI/180)); //just radians
          //
          // g.append("path")
          //     .attr("d", arc)
          //     //.attr("stroke-width", "20")
          //     .attr("fill", "url(#gradient0)")


          // strip rim
          var points = 50;
          var angle = d3.scale.linear()
              .domain([0, points-1])
              .range([range[0] * (Math.PI/180), endRange * (Math.PI/180)]);

          var line = d3.svg.line.radial()
              .interpolate("basis")
              .tension(0)
              .radius(r* scale.position.end-2-(r* scale.rim/2))
              .angle(function(d, i) { return angle(i); });

          // var svg = d3.select("body").append("svg")
          //     // .attr("width", dimension)
          //     // .attr("height", dimension)
          // .append("g");

          g.append("path").datum(d3.range(points))
              //.attr("class", "lineArc")
              .attr("d", line)
              //.attr("transform", "translate(" + (r + padding) + ", " + (r + padding) + ")")
              ;
          var color = d3.interpolate(palette.rim[0], palette.rim[1]);

          var path = g.select("path").remove();
          g.selectAll("path")
                  .data(quads(samples(path.node(), 8)))
                .enter().append("path")
                  .style("fill", function(d) { return color(d.t); })
                  .style("stroke", function(d) { return color(d.t); })
                  .attr("d", function(d) { return lineJoin(d[0], d[1], d[2], d[3], (r* scale.rim)); })
                  //.attr("transform", "translate(" + 810 + ", " + 250 + ")")
                  ;
        } else {
          //face
          g.append('svg:circle')
            .attr('r', r * scale.dial.outer)
            .style('fill', 'url(#outerGradient)')
            .attr('filter', 'url(#dropShadow)');

          g.append('svg:circle')
            .attr('r', r * scale.dial.middle)
            .style('fill', 'url(#innerGradient)');

          g.append('svg:circle')
            .attr('r', r * scale.dial.inner)
            .style('fill', 'url(#faceGradient)');
        }

        // Sample the SVG path uniformly with the specified precision.
        function samples(path, precision) {
          var n = path.getTotalLength(), t = [0], i = 0, dt = precision;
          while ((i += dt) < n) t.push(i);
          t.push(n);
          return t.map(function(t) {
            var p = path.getPointAtLength(t), a = [p.x, p.y];
            a.t = t / n;
            return a;
          });
        }

        // Compute quads of adjacent points [p0, p1, p2, p3].
        function quads(points) {
          return d3.range(points.length - 1).map(function(i) {
            var a = [points[i - 1], points[i], points[i + 1], points[i + 2]];
            a.t = (points[i].t + points[i + 1].t) / 2;
            return a;
          });
        }

        // Compute stroke outline for segment p12.
        function lineJoin(p0, p1, p2, p3, width) {
          var u12 = perp(p1, p2),
              r = width / 2,
              a = [p1[0] + u12[0] * r, p1[1] + u12[1] * r],
              b = [p2[0] + u12[0] * r, p2[1] + u12[1] * r],
              c = [p2[0] - u12[0] * r, p2[1] - u12[1] * r],
              d = [p1[0] - u12[0] * r, p1[1] - u12[1] * r];

          if (p0) { // clip ad and dc using average of u01 and u12
            var u01 = perp(p0, p1), e = [p1[0] + u01[0] + u12[0], p1[1] + u01[1] + u12[1]];
            a = lineIntersect(p1, e, a, b);
            d = lineIntersect(p1, e, d, c);
          }

          if (p3) { // clip ab and dc using average of u12 and u23
            var u23 = perp(p2, p3), e = [p2[0] + u23[0] + u12[0], p2[1] + u23[1] + u12[1]];
            b = lineIntersect(p2, e, a, b);
            c = lineIntersect(p2, e, d, c);
          }

          return "M" + a + "L" + b + " " + c + " " + d + "Z";
        }

        // Compute intersection of two infinite lines ab and cd.
        function lineIntersect(a, b, c, d) {
          var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3,
              y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3,
              ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
          return [x1 + ua * x21, y1 + ua * y21];
        }

        // Compute unit vector perpendicular to p01.
        function perp(p0, p1) {
          var u01x = p0[1] - p1[1], u01y = p1[0] - p0[0],
              u01d = Math.sqrt(u01x * u01x + u01y * u01y);
          return [u01x / u01d, u01y / u01d];
        }

    }

    function drawScale(a, g, r) {
      if (needle.type>0) {
        //scale arc thin rim
        var arc = d3.svg.arc()
            .innerRadius(r* scale.position.end-2)
            .outerRadius(r* scale.position.end+1)
            .startAngle(range[0] * (Math.PI/180)) //converting from degs to radians
            .endAngle(range[1] * (Math.PI/180)); //just radians

        g.append("path")
            .attr("d", arc)
            .attr("fill", palette.scale)
      }

      // var tick0 = 10;
      // var major = a.ticks(tick0);
      // var minor = a.ticks(tick0 * minorTicks).filter(function(d) { return major.indexOf(d) == -1; });
      // var middle = a.ticks(tick0 * minorTicks).filter(function(d) { return major.indexOf(d) != -1; });

      //var tick0 = tick.major===1 ? 10 : tick.major;
      var major = a.ticks(tick.major);
      var minor = a.ticks(tick.minor * tick.major);//.filter(function(d) { return major.indexOf(d) == -1; });
      var middle = a.ticks(tick.minor * tick.major).filter(function(d) { return major.indexOf(d) != -1; });
      var majorRange = tick.exact ? [major[0], scaleDomain[1]] : [major[0], major[major.length-1]];

      g.selectAll('text.label')
        .data(needle.type>0 ? majorRange : major)
        .enter().append('svg:text')
        .attr({
          'x': function(d) { return Math.cos( (-90 + a((tick.exact ? d / scaleDomain[1] * major[major.length-1] : d))) / 180 * Math.PI) * r * scale.text.position; },
          'y': function(d) { return Math.sin( (-90 + a((tick.exact ? d / scaleDomain[1] * major[major.length-1] : d))) / 180 * Math.PI) * r * scale.text.position; },
          'dy': function(d){ return scale.text.dy + 'em' },
          'font-family': function(d){return scale.text.family},
          'font-size': function(d){return r * scale.text.size * scale.text.scale + 'px'},
          'font-weight': function(d){return scale.text.weight},
          'fill': function(d){return scale.text.color},
          'alignment-baseline': 'middle',
          'text-anchor': 'middle',
        })
        .text(a.tickFormat())
        ;

      if (tick.mark == 'circle') {
        g.selectAll('circle.label')
            .data(minor)
          .enter().append('svg:circle')
            .attr('class', 'label')
            .attr('cx', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * (r * scale.text.position); })
            .attr('cy', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * (r * scale.text.position); })
            .attr('r', 2);
      }

      if (tick.mark == 'line') {
        if (needle.type>0) {
          g.selectAll('line.label')
            .data(minor)
            .enter().append('svg:line')
              .attr('class', 'mlabel')
              .attr('stroke', palette.scale)
              .attr('x1', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * (r * (scale.position.start+0.01)); })
              .attr('y1', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * (r * (scale.position.start+0.01)); })
              .attr('x2', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * (r * scale.position.end); })
              .attr('y2', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * (r * scale.position.end); });
          g.selectAll('line.label')
            .data(middle)
            .enter().append('svg:line')
              .attr('class', 'mlabel')
              .attr('stroke', palette.scale)
              .attr('x1', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * (r * (scale.position.start-0.02)); })
              .attr('y1', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * (r * (scale.position.start-0.02)); })
              .attr('x2', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * (r * scale.position.end); })
              .attr('y2', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * (r * scale.position.end); });
        } else {
          g.selectAll('line.label')
            .data(minor)
            .enter().append('svg:line')
              .attr('class', 'label')
              .attr('x1', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * (r * scale.position.start); })
              .attr('y1', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * (r * scale.position.start); })
              .attr('x2', function(d) { return Math.cos( (-90 + a(d)) / 180 * Math.PI) * (r * scale.position.end); })
              .attr('y2', function(d) { return Math.sin( (-90 + a(d)) / 180 * Math.PI) * (r * scale.position.end); });
        }
      }
    }

    function drawGlare(g, r) {
      // gradient on top panel
      var rdial3 = r * scale.dial.dash;
      g.append('svg:path')
        .attr('class', 'dial-glare')
        .attr('d', 'M ' + (-rdial3) + ',0 A' + rdial3 + ',' + rdial3 + ' 0 0,1 ' + rdial3 + ',0 A' + (rdial3 * 5) + ',' + (rdial3 * 5) + ' 0 0,0 ' + (-rdial3) + ',0')
        .style('fill', 'url(#glareGradient)')
        ;
    }

    function createDefs(defs, x1, y1, x2, y2) {

      // var arc0 = d3.svg.arc()
      //     .innerRadius(r* scale.position.end-50)
      //     .outerRadius(r* scale.position.end-20)
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

    // function gradientColorGenerater(svg, colors) {
    //     if (!svg) return;
    //     let defs = svg.append("svg:defs");
    //     let res = [];
    //     if (Array.isArray(colors)) {
    //         colors.forEach(function (item, index) {
    //             let next = colors[index + 1] || colors[0];
    //             let id = `color_gradient_${index}`;
    //             let gradient = defs.append("svg:linearGradient")
    //                 .attr("id", id);
    //
    //             gradient.append("svg:stop")
    //                 .attr("offset", "0%")
    //                 .attr("stop-color", item.color);
    //
    //             gradient.append("svg:stop")
    //                 .attr("offset", "100%")
    //                 .attr("stop-color", next.color);
    //
    //             res[index] = {
    //                 gradient:gradient,
    //                 color: `url(#${id})`,
    //                 percent: item.percent
    //             }
    //         });
    //     }
    //     return res;
    // }

    function drawNeedle(a, g, r) {
      // needle
      var n = g.append('svg:g')
        .attr('class', 'needle')
        .attr('filter', 'url(#dropShadow)')
        .attr('transform', function(d) { return 'rotate(' + a(d) + ')'; })
        ;

      if (needle.type>0) {
          if (needle.type===1) {
            n.append('svg:line')
            .attr('class', 'needle')
            .attr('stroke', palette.needle)
            .attr('stroke-width', (needle.width * 40) +'px')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', -r * needle.length);
          } else {
            n.append('svg:path')
              .attr('d', 'M ' + (-r * needle.width) + ',0 L0,' + (-r * needle.length)+ ' L' + r * needle.width + ',0')
              .attr('fill', palette.needle);
          }

        n.append('svg:circle')
          .attr('r', r * pivot[1])
          .style('fill', palette.pivot)
          ;
      } else {
        n.append('svg:path')
          .attr('d', 'M ' + (-r * needle.width) + ',0 L0,' + (-r * needle.length)+ ' L' + r * needle.width + ',0')
          .attr('fill', palette.needle);

        n.append('svg:circle')
          .attr('r', r * pivot[0])
          .style('fill', 'url(#outerGradient)');

        n.append('svg:circle')
          .attr('r', r * pivot[1])
          .style('fill', 'url(#innerGradient)');
      }

    }

    function drawCaption(g, r) {
      if (needle.type>0) {
        g.selectAll('text')
          .data(caption)
          .enter().append('svg:text')
          .text(function(d){return d.text})
          .attr({
            'dx': function(d){return 0},
            'dy': function(d){return d.dy + 'em' },
            'style': function(d){return 'font-family: '+d.family+';font-size: '+(r * d.size * d.scale)+'px;font-weight: '+d.weight+';fill: '+d.color+';alignment-baseline: middle;text-anchor: middle;'}
          })
          ;
      }
    }

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

  dialchart.dial = function(d) {
    if (!arguments.length) return dial;
    dial = d;
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

  dialchart.scaleDomain = function(d) {
    if (!arguments.length) return scaleDomain;
    scaleDomain = d;
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

  dialchart.needle = function(d) {
    if (!arguments.length) return needle;
    needle = d;
    return dialchart;
  };

  dialchart.pivot = function(d) {
    if (!arguments.length) return pivot;
    pivot = d;
    return dialchart;
  };

  dialchart.palette = function(d) {
    if (!arguments.length) return palette;
    palette = d;
    return dialchart;
  };

  dialchart.tick = function(d) {
    if (!arguments.length) return tick;
    tick = d;
    return dialchart;
  };

  dialchart.caption = function(d) {
    if (!arguments.length) return caption;
    caption = d;
    return dialchart;
  };

  return dialchart;
};
