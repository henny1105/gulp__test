// 스킵네비
var $skipNavi = $("#skipNavi").children("li").find("a");

$skipNavi.on("focusin", function(){
    $(this).addClass("on");
});

$skipNavi.on("focusout", function(){
    $(this).removeClass("on");
});

// btnCall
var btnCall = document.querySelector(".btnCall");
var menuMo = document.querySelector(".menuMo");

btnCall.onclick = function(){
    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
} 

// btnCall_fullscreen

var btnCall_fullsreen = document.querySelector(".menu_right .menu_button");
var btnCall_close_fullsreen = document.querySelector(".menuWeb_fullsreen .fa-times ");
var menuWeb_fullsreen = document.querySelector(".menuWeb_fullsreen");


btnCall_fullsreen.onclick = function(){
    btnCall_fullsreen.classList.toggle("on");
    menuWeb_fullsreen.classList.toggle("on");
} 

btnCall_close_fullsreen.onclick = function(){
    btnCall_fullsreen.classList.toggle("on");
    menuWeb_fullsreen.classList.toggle("on");
} 

// gnb 메뉴
var $gnb_li = $("#gnb>li");     

$gnb_li.on("mouseenter", function(){
    $(this).find(".sub").show();
});

$gnb_li.on("mouseleave", function(){
    $(this).find(".sub").hide();
});

//gnb_li의 갯수만큼 반복을 돌면서 이벤트 연결
$gnb_li.each(function(index){

    //gnb_li의 (index)번째 요소에 foucsin이벤트 연결
    $gnb_li.eq(index).find("a").first().on("focusin", function(){
        $gnb_li.eq(index).find(".sub").show();
    });

    

    //gnb_li의 (index)번째 요소에 focusout이벤트 연결
    $gnb_li.eq(index).find("a").last().on("focusout", function(){
        $gnb_li.eq(index).find(".sub").hide();      
    });
});