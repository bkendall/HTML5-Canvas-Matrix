var backMatrix = [];
var frontMatrix = [];
var ROWS = 16;
var COLS = 16;
var WIDTH = 505;
var HEIGHT = 505;
var back_canvas;
var front_canvas;
var ctx;

function init() {

	pointer = new pointer();
	
	back_canvas = document.getElementById("back_canvas");
	front_canvas = document.getElementById("front_canvas"); 
	 
	front_canvas.addEventListener('mousedown', ev_canvas, false);
	front_canvas.addEventListener('mousemove', ev_canvas, false);
	front_canvas.addEventListener('mouseup',   ev_canvas, false);
	
	create();

}

function create() {

	ctx = back_canvas.getContext("2d");
	
	ctx.fillStyle = "black";
	ctx.fillRect (0, 0, WIDTH, HEIGHT);
	
	for(i = 0; i < COLS; i++) {
		var row = [];
		for(j = 0; j < ROWS; j++) {
			row[j] = new canvasOBJ.prototype.rectangle(i, j, 15 + 30 * i, 15 + 30 * j);
			row[j].row = j;
			row[j].col = i;
			
		}
		backMatrix[i] = row;
		frontMatrix[i] = row;
	}
	
	paintAll();

}

function pointer() {
	var p = this;
	this.started = false;
	this.color;
	
	this.mousedown = function(ev) {
		if(frontMatrix[ev._x][ev._y].color == "white") {
			p.color = "#7F7F7F";
		} else {
			p.color = "white";
		}
		
		p.started = true;
		frontMatrix[ev._x][ev._y].color = p.color;
		frontMatrix[ev._x][ev._y].animate();
	};
	
	this.mousemove = function(ev) {
		if(p.started) {
			frontMatrix[ev._x][ev._y].color = p.color;
			frontMatrix[ev._x][ev._y].animate();
		}
	};
	
	this.mouseup = function(ev) {
		if(p.started) {
			p.mousemove(ev);
			p.started = false;
		}
	};
}

function ev_canvas(ev) {

	if (ev.layerX || ev.layerX == 0) {
		xPos = ev.layerX;
		yPos = ev.layerY;
	} else if (ev.offsetX || ev.offsetX == 0) {
		xPos = ev.offsetX;
		yPos = ev.offsetY;
	}
	
	ev._x = Math.floor((xPos - 15) / 30);
	ev._y = Math.floor((yPos - 15) / 30);

	var func = pointer[ev.type];
	if(func)
		func(ev);

}

function paintAll() {
	ctx = front_canvas.getContext("2d");
	
	for(i = 0; i < COLS; i++) {
		for(j = 0; j < ROWS; j++) {
			frontMatrix[i][j].animate();
		}	
	}
}

function canvasOBJ() {}

canvasOBJ.prototype.rectangle = function(row, col, x, y) {

	this.width = 25;
	this.height = 25;
	this.col = col;
	this.row = row;
	this.x = x;
	this.y = y;
	this.color = "#7F7F7F";
	this.animate = function() {
		ctx.fillStyle = this.color;
		if(this.color == "white")
			ctx.fillRect (this.x - 1, this.y - 1, 27, 27);
		else if(this.color == "#7F7F7F")
			ctx.clearRect (this.x - 1, this.y - 1, 27, 27); 
			ctx.fillRect (this.x, this.y, 25, 25);
	};
	
};