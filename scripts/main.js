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


	var points = numSquares/50;
	var points2 = numSquares/20;

	myData = myData.map(function(a){
		return {i:a, d:  points2*Math.PI*a/numSquares + (a%points)*2*Math.PI/points}
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

	
	

	function plot2Anim() {
	
		myData = myData.map(function(d){
			var newi = d.i;
			var newd = d.d;
			newd += d.i%points2/numSquares*Math.PI
			newd += points2*Math.PI*d.i/numSquares*2;
			

			return {i:newi, d:newd};
		})

		squares
			.data(myData)
			.transition()
			.duration(2000)	
			.delay(function(d) {
				return d.i
			})	
			.ease("linear")
			.attr("x",function(d,i){
				return asin(d.d,500);
			})
			.attr("y",function(d,i){
				return acos(d.d,500);
			})
			.each('end', function() {
				console.log (this.__data__.i)
				if (this.__data__.i == numSquares) {
				
					plot2Anim()
				}
			})
	}

	plot2Anim()


})

function asin(num,scale){
	return ((1+Math.sin(num))/2)*scale//+ ((1+Math.sin(num/6))/2)*scale/2
}

function acos(num,scale){
	return ((1+Math.cos(num))/2)*scale//+ ((1+Math.cos(num/6))/2)*scale/2
}