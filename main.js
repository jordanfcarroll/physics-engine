//  TO DO 
//  1. Collision resolver is bad - make better
//  2. Friction
//  3. Make more randomX and randomY generation less bad
//  4. Fix gravity adding -- gravity object?


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

function resolveColliding(a,b) {
	correctedDistance = a.radius + b.radius;
	currentDistance = dist(a,b);
	offset = correctedDistance - currentDistance;
	var placeholder = a.xvel;
	a.xvel = b.xvel;
	b.xvel = placeholder;

	placeholder = a.yvel;
	a.yvel = b.yvel;
	b.yvel = placeholder;

	a.ypos += a.yvel * (tickTime/1000);
	a.xpos += a.xvel * (tickTime/1000);
	b.ypos += b.yvel * (tickTime/1000);
	b.ypos += b.yvel * (tickTime/1000);
}

function addGravity(x,y) {
	circles.forEach(function(value) {
		value.xa = x;
		value.ya = y;
	});
}

function checkBounds () {
	for (var i = 0 ; i < circles.length ; i++) {
		if (circles[i].xpos >= canvas.width - circles[i].radius) {
			let offset = canvas.width - circles[i].radius - circles[i].xpos;
			circles[i].xpos += offset*2;
			circles[i].xvel = Math.floor(-circles[i].xvel) * 0.8;
			if (Math.abs(circles[i].xvel) < STICKY_THRESHOLD) {
				circles[i].xvel = 0;
			}
		}

		if (circles[i].xpos <= circles[i].radius) {
			let offset = circles[i].radius - circles[i].xpos;
			circles[i].xpos += offset*2;
			circles[i].xvel = Math.floor(-circles[i].xvel) * 0.8;
			if (Math.abs(circles[i].xvel) < STICKY_THRESHOLD) {
				circles[i].xvel = 0;
			}
		}

		if (circles[i].ypos <= circles[i].radius) {
			let offset = circles[i].radius - circles[i].ypos;
			circles[i].ypos += (offset*2);
			circles[i].yvel = Math.floor(-circles[i].yvel) * 0.8;
			if (Math.abs(circles[i].yvel) < STICKY_THRESHOLD) {
				circles[i].yvel = 0;
			}
		}

		if (circles[i].ypos >= canvas.height - circles[i].radius) {
			let offset = canvas.height - circles[i].radius - circles[i].ypos;
			circles[i].ypos += offset*2;
			circles[i].yvel = Math.floor(-circles[i].yvel) * 0.8;
			// if (Math.abs(circles[i].yvel) < STICKY_THRESHOLD) {
			// 	circles[i].yvel = 0;
			// }
		}
	}   
}


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
  			radius: 50,
			xpos: randomX,
		    ypos: randomY,
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

	// THIS ALSO WORKS AND IS GREAT
	for ( var i = 0 ; i < circles.length ; i++ ) {
		for (var j = i + 1 ; j < circles.length ; j++ ) {
			if (checkColliding(circles[i], circles[j])) {
				// resolveColliding(circles[i], circles[j]);
				resolveColliding(circles[i], circles[j])
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
var STICKY_THRESHOLD = 60;


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


// setInterval(engine, tickTime);	

setInterval(function () {
	if (!paused) {
		engine();
	}
}, tickTime);

// var pt = new Date();

// requestAnimationFrame(function () {
// 	var ct = new Date();
// 	var dt = ct - pt;
// 	if (!paused) {
// 		engine(dt * timeModifier);
// 	}
// 	pt = ct;
// })