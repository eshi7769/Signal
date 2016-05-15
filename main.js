var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var nameText = "This is where the name goes"
canvas.addEventListener("click", handleClicks);

var sources = new Array();
sources.push('http://i.imgur.com/Ws5hm2g.jpg');	//main menu image

var pictureA = new Image();
pictureA.X = 600; 
pictureA.Y = 600;
pictureA.width = 600;
pictureA.height = 600;
pictureA.src = sources[0];

var mainmenu = true;
var options = false;
var volumelevel = 3;
var BgMusic = new Audio("Unknown Planet.mp3");  //background music
var clickMusic = new Audio("C.mp3");			//on click music
var textPositionX = pictureA.width / 2;
var textPositionY = pictureA.height + 10;

//handles all the click interactions
function handleClicks(eventParams) {
  nameText = "X: " + eventParams.clientX + " Y: " + eventParams.clientY; //gets click position
  if(mainmenu == true){
	if(eventParams.clientX > 385 && eventParams.clientY > 310 && eventParams.clientX < 505
	&& eventParams.clientY < 340){
			clickMusic.play();
			mainmenu = false;
	}
	if(eventParams.clientX > 390 && eventParams.clientY > 390 && eventParams.clientX < 495
	&& eventParams.clientY < 415){
			clickMusic.play();
			mainmenu = false;
			options = true;
	}
  }
  if(options == true){
	  if(eventParams.clientX > 60 && eventParams.clientY > 70 && eventParams.clientX < 110
	&& eventParams.clientY < 90){
		if(volumelevel>0){
			volumelevel--;
		}
	}
	if(eventParams.clientX > 130 && eventParams.clientY > 70 && eventParams.clientX < 190
	&& eventParams.clientY < 90){
		if(volumelevel<10){
		volumelevel++;
		}
	}
	if(eventParams.clientX > 60 && eventParams.clientY > 540 && eventParams.clientX < 115
	&& eventParams.clientY < 560){
		clickMusic.play();
		options = false;
		mainmenu = true;
	}
  }
  if(options == false && mainmenu == false){
	  if(eventParams.clientX > 60 && eventParams.clientY > 540 && eventParams.clientX < 115
	&& eventParams.clientY < 560){
		clickMusic.play();
		options = false;
		mainmenu = true;
	}
  }
}
function draw(){

	if (mainmenu == true && options == false){
	 context.drawImage(pictureA, 0, 0 , 600, 600); 
	 context.font = "12px Verdana";
	 context.fillStyle = "white";
	 context.fillText(nameText, 10, 10);
	 }
	 if (mainmenu == false && options == false){
			context.fillStyle = "white";
 			context.fillRect(0, 0, 600, 600); //code for new game here
			context.fillStyle = "black"
			context.font = "24px Verdana";
			context.fillText("Game Goes Here", 300, 300);
			context.fillText("Back", 50, 550);
 	}
  if(options == true && mainmenu == false){
	  
  		context.fillStyle = "white";
  		context.fillRect(0, 0, 600, 600);
		context.font = "12px Verdana";
		context.fillStyle = "black";
		context.fillText(nameText, 10, 10);
		context.font = "24px Verdana";
		context.fillText("Sound:" + volumelevel, 50, 50);
		context.fillText("Less", 50, 80);
		context.fillText("More", 120 , 80);
		context.fillText("Back", 50, 550);
      
  }
 
}

function update(){
	BgMusic.play();
	BgMusic.volume = 0.1 * volumelevel;
	if(volumelevel == 0){
		clickMusic.volume = 0;
	}
	else{
	clickMusic.volume = 0.3;
	}
}

function game_loop() {
  update();
  draw();
}

setInterval(game_loop, 30);