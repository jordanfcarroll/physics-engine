//  TO DO 
//  1. Collision resolver
//  2. Friction
//  3. Make more randomX and randomY generation less bad


var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var x = 20;
var y = 20;
var tickTime = 10;

screenWidth = document.getElementById('myCanvas').getAttribute('width');
screenHeight = document.getElementById('myCanvas').getAttribute('height');

function square (x) {
	return x*x;
}

function distance(a, b) {
	return Math.sqrt(square(a.xpos - b.xpos) + (square(a.ypos - b.ypos))); 
}

// colliding circles check
function checkColliding(a, b) {
	var combinedR = a.radius + b.radius;
	var distance = dist(a, b);
	if (distance > combinedR) {
	  	return false;
	} else {
	  	return true;
	}
}

function checkBounds () {
	for (var i = 0; i < circles.length; i++) {
	    if (circles[i].xpos >= canvas.width - circles[i].radius || circles[i].xpos <= circles[i].radius) {	
	      	circles[i].xvel = -circles[i].xvel * 0.8;
	    }
	    if (circles[i].ypos >= canvas.height - circles[i].radius || circles[i].ypos <= circles[i].radius) {
	    	if (circles[i].yvel > 0) {
	    		circles[i].yvel = -circles[i].yvel * 0.7;
	    	}
	   	if (circles[i].yvel < 50) {
	   		// circles[i].yvel = 0;
	   	}
    }
  }
}

// function checkCollisions() {
// 	for(var i = 0; i < circles.length; i++) {
// 	  	for(var j = 0; j < circles.length; j++) {
//       	var xdiff = circles[i].xpos - circles[j].xpos;
//         var ydiff = circles[i].ypos - circles[j].ypos;
// 	    	if(xdiff <= (circles[i].radius + circles[j].radius) && xdiff >= 0 && ydiff <= (circles[i].radius + circles[j].radius) && ydiff >= 0 && i !== j) {
// 				circles[i].xvel = circles[i].xvel - (circles[i].xvel * 2);
// 	      		circles[i].yvel = circles[i].yvel - (circles[i].yvel * 2);
//             	circles[j].xvel = circles[j].xvel - (circles[j].xvel * 2);
// 	      		circles[j].yvel = circles[j].yvel - (circles[j].yvel * 2);
// 	        }
// 	    }
//   	}
// }

function drawCircle (a) {
	ctx.beginPath();
	ctx.arc(circles[a].xpos, circles[a].ypos, circles[a].radius, 0, Math.PI*2);
	ctx.fillStyle = circles[a].color;
	ctx.fill();
	ctx.closePath();
}

function updatePositions (entities) {
	for (var i = 0; i < entities.length; i++) {
		entities[i].xpos += entities[i].xvel * (tickTime/1000);
		entities[i].ypos += entities[i].yvel * (tickTime/1000);
		entities[i].xvel += entities[i].xa * (tickTime/1000);
		entities[i].yvel += entities[i].ya * (tickTime/1000);
  }
}


var circles = [];




function add() {
	var randomR = Math.floor(Math.random() * 60) + 10;
	var randomX = Math.floor(Math.random() * screenWidth);
  	var randomY = Math.floor(Math.random() * screenHeight);
  	var randomXV = Math.floor(Math.random() * 300) + 1;
  	var randomYV = Math.floor(Math.random() * 300) + 1;



	// Ensure circles do not spawn clipping screen borders
	randomX += randomR;
	randomY += randomR;
  	if (randomX + randomR > screenWidth) {
  		randomX -= randomR*2;
  	}
  	if (randomY + randomR > screenHeight) {
  		randomY -= randomR*2;
  	}
}



  	// var randomXA = Math.floor(Math.random() * 300);
  	// var randomYA = Math.floor(Math.random() * 300);
  	circles.push({
  			radius: 10,
			xpos: 200,
		    ypos: 200,
		    xvel: randomXV,
		    yvel: randomYV,
		    xa: 0,
		    ya: 1200,
		    color: 'black'
  	});
}


function engine() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);


	for ( var i = 0; i < circles.length; i++) {
  		drawCircle(i);
  	}
 
	updatePositions(circles);	
  	checkBounds();


// THIS WORKS AND IS SO GREAT
// for ( var i = 0 ; i < circles.length ; i++ ) {
// 	for (var j = 0 ; j < circles.length ; j++ ) {
// 		if (i === j) {
// 			break;
// 		}
// 		if (checkCollisions(circles[i], circles[j])) {
// 			// resolveCollisions
// 		}
// 	}
// }

// THIS IS ALSO WORKS AND IS GREAT
for ( var i = 0 ; i < circles.length ; i++ ) {
	for (var j = i + 1 ; j < circles.length ; j++ ) {
		if (checkCollisions(circles[i], circles[j])) {
			// resolveCollisions
		}
	}
}


add();


setInterval(engine, tickTime);
// setInterval(add, 1000);




