/* Define Canvas variables */
var canvas; 
var stage;

/* Initializing image variables */
var bckgrndImg1 = new Image();
var bckgrndImg2 = new Image();
var bg1, bg2;

var shipImg = new Image();
var ship;
//var bossImg = new Image();
//var boss;

//var enemyImg = new Image();
//var enemies	= new createjs.Container();
//var livesImg = new Image();
//var lives = new createjs.Container();
var bulletImg = new Image();
var bullets	=new createjs.Container();

/* Initializing game variables */
var bossHealth = 20;
var score; 
//used as a preloader, counts the already loaded items 
var gfxLoaded = 0; 

var centerX = 160; 
var centerY = 240; 

var timerSource; //references a setInterval method

function initializeGraphics() {
bckgrndImg1.src = 'imgs/bkgrnd1.jpg';
bckgrndImg1.name='bg1';
bckgrndImg1.onload = loadGfx;

bckgrndImg2.src = 'imgs/bkgrnd2.jpg';
bckgrndImg2.name='bg2';
bckgrndImg2.onload = loadGfx;

shipImg.src = 'imgs/ship.png'; 
shipImg.name = 'ship'; 
shipImg.onload = loadGfx; 

}

function loadGfx(e) {
	if(e.target.name = 'bg1') {
		bg1 = new createjs.Bitmap(bckgrndImg1);
	}
	if(e.target.name = 'bg2') {
		bg2 = new createjs.Bitmap(bckgrndImg2);
	}
	if(e.target.name = 'ship') {
		ship = new createjs.Bitmap(shipImg);
	}

	gfxLoaded++;
	
	if(gfxLoaded == 3) {
		stage.addChild(bg1);
		stage.addChild(bg2);
		bg1.y = -6;
		bg2.y = 486;
		
		addGameView();
	}
}

/* Ticker */
//createjs.Ticker.addEventListener("tick", addGameView);

function addGameView() {
		stage.addChild(ship);
				
		ship.alpha = 0;
		ship.x=400;
		ship.y=490;
		
		createjs.Tween.get(ship)
				.wait(1000)
				.to({alpha:1, visible:true, y: 415}, 800)
				.call(handleComplete);
				function handleComplete() {
					//Tween complete - enable ship/mouse steer
					startGame();
				}
		
} // addGameView ends

function startGame() {
	stage.addEventListener("stagemousemove", handleMouseMove);
			function handleMouseMove(e) {
				moveShip(e);
			}
	bg1.addEventListener("click", function(event) { shoot(event); });
	bg2.addEventListener("click", function(event) { shoot(event); });
	
	stage.addChild(bullets);
	
	//timerSource = setInterval('addEnemy()', 1000); 
	//stage.addChild(enemies);
				
}

function moveShip(e) {
			ship.x = e.stageX - 18.5;
}

function shoot(e) {
	var b = new createjs.Bitmap("imgs/bullets.png"); 
    b.x = ship.x + 13; 
    b.y = ship.y - 20;  	
	bullets.addChild(b);
	
	stage.update(); 
}

/*function addEnemy() { 
    var e = new createjs.Bitmap("imgs/asteroid.png"); 
    e.x = Math.floor(Math.random() * (864-50)); 
    e.y = Math.floor(Math.random() * (486-80));
    enemies.addChild(e); 
	
    stage.update(); 
}*/

function update(e) {
	bg1.y += 6; 
	bg2.y += 6; 
							
	shipImg.y = 415;
      
	if(bg1.y >= 486) { 
		bg1.y = -486; 
	} 
	else if(bg2.y >= 486) { 
	bg2.y = -486; 
	}			
	
	// Add and remove off stage bullets  
    for(var i = 0; i < bullets.children.length; i++) { 
        bullets.children[i].y -= 10; 
          
        // Remove Offstage Bullets
        if(bullets.children[i].y < - 20) { 
            bullets.removeChildAt(i); 
        } 
    }
	
	
	
	stage.update();
}

function Main() 
{ 
canvas = document.getElementById('Shooter');
stage = new createjs.Stage("Shooter");
stage.mouseEventsEnabled = true;
createjs.Ticker.setFPS(50);
//var queue = new createjs.LoadQueue(true, null, true);
createjs.Ticker.addEventListener("tick", update);  

initializeGraphics();
}
