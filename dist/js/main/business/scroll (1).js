var $btns = $("#navi li"); 
var $boxs = $(".myScroll"); 
var len = $btns.length; 
var posArr = []; 
var baseLine = 0; 

setPos(); 

$(window).on("resize", setPos);

$btns.children("a").on("click", function(e){
    e.preventDefault(); 
    moveScroll(this);      
});

$(window).on("scroll", function(){
    var scroll = $(this).scrollTop(); 

   activateBtn(scroll);   
 });

function setPos(){
    posArr=[]; 

    for(var i=0; i<len; i++){
        posArr.push($boxs.eq(i).offset().top); 
    }   
}

function activateBtn(scroll){   
    for(var i=0; i<len; i++){
       
        if(scroll >= posArr[i] + baseLine){     
            $btns.children("a").removeClass("on");           
            $btns.eq(i).children("a").addClass("on"); 

            $boxs.eq(i).addClass("on");
            $("#business").fadeIn();
        }

        var businessTop = $("#business").offset().top;

        if(scroll >= businessTop){
            counter(".num_1", 120, 100); 
        }
    }  
 }

 function counter(el, num, time){
    var item = $(el); 
    var current_num = item.text(); //25
    var counter_num = num - current_num; 
    var interval = time/counter_num; 

    if(current_num >= num) return;

    var timer = setInterval(function(){
        current_num++; 
    
        if(current_num >= num){
            clearInterval(timer); 
        }
        item.text(current_num); 
    }, interval);
}

function moveScroll(el){
    var target = $(el).attr("href");
    var targetPos = $(target).offset().top; 
 
     $("html, body").animate({
         scrollTop: targetPos
     }, 1000); 
}

