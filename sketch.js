// Creating variables
var boy,boy_animation;
var bgimg,ground;
var junkfood,lemonjuice,protienshake;
var junkfoodGroup,lemonjuiceGroup,protienshakeGroup;
var pizza1,pizza2,burger,donut,fries,hotdog,popcorn,lemonjuice,protienshake,carrot,carrotGroup,carrotsprite;
var lemonjuiceobject,protienshakeobject,energy=4,gameState,time=0;

//canvas x=1848

function preload(){
    // Loading images
    boy_animation=loadAnimation("running1.png","running2.png","running3.png","running4.png","running5.png","running6.png","running7.png","running8.png");
    bgimg=loadImage("gym background.jpg");
    bgimg2=loadImage("endimage.jpg");
    bgimg3=loadImage("WELCOME screen.jpg")
    pizza1=loadImage("pizza1.png");
    pizza2=loadImage("pizza2.png");
    burger=loadImage("burger.png");
    donut=loadImage("donut.png");
    fries=loadImage("fries.png");
    popcorn=loadImage("popcorn.png");
    hotdog=loadImage("hotdog.png")
    lemonjuice=loadImage("lemonjuice.png");
    protienshake=loadImage("protienshake.png");
    carrot=loadImage("carrot1.jpg");
}

function setup(){
    // Creating the canvas
    createCanvas(1264,721);

    // Adding background image
    background1=createSprite(632,360.5,1,1);
    background1.addImage(bgimg);
    background1.velocityX=-7;

    // Creating the runner :)
    boy=createSprite(300,681,40,40);
    boy.addAnimation("adding animation",boy_animation);
    boy.scale=0.7;
    //boy.debug=true;

    // Creating the ground
    ground=createSprite(632,721,width,10);

    // Creating groups
    junkfoodGroup=createGroup();
    lemonjuiceGroup=createGroup();
    protienshakeGroup=createGroup();
    carrotGroup=createGroup();

    // setting collider radius
    boy.setCollider("rectangle",0,0,70,boy.height);

    gameState="wait";
}

function draw(){

     //background(bgimg2);

     if(gameState==="wait"){
        background(bgimg3)
     }else{
         background(bgimg2)
     }
     if(keyCode===75 && gameState==="wait"){
         gameState="play"
     }

    if(gameState==="play"){

    if (background1.x < 0){
        background1.x = background1.width/2;
    }
    //console.log(background1.width);

    if((keyDown("SPACE")) && boy.y >= 580){
        boy.velocityY=-13;
    }
    boy.velocityY=boy.velocityY+0.89
    boy.collide(ground);

    if(junkfoodGroup.isTouching(boy)){
        energy=energy - 1
        junkfoodGroup.destroyEach();
    }
    if(lemonjuiceGroup.isTouching(boy)){
        energy=energy + 1
        lemonjuiceGroup.destroyEach();
    }
    if(protienshakeGroup.isTouching(boy)){
        energy=energy + 2
        protienshakeGroup.destroyEach();
    }
    if(carrotGroup.isTouching(boy)){
        energy=energy+3
        carrotGroup.destroyEach();
    }

    // calling functions
    junkfoodspawn();
    lemonjuicespawn();
    protienshakespawn();
    carrotspawn();

    if(frameCount%24===0){
        time=time+1;
    }

    drawSprites();
    stroke(0)
    fill(0)
    strokeWeight(3)
    textSize(34)
    text("TIME : " + time,1050,150)
    text("ENERGY : " + energy, 1050,100)

    if(energy<=0){
        gameState="end";
    }
}

// Condition when the game ends

if(gameState==="end"){
    fill(65,94,174)
    textFont("Comic Sans MS")
    textSize(70);
    text("TIME LASTED= "+ time +" SECONDS",150,670)
}
}

// defining functions
function junkfoodspawn(){
    if(frameCount%80===0){
        junkfood=createSprite(1748,560,1,1);
        junkfood.y=Math.round(random(665,680));
        junkfood.velocityX=-40;
        //junkfood.debug=true
        var count=Math.round(random(1,7))
        if(count===1){
            junkfood.setCollider("rectangle",0,0,300,300);
            junkfood.scale=0.17
            junkfood.addImage(pizza1);
        }else if(count===2){
            junkfood.setCollider("rectangle",0,0,140,140);
            junkfood.scale=0.47
            junkfood.addImage(pizza2);
        }else if(count===3){
            junkfood.scale=0.4
            junkfood.addImage(burger);
        }else if(count===4){
            junkfood.scale=0.13
            junkfood.addImage(donut);
        }else if(count===5){
            junkfood.scale=0.33
            junkfood.addImage(fries);
        }else if(count===6){
            junkfood.scale=0.25
            junkfood.addImage(popcorn);
        }else if(count===7){
            junkfood.scale=0.23
            junkfood.addImage(hotdog);
        }
        if(frameCount%1000===0){
            junkfood.velocityX=junkfood.velocityX -20
        }
        junkfoodGroup.add(junkfood);
    }
}

function lemonjuicespawn(){
    if(frameCount%680===0){
        lemonjuiceobject=createSprite(1648,349,1,1)
        lemonjuiceobject.scale=0.3;
        lemonjuiceobject.velocityX=-17;
        lemonjuiceobject.addImage(lemonjuice);
        lemonjuiceGroup.add(lemonjuiceobject)
    }
}

function protienshakespawn(){
    if(frameCount%1090===0){
        protienshakeobject=createSprite(1648,339,1,1)
        protienshakeobject.scale=0.2;
        protienshakeobject.velocityX=-17;
        protienshakeobject.addImage(protienshake);
        protienshakeGroup.add(protienshakeobject)
    }
}

function carrotspawn(){
    if(frameCount%10===0){
        carrotsprite=createSprite(1648,339,1,1);
        carrot.velocityX=-17;
        carrotsprite.scale=0.8;
        carrotsprite.addImage(carrot);
        carrotGroup.add(carrotsprite)
    }
}