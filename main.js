//  TO DO 
//  1. Collision resolver
//  2. Friction
//  3. Make more randomX and randomY generation less bad
// 4. Fix top border collisions



function pause() {
	paused = !paused;
	if (pauseButton.textContent === 'Pause') {
		pauseButton.textContent = 'Resume';
	} else {
		pauseButton.textContent = 'Pause';
	}
}

function advanceFrame(frames) {
	for ( var i = 0 ; i < frames ; i++) {
		engine();
		updatePositions(circles);
	}
}

function square (x) {
	return x*x;
}

function dist(a, b) {
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

// function resolveCollisions(a,b) {

// }

function addGravity(x,y) {
	circles.forEach(function(value) {
		value.xa = x;
		value.ya = y;
	});
}

function checkBounds () {
	for (var i = 0; i < circles.length; i++) {
	    if (circles[i].xpos >= canvas.width - circles[i].radius || circles[i].xpos <= circles[i].radius) {	
	      	circles[i].xvel = -circles[i].xvel * 0.8;
	    }
	    if (circles[i].ypos >= canvas.height - circles[i].radius || circles[i].ypos < circles[i].radius) {
	    	// if (circles[i].yvel > 0) {
	    		circles[i].yvel = -circles[i].yvel * 0.8;
	    	// }
	    }
	   	if (circles[i].yvel < 50) {
	   		// circles[i].yvel = 0;
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

  	// var randomXA = Math.floor(Math.random() * 300);
  	// var randomYA = Math.floor(Math.random() * 300);
  	circles.push({
  			radius: randomR,
			xpos: 200,
		    ypos: 200,
		    xvel: randomXV,
		    yvel: randomYV,
		    xa: 0,
		    ya: 0,
		    color: 'black'
  	});
}

function engine() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);


	for ( var i = 0; i < circles.length; i++) {
  		drawCircle(i);
  	}
  	if (!paused) {
		updatePositions(circles);	
  	}
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

	// THIS ALSO WORKS AND IS GREAT
	for ( var i = 0 ; i < circles.length ; i++ ) {
		for (var j = i + 1 ; j < circles.length ; j++ ) {
			if (checkColliding(circles[i], circles[j])) {
				// resolveCollisions(circles[i], circles[j]);
			}
		}
	}
}
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var y = 20;
var tickTime = 10; // Changing this to 30 makes balls bounce forever
var circles = [];
var paused = false;


var screenWidth = document.getElementById('myCanvas').getAttribute('width');
var screenHeight = document.getElementById('myCanvas').getAttribute('height');

var addButton = document.querySelector("#add-button");
var pauseButton = document.querySelector("#pause-button");
var incrementButtonS = document.querySelector("#incrementbuttonA");
var incrementButtonM = document.querySelector("#incrementbuttonB");
var incrementButtonL = document.querySelector("#incrementbuttonC");
var resetButton = document.querySelector("#resetbutton"); 
var gravUpButton = document.querySelector("#gravityup")
var gravDownButton = document.querySelector("#gravitydown")
var gravRightButton = document.querySelector("#gravityright")
var gravLeftButton = document.querySelector("#gravityleft")
var gravDisableButton = document.querySelector("#gravitydisable")
addButton.addEventListener('click',add);
pauseButton.addEventListener('click', pause);
incrementButtonS.addEventListener('click', advanceFrame.bind(null, 1));
incrementButtonM.addEventListener('click', advanceFrame.bind(null, 10));
incrementButtonL.addEventListener('click', advanceFrame.bind(null, 20));
resetButton.addEventListener('click', function () {
	circles = [];
})
gravRightButton.addEventListener("click", addGravity.bind(null, 1200, 0));
gravLeftButton.addEventListener("click", addGravity.bind(null, -1200, 0));
gravUpButton.addEventListener("click", addGravity.bind(null, 0, -1200));
gravDownButton.addEventListener("click", addGravity.bind(null, 0, 1200));
gravDisableButton.addEventListener("click", addGravity.bind(null,1200, 0));


setInterval(engine, tickTime);	

