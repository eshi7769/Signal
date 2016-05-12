canvas = document.getElementById('signals');
context = canvas.getContext('2d');

var initialClick = false; //has an object been clicked
var timelimit = 15; //time in seconds before the game resets
var time = 0; 
var numSignals = 10;
var signalSpeed = 1;
var mousex = 0;
var mousey = 0;
var smallpic = 25;
var zoompic = 40;
var coverImage = 'https://i1348.photobucket.com/albums/p729/memuir/fishsilver_zpslomewgek.jpg'; // the default image for all signals
var pathImage = 'https://i1348.photobucket.com/albums/p729/memuir/krakengold_zpsqiktxvkb.jpg';
var signalsArray = []; //array of signals that is populated using init_signals
var staticArray = []; //array of clicked signals that remain static
var divArray = [];

var distractSound = 'http://www.wavsource.com/snds_2016-05-01_4314756582760307/sfx/blurp_x.wav';
var pathsound = 'http://www.wavsource.com/snds_2016-05-01_4314756582760307/sfx/bloop_x.wav';

function timer(){
time++;
}

canvas.addEventListener('click', clicked);
canvas.addEventListener('mousemove', mousein);


function mousein(e){
	mousex = e.clientX;
  mousey = e.clientY;
};

function clicked(e){
	initialClick = true;
  time = 0;
	var x = e.clientX;
  var y = e.clientY;
  if(collision(x, y)){
  var temp = collision(x,y);
  console.log(collision(x,y));
  clickedSignal(collision(x,y));
  var sound = new Audio(signalsArray[temp].playsound);
  sound.play();
  };
}

function collision(x, y){
	for(sigs in signalsArray){
 		if((x >= signalsArray[sigs].x && 
    	x <= signalsArray[sigs].x + signalsArray[sigs].width) && 
      ((y >= signalsArray[sigs].y) && 
      (y <= signalsArray[sigs].y + signalsArray[sigs].height))
    ){
    		signalsArray[sigs].drawImage = signalsArray[sigs].signalImage;
    		return sigs;
  	};
  }  
}

function clickedSignal(sig){
	//signalsArray[sig].width = smallpic;
  //signalsArray[sig].height = smallpic;
	staticArray.push(signalsArray[sig]);
	signalsArray.splice(sig, 1);
}

function hoverOn(){
	var x = mousex;
  var y = mousey;
	
	for(sigs in signalsArray){
 		if((x >= signalsArray[sigs].x &&
    	x <= signalsArray[sigs].x + signalsArray[sigs].width) && 
      ((y >= signalsArray[sigs].y) && 
      (y <= signalsArray[sigs].y + signalsArray[sigs].height))
    ){
    	signalsArray[sigs].width = zoompic;
      signalsArray[sigs].height = zoompic;
      signalsArray[sigs].drawImage = signalsArray[sigs].signalImage;

      //var sound = new Audio(signalsArray[sigs].playsound);
			//sound.play();
      //sound.pause();

  	} else {
    	signalsArray[sigs].width = smallpic;
      signalsArray[sigs].height = smallpic;
    	signalsArray[sigs].drawImage = coverImage;
    };
  }
};



function Signal(x, y, width, height, speed, image, sound) {

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.signalImage = image;
  this.drawImage = coverImage;
  this.signalSound = sound;
  this.playsound = distractSound;
  this.speed = speed;

  this.draw = function() {
		var sig = new Image();
		sig.src = this.drawImage;
  	context.drawImage(sig, this.x, this.y, this.width, this.height);
  };

  this.update = function() {
    if (this.y > canvas.height) {  
      this.y = -50;
      this.x = 20 + Math.random() * canvas.height/2;      
    } else {
      this.y += signalSpeed;
    }
  };
  
}

function init_signals(numSigs, mypic, mysound) {
  for (var iter = 0; iter < numSigs; iter++) {
  	var xpos = 20 + Math.random() * canvas.width;
  	var ypos =  0 - canvas.height/10 * iter;
    signalsArray[iter] = new Signal(xpos, ypos, smallpic, smallpic, signalSpeed, mypic, mysound);  	
  }
}



function update() {
	
  hoverOn();
	if(initialClick == true && time == timelimit){
  	//clicks = false;
  	//signalsArray = [];
  	reset();
  }
	if(signalsArray.length == 0){
  	reset();
  };
  for (var iter = 0; iter < signalsArray.length; iter++) {
    signalsArray[iter].update();
  }
}

function drawpath(sigArray){
	if(sigArray.length > 1){
  var iter1 = 1;
  	for(var iter = 0; iter1 < sigArray.length; iter++){
    context.lineWidth = 2;
  	context.strokeStyle = 'yellow';
  	context.beginPath();
		context.moveTo(sigArray[iter].x + sigArray[iter].width/2, sigArray[iter].y + sigArray[iter].height/2);
		context.lineTo(sigArray[iter1].x + sigArray[iter].width/2, sigArray[iter1].y + sigArray[iter].height/2);
		context.stroke();
    iter1++;
    }
  }
}

function draw() {
  canvas.width = canvas.width;
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (var iter = 0; iter < signalsArray.length; iter++) {
    signalsArray[iter].draw();
  };
  for (var iter = 0; iter < staticArray.length; iter++) {
    staticArray[iter].draw(); 
  };
  drawpath(staticArray);
}

function reset(){
	initialClick = false;
  time = 0;
	signalsArray = [];
	staticArray = [];
	init_signals(numSignals, pathImage);
}

function game_loop() {
  update();
  draw();
}

init_signals(numSignals, pathImage, pathsound);
setInterval(timer, 1000);
setInterval(game_loop, 30);
