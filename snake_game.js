
//  myWindow.resizeTo(250, 250);
// function zoomOut()
// {
//     var Page = document.getElementsByTagName('Body');
//     var zoom = parseInt(Page.style.zoom) - 30 +'%'
//     Page.style.zoom = zoom;
//     console.log(zoom)
//     return false;
// }


function init(){
    canvas=document.getElementById("mycanvas")
    // zoomOut()
    H=canvas.height=1000
    W=canvas.width=1000
    pen = canvas.getContext('2d')
    curr_Width=document.clientWidth;
    document.styleSheets.width=(curr_Width-100)+'px'
    // pen.fillStyle='blue'
    cs = 67
    game_over=false;
    //Initial Score
    score=0;
    trophy_img=new Image()
    trophy_img.src="Assets/trophy.png"
    

    food=get_random_food()
    //food image
    food_img = new Image();
    food_img.src="Assets/apple.png"   
    snake={
      init_len:4,//initial length of snake
      color:'blue',//color
      cells:[],//cells that snake would take
      direction:"right",
      create_snake:function(){
          for(var i=this.init_len;i>0;i--){
              this.cells.push({x:i,y:0})
          }//cells=[{5,0},{4,0},{3,0},{2,0},{1,0}]
      },
      drawSnake:function(){
          for(var i=0;i<this.cells.length;i++){
            pen.fillStyle=this.color;
            pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2)
          }
         
      },
      update_snake:function(){
          //if snake eats the food then inc the length of snake
          
          
          
          headX = this.cells[0].x //curr X position of head of snake
          headY = this.cells[0].y //curr Y position of head of snake
          
          if(headX == food.x && headY == food.y){
              food = get_random_food()
              //food consume audio will play when snake consume foods
            //   var audio = new Audio('food_consume.wav');
            //   audio.play();
              score++;
          }
          else{
            this.cells.pop()
          }
          var newX,newY;
          if(this.direction=='right'){
              newX=headX+1;
              newY=headY
          }
          else if(this.direction == 'left'){
            newX=headX-1;
            newY=headY
          }
          else if(this.direction == 'down'){
            newX=headX;
            newY=headY+1;
          }
          
          else{
            newX=headX;
            newY=headY-1;
          }
          this.cells.unshift({x:newX,y:newY});
          var last_X =Math.round(W/cs);//last X coordinate of grid
          var last_Y =Math.round(H/cs);// "   Y   "        "  "  
          // snake touches the boundary of the maze
          if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>last_X || this.cells[0].y>last_Y){
                game_over=true;
          }
        //   console.log(this.cells)
          

      }
        
    };

    snake.create_snake();
    //-----------Event Listner----------
    function key_pressed(k){
        // console.log("key_pressed ",k.key)
        if(k.key == "ArrowRight"){
            snake.direction = "right"
        }
        else if(k.key == "ArrowLeft"){
            snake.direction = "left"
        }
        else if(k.key == "ArrowUp"){
            snake.direction = "up"
        }
        else if(k.key == "ArrowDown") {
            snake.direction = "down"
        }
        console.log(snake.direction)
    }
    document.addEventListener('keydown',key_pressed)
}

function draw(){
    pen.clearRect(0,0,W,H) //erase old frame
    snake.drawSnake()

    pen.fillStyle= food.color
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs)
  
    //scoring
    pen.fillStyle="black"
    pen.drawImage(trophy_img,10,10,cs,cs);
    pen.font="50px Arial"
    pen.fillText(score,100,50)



}
function update(){
    snake.update_snake()

}
function get_random_food(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);// generates a random number between of board size and cs
    var foodY = Math.round(Math.random()*(H-cs)/cs);
    var food={
        x:foodX,
        y:foodY,
        color:"red"
    }
    return food;

}
function game_loop(){
    if(game_over==true){
        clearInterval(f)
        alert("Game Over! Your score is "+score)
        location.reload();
    }
    draw()
    update();

}

init()
var f=setInterval(game_loop,110)