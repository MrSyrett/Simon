$(document).ready(function(){
    

var Game=(function(){
  var colors=$("#board .colorBTN");
  var sequence=[];
  var playerSequence=[];
  var audio = [];
  var difficulty = 20;
  audio[0] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
  audio[1] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
  audio[2] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
  audio[3] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
  var audioWin = new Audio('https://www.dropbox.com/s/b08q4h3i9m6k1f7/win.mp3?dl=1');
  var audioPowerOn = new Audio('https://www.dropbox.com/s/i0g9zunlyzhljwb/poweron.mp3?dl=1');
  var audioLose = new Audio('https://www.dropbox.com/s/ud4fafa7uifk7ah/loseSimon.mp3?dl=1');
  audioLose.volume = 0.5;
  var strict = false;
  var lives = 3;
  var livesMemory;

     $("#Strict").on('click', function(){
      if (strict === false){
        $(this).removeClass('btn-danger');
        $(this).addClass('btn-success');
        livesMemory = lives;
        lives = 0;
        $(".lives").text(lives);
        strict = true;
      } else {
        $(this).addClass('btn-danger');
        $(this).removeClass('btn-success');
        lives = livesMemory;
        $(".lives").text(lives);
        strict = false;
      }
      
     });
 

  function init(){
    makeColorsClickable();
    $(".Start").on('click',start);
  }
  function start(){
    $(".output").text(sequence.length);
    lives = 3;
    $(".lives").text(lives);
    sequence=[];
    playerSequence=[];
    addNextColor();
    showSequence();
  }
  function makeColorsClickable(){
    colors.on('click',function(){
      highlight.call(this);
      playerSequence.push($(this).index("#board .colorBTN"));
      checkPlayerSequence();
    });
  }
  function checkPlayerSequence(){
    if(playerSequence.join('')!=sequence.slice(0,playerSequence.length).join('')) {
      if (lives === 0){
      $(".output").text(":(");
      audioLose.play();
      return false; 
      } else {
        lives --;
        $(".lives").text(lives);
        playerSequence = [];
        setTimeout(function() {
         showSequence();   
        }, 500);
        
        checkPlayerSequence();
        
      }
      
    } else if(playerSequence.length==sequence.length) {
      if (sequence.length === difficulty){
         $(".output").text(":)");
          audioWin.play();
          return false;
      } else {
      $(".output").text(sequence.length)
      addNextColor();
      playerSequence=[];
      setTimeout(showSequence,1000);
      return true;
      }
    }
  }
  function addNextColor(){
    sequence.push(Math.floor(Math.random()*4));
  }
  function highlight(){
    $(this)
      .addClass('active');
      var x = parseInt($(this).attr('id'));
    audio[x].play();
    setTimeout(unhighlight.bind(this),400);
  }
  function unhighlight(){
    $(this)
      .removeClass('active');
  }
  function showSequence(){
    for(var i=0;i<sequence.length;i++) {
      setTimeout(highlight.bind(colors.eq(sequence[i])),i*750);
    }
  }
  return {
    init:init,
    start:start};
})();

Game.init();
Game.start();



})
