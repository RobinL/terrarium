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

	var numSquares = 500;
	myData = d3.range(1,numSquares+1,1);

	squares = svg.selectAll(".anim").data(myData);

	squares
		.enter()
		.append("rect")
		.attr("height", g.squareSize)
		.attr("width", g.squareSize)
		.attr("x",function(d,i){return 1;})
		.attr("fill", function(d) {return "#FB0000";})
		.attr("class","anim")
	
	squares = svg.selectAll(".anim").data(myData);

	pos = 0;

	
	console.log(d3.range)


	function plot1Anim() {
		

	squares
		.transition()
		.duration(0)
		.ease("linear")
		.attr("x",function(d,i){
			return asin(pos+i/8,500);
		})
		.attr("y",function(d,i){
			
			 return i*g.squareSize/10
		})
		.each('end', function(d,i) {
	
			if (i ==numSquares-1)	{
				pos+=Math.PI/1000
				plot1Anim();
			}
		})
	}

	plot1Anim()


})



function asin(num,scale){
	return ((1+Math.sin(num))/2)*scale
}

function acos(num,scale){
	return ((1+Math.cos(num))/2)*scale
}


