// function myData() {
// 	var series1 = [];
// 	for(var i =1; i < 100; i ++) {
// 		series1.push({
// 			x: i, y: 100 / i
// 		});
// 	}

// 	return [
// 		{
// 			key: "Series #1",
// 			values: series1,
// 			color: "#0000ff"
// 		}
// 	];
// }
var w = 1260,
h = 500,
bgColor = '#031732',
//bgColor = '#fff',
tick = {minor: 5, major: 10, mark: 'line', exact: false},
tick1 = {minor: 5, major: 10, mark: 'circle', exact: false},
scale = { dial: {outer: 1.00,  middle: 0.95, inner: 0.92, dash: 0.85 },
		text: {position: 0.75, dy: 0.5, color: '#fff', family: 'SegoeUI', size: 20, scale: 0.005, weight: '100'},
		position: {start: 0.71, end: 0.76 }, rim: 0.14 },
needle = {type: 0, length: 0.75, width: 0.05},
pivot= [ 0.10, 0.05 ],
scaleDomain= [0, 220],
range= [-135, 135],
palette = {bg: bgColor, scale:'#37A6FE', rim:['#031732', '#0279DF'], pivot: '#fff', needle: '#b21f24'},
caption= [{text: 200, dy: -1.2, color: '#37A6FE', family: 'Arial', size: 50, scale: 0.01, weight: 'normal'},
		{text: 'Speed Score', dy: -0.9, color: '#37A6FE', family: "SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif", size: 20, scale:0.01, weight: '100'}]
;

var myData = { x: 810, y: 250, r: 280, pivot: [ 0.10, 0.02 ], scaleDomain: [0, 220], range: [-135, 135],
	tick: {minor: 5, major: 14, mark: 'line', exact: true},
	palette: {bg: bgColor, scale:'#2EA0FF', rim: ['#031732', '#0279DF'], pivot: '#fff', needle: '#fff'},
	needle: {type: 1, length: 0.75, width: 0.05},
	scale: { dial: {outer: 1.00,  middle: 0.95, inner: 0.92, dash: 0.61*0 },
			text: {position: 0.875, dy: 0.5, color: '#125EA3', family: 'SegoeUI', size: 10, scale: 0.005, weight: '100'},
			position: {start: 0.71, end: 0.76 }, rim: 0.14},
	caption: [{text: 209, dy: -1.2, color: '#0279DF', family: 'SegoeUI', size: 40, scale:0.005, weight: '100'},
			{text: 'Speed Score', dy: -1.4, color: '#0279DF', family: "SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif", size: 15, scale: 0.005, weight: '100'}]
  };


nv.addGraph(function() {
	var chart = nv.models.dialChart();

	// chart.xAxis
	// 	.axisLabel("X-axis Label");

	// chart.yAxis
	// 	.axisLabel("Y-axis Label")
	// 	.tickFormat(d3.format("d"))
	// 	;

	d3.select("svg")
		.datum(myData)
		.transition().duration(500).call(chart);

	nv.utils.windowResize(
			function() {
				chart.update();
			}
		);

	return chart;
});
