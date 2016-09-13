// JavaScript File
$(document).ready(function(){
    
    var level = 1;
    var gameSeq = [];
    var playerSeq = [];
    var isRunning = false;
    var playerTurn = false;
    
    
    
    function startGame(){
        resetGame();
        getNextColor();
        displaySeq();
    }
    
    function resetGame(){
        level = 1;
        gameSeq = [];
        playerSeq = [];
        isRunning = true;
    }
    
    function nextColor(){
    return Math.floor(Math.random() * 4);
    }
    
    function getNextColor(){
       gameSeq.push(nextColor()); 
    }
    
    function displayButton(me){
            $('.button_' + me).addClass('active');
            setTimeout(function(){
              $('.button_' + me).removeClass('active');  
            }, 500);
            
            }
        
            
        
        
    
    
    $(".testBTN").on('click', function(){
        getNextColor();
        $(".gameSeq").text(gameSeq);
        setTimeout(function() {
            gameSeq.forEach(displayButton)
        }, 500);
    });
    
    $('.zero').on('click', function(){
        playerSeq.push(0);
    });
    $('.one').on('click', function(){
        playerSeq.push(1);
    })
    $('.two').on('click', function(){
        playerSeq.push(2);
    })
    $('.three').on('click', function(){
        playerSeq.push(3);
    })
    
    
})