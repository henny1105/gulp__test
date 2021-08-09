var $btns = $("#navi li"); 
var $boxs = $(".myScroll"); 
var len = $btns.length; 
var posArr = []; 
var baseLine = -300; 

// 처음 로딩시 해당 박스의 세로 위치값을 구하는 함수 호출 
setPos(); 

// 브라우저 리사이즈시 다시 세로 위치값을 갱신 
$(window).on("resize", setPos);

// navi 버튼 클릭시 자동으로 해당 위치로 이동해 주는 함수 호출  
$btns.children("a").on("click", function(e){
    e.preventDefault(); 
    moveScroll(this);      
});

// 브라우저 스크롤시 해당 스크롤 값과 박스 위치 값을 비교하여 자동으로 버튼 활성화해주는 함수 호출
$(window).on("scroll", function(){
    var scroll = $(this).scrollTop(); 

   activateBtn(scroll);   
 });

// 박스 갯수만큼 반복을 돌면서 전역변수 posArr에 세로 위치 값을 저장하는 함수
function setPos(){
    posArr=[]; 

    for(var i=0; i<len; i++){
        posArr.push($boxs.eq(i).offset().top); 
    }   
}

// 현재 스크롤 위치 값을 인수로 받아서 스크롤값과 박스의 위치를 비교해서 해당하는 버튼만 활성화시키는 함수 호출
function activateBtn(scroll){   
    for(var i=0; i<len; i++){
       
        if(scroll >= posArr[i] + baseLine){     
            $btns.children("a").removeClass("on");           
            $btns.eq(i).children("a").addClass("on"); 
            $boxs.eq(i).addClass("on");
        }

        var businessTop = $("#business").offset().top;

        if (scroll >= businessTop) {
            counter(".num_1", 120, 30);
            counter(".num_2", 90, 20);
            counter(".num_3", 50, 10);
            counter(".num_4", 100, 40);
        }
    }  
 }

 // couter 함수 호출
 function counter(el, num, time){
    var item = $(el); 
    var current_num = item.text(); 
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


 // 해당 요소의 아이디 값을 받아서 해당 박스의 세로 위치 값으로 자동 이동시켜주는 함수
function moveScroll(el){
    var target = $(el).attr("href");
    var targetPos = $(target).offset().top; 
 
     $("html, body").animate({
         scrollTop: targetPos
     }, 1000); 
}