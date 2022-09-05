var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var isStart = false;

function nextSequence() {
    $("h1").html("Level " + level);
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 3 + 1);
    var randomChoosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    level++;

    
}


$("div[type=button]").click(function (e) { 
    e.preventDefault();
    var id = this.id;
    handle(id);
});

function handle(id) {
    var userClicked = id;
    userClickedPattern.push(userClicked);
    playSound(userClicked);
    animateColor(id);
    // checking 
    checkUser(userClickedPattern.length-1);
    
}




function checkUser(currenLevel) {
    if(gamePattern[currenLevel] == userClickedPattern[currenLevel]){
        console.log("success");

        if(gamePattern.length == userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 1000);

        restart();

        
    }
    
}

// $(document).keypress(function (e) { 

//     if(isStart== false){
//         nextSequence();
//         // $("h1").html("Level "+level);
//         isStart = true;
//     }

// });

$(document).click(function (e) { 
    if(isStart == false){
        nextSequence();
        isStart = true;
    }
    
});



function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animateColor(color) {
    
        $("."+color).addClass("pressed");

        setTimeout(() => {
            $("."+color).removeClass("pressed");
        }, 100);
    
}

function restart() {
    $("h1").html("Press Any to Start Again");
    level = 0;
    gamePattern = [];
    isStart = false;
    
}



