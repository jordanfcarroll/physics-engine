
var circles = [
	{
		xpos: 100,
		ypos: 100,
		radius: 20
	},
	{
		xpos: 100,
		ypos: 100,
		radius: 30
	},
	{
		xpos: 330,
		ypos: 440,
		radius: 50
	},
	{
		xpos: 200,
		ypos: 400,
		radius: 10
	},
	{
		xpos: 3,
		ypos: 4,
		radius: 10
	},
	{
		xpos: 6,
		ypos: 8,
		radius: 10
	}]

function square (x) {
	return x*x;
}
console.assert(square(5) === 25);


function dist(a, b) {
	return Math.sqrt(square(a.xpos - b.xpos) + (square(a.ypos - b.ypos))); 
}

console.assert( dist ( circles[0], circles[1] ) === 0);
console.assert( dist ( circles[4], circles[5] )  === 5);



function checkColliding(a, b) {
	var combinedR = a.radius + b.radius;
	var distance = dist(a, b);
	if (distance > combinedR) {
	  	return false;
	} else {
	  	return true;
	}
}

console.assert(checkColliding(circles[0], circles[1]) === true);
console.assert(checkColliding(circles[2], circles[3]) === false);
console.assert(checkColliding(circles[1], circles[2]) === false);

for ( var i = 0 ; i < circles.length ; i++ ) {
	for (var j = i + 1 ; j < circles.length ; j++ ) {
		console.log(i + ' , ' + j)

	}
}

screenWidth = document.getElementById('myCanvas').getAttribute('width');
screenHeight = document.getElementById('myCanvas').getAttribute('height');

var randomR = Math.floor(Math.random() * 60) + 10;
var randomX = Math.floor(randomR + Math.random() * screenWidth);
var randomY = Math.floor(Math.random() * screenHeight);


for( var i = 0 ; i < 10000 ; i++) { 
	console.assert(randomX - ) 
}




