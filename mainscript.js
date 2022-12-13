 let canvas = document.getElementById("Box");
 let ctx = canvas.getContext('2d');
  //main Rectangle
 function drawRect(x,y,w,h,color){
 ctx.fillStyle = color
 ctx.fillRect(x,y,w,h)
 }
 

//com paddle
let com ={
x:canvas.width/2 -50/2,
y:10,
width:50,
height:10,
color:"white",
score:0,

};

console.log(com.x +com.width/2)
//user paddel
let user ={
x:canvas.width/2 -50/2,
y:canvas.height - 10 -10, 
width:50,
height:10,
color:"white",
score:0,
};

//center line
function centerLine(x,y,w,h,color){
ctx.beginPath()
ctx.moveTo(0,canvas.height/2)
ctx.lineTo(canvas.width,canvas.height/2)
ctx.setLineDash([10])
ctx.strokeStyle = "white"
ctx.stroke()
};

// ball function
function drawCircle(x,y,radius,color){
ctx.beginPath()
ctx.fillStyle = color
ctx.arc(x,y,radius,0,Math.PI*2)
ctx.fill()
 };
let ball ={ 
x:canvas.width/2,
y:canvas.height/2,
radius: 10,
color:"white",
speed:1,
velocityX:5,
velocityY:5,
};
console.log(ball.x)


// score function
function scoreBox(text,x,y,color){
    ctx.fillStyle = color
ctx.font = "30px josefin sans"
ctx.fillText(text,x,y)
};




function render(){
    //main rect
drawRect(0,0,400,600,"black");
//p one
drawRect(com.x,com.y,com.width,com.height,com.color);
//p two
drawRect(user.x,user.y,user.width,user.height,user.color);
//center line
centerLine();
//ball
drawCircle(ball.x,ball.y,ball.radius,ball.color);
//com & user score
scoreBox(com.score,20,canvas.height/2  -30)
scoreBox(user.score,20,canvas.height/2  +50)
}

// controll the user paddle

canvas.addEventListener("mousemove" ,function(el){
    let rect = canvas.getBoundingClientRect();
    user.x = el.clientX - rect.left - user.width/2;
})


//collision function
function collision(b,p){
b.top = b.y - b.radius;
b.bottom = b.y + b.radius;
b.left = b.x - b.radius;
b.right = b.x + b.radius;

p.top = p.y;
p.bottom = p.y + p.height;
p.left = p.x - p.width;
p.right = p.x+ p.width;

return p.right>b.left && p.left < b.right && b.bottom > p.top && b.top < p.bottom;

};

//game over function

function showGameover(){
    canvas.style.display= "none";
    let mainBox=document.getElementById("mainBox");
    mainBox.style.direction ="none";
    let result = document.getElementsByClassName("result");
    result.style.display ="block";
};
// reset ball function

function ballRest(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 1;
    ball.velocityY = -ball.velocityY
};

//update function 

function upDate(){
    ball.x += ball.velocityX*ball.speed;
    ball.y += ball.velocityY*ball.speed;

      //controll com paddle
      let comLevel = 0.1; 
      com.x += (ball.x -(com.x + com.width/2))+ comLevel

      if(ball.speed > 2.5){
        com.x += ball.x +70
       
      }

    if(ball.x + ball.radius>canvas.width || ball.x - ball.radius<0){
        ball.velocityX = -ball.velocityX;
        
}


let p = (ball.y < canvas.height/2) ? com : user;
if(collision(ball,p)){
   ball.velocityY = -ball.velocityY; 
   ball.speed += 0.1
   
}

// ponits
if(ball.y-ball.radius <0 ){
    user.score++
    ballRest()
} else if(ball.y +ball.radius>canvas.height){
    com.score++
    ballRest()
}
// game over
if(user.score >9 || com.score > 9){
    clearInterval(loop);
    showGameover();
}
};

function start(){
render();
upDate();
};
start()

 let loop = setInterval(start,1000/50) 