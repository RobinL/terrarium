//https://groups.google.com/forum/#!msg/d3-js/WC_7Xi6VV50/j1HK0vIWI-EJ

$(function() {

	g ={
	svgMargin: {
		top: 20,
		right: 20,
		bottom: 20,
		left: 20
	},
	squareSize: 5,
	svgHeight: function(){return 3000+this.svgMargin.top+this.svgMargin.bottom;},
	svgWidth: function() {return 3000+this.svgMargin.left+this.svgMargin.right;}
};

	svg = d3.select("#svgholder").append("svg")
		.attr("width", g.svgWidth())
		.attr("height", g.svgHeight())
		.append("g")
		.attr("class","margingroup")
		.attr("transform", "translate(" + g.svgMargin.left + "," + g.svgMargin.top + ")");

	var numSquares = 2500;
	myData = d3.range(1,numSquares+1,1);

	myData = myData.map(function(a){
		return {i:a, d:2*Math.PI*a/6}
		})
	

	var colScale = d3.scale.linear()
			.domain([0,numSquares])
			.range(["#6AE817","#B30409"]);

	squares = svg.selectAll(".anim").data(myData);

	squares
		.enter()
		.append("rect")
		.attr("height", g.squareSize)
		.attr("width", g.squareSize)
		.attr("x",function(d,i){
				return asin(d.d,500);
		})
		.attr("y",function(d,i){
			return acos(d.d,500);
		})
		.attr("fill", function(d) {return colScale(d.i)})
		.attr("class","anim")

	squares
		.transition()
		.duration()
		.delay(function(d,i){
			return i
		})
		.each('end',plot2Anim)



	function plot2Anim() {
		
		
		var data = d3.select(this).datum()
		
		//data.d += Math.PI/numSquares;
		data.d += 2*data.i*Math.PI/13;
		// data.d += 2*Math.PI/20;

		d3.select(this)	
			.datum(data)
			.transition()
			.duration(10000)		
			.attr("x",function(d,i){
				return asin(d.d,500);
			})
			.attr("y",function(d,i){
				return acos(d.d,500);
			})
			.each('end',plot2Anim)

	}


})



function asin(num,scale){
	return ((1+Math.sin(num))/2)*scale
}

function acos(num,scale){
	return ((1+Math.cos(num))/2)*scale
}


