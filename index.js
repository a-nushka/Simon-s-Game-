
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function(event)
{  
    if(!started)
    {
        $("#level-title").text("Level" + level);
        sequence();
        started=true;
    }
   
   
});

$(".btn").on("click",function()
{
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatepress(userChosenColor);
    checkLevel(userClickedPattern.length-1);
});

function checkLevel(currentLevel)
{
   if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
   {  
    if(gamePattern.length==userClickedPattern.length)
    
    {
        setTimeout(function()
        {
            sequence();
        },1000);
    }
  }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("You Lost! press any key to Restart!");

        setTimeout(
            function()
            {
                $("body").removeClass("game-over"); 
            } ,200);
        
            startOver();
    }
  
    
   
}

function sequence()
{    
    userClickedPattern=[];
    level++;
    
    var random=Math.floor((Math.random()*4));
    var randomChosenColor=buttonColors[random];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
    $("#level-title").text("Level " + level);
    
  

    
}



function playSound(name)
{
    var aud=new Audio("sounds/" + name +".mp3");
    aud.play();
}

function animatepress(currentColor)
{
   
   
    $("#" + currentColor).addClass("pressed");
    setTimeout(
        function()
        {
            $("#" + currentColor).removeClass("pressed");
        } ,100);
    
   
}



function startOver()
{
    level=0;
    started=false;
    gamePattern=[];
}

