//오늘하루 그만보기 체크한 경우 생기는 쿠키이름
var isCookie = document.cookie.indexOf("popup=done"); 
console.log(isCookie); 

if(isCookie == -1){
    console.log("쿠키없음"); 
    $("#popup").show(); 
}else{
    console.log("쿠키있음"); 
    $("#popup").hide(); 
}

//페이지를 로딩하자마자 팝업 함수 실행 
createPop({
    name: "#popup",
    data_url: "data/pop.html",
    isMask: false,
    isCk: true,
    custom_css: {
        width: 400,
        background: "#fff",
        boxSizing: "border-box",
        padding: 40,
        color: "#222",
        display: "flex"
    }
});

//팝업의 클로즈버튼 클릭시 팝업 제거 
$("body").on("click", "#popup .close", function(e){
    e.preventDefault(); 
    removePop(this); 
});

//팝업제거 함수 정의 
function removePop(el){
    //오늘하루 그만 보기 체크되어 있는지 값을 담음 
    var isChecked = $(el).prev().find("input[type=checkbox]").is(":checked"); 
    // 생성된 팝업의 아이디값을 가져와서 담음 
    var id_name = $(el).parent().attr("id"); 

    //체크되어 있다면 쿠키생성 
    if(isChecked) setCookie(id_name, "done", 1);

    //팝업은 은은히 사라지게 하고 완전히 제거 
    $(el).parent().fadeOut(500, function(){
        $(this).remove(); 
    }); 

    $(".mask").fadeOut(500, function(){
        $(this).remove(); 
    })
}

//팝업생성함수 
function createPop(opt){
    //디폴트 옵션 설정
    var def_opt = {
        name: "#popup",
        data_url: "data/error.html",
        isMask: false,
        isCk: false,
        custom_css: undefined
    }

    //상단에서 팝업생성함수 실행시 옵션값과 합쳐서 최종 옵션값 지정 
    var opt = Object.assign({}, def_opt, opt);

    //opt.isMask값에 따라 배경 막을 생성 유무 결정 
    if(opt.isMask){
        $("body")
            .append(
                $("<div class='mask'>")
                    .css({
                        width: "100%",
                        height: "100vh",
                        background: "rgba(0,0,0,0.3)",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        display: "none",
                        zIndex: 9
                    }).fadeIn()
            )
    }

    //css 최종 설정 담는 변수
    var result_css; 

    //css 기본 설정값 
    var def_css = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        display: "none",
        zIndex: 10
    }
 
    //만약 createPop 함수실행시 옵션값이 없다면 
    if(opt.custom_css == undefined){
        //기본설정값으로 css 설정 
        result_css = def_css; 
    }else{
        //함수실행시 css옵션값 있다면 합쳐서 최종 옵션 지정 
        result_css = Object.assign({}, def_css, opt.custom_css); 
    }

    //createPop 함수의 옵션값 중 id_name에 #popup에서 #을 빼는 코드 
    var id_name = opt.name.split("#")[1]; 

    //body에 팝업 넣기 
    $("body").append(
        $("<aside>")
            .css(result_css) //옵션의 css 적용 
            .attr("id", id_name) //옵션의 id_name 적용 
            .append(
                $("<img src='img/popup.png'>")
            )
            .append(
                $("<div class='content'>"),
                $("<div class='wrap'>")
                    .append(
                        $("<input type='checkbox'>"),
                        $("<label>").text("오늘 하루 그만 보기")
                            .css({
                                font: "13px/1 '맑은 고딕'",
                                marginLeft: 10
                            })
                    ),
                $("<a class='close'>")
                    .append(
                        $("<img src='img/close_button.png'>")
                            .css({
                                width: 40,
                                position: "absolute",
                                top: 0,
                                right: 5
                            })
                    )
                    .css({
                        float: "right",
                        cursor: "pointer",
                        font: "13px/1 '맑은 고딕'"
                    })
            ).fadeIn()
    )

    //isCk값에 따라서 체크박스 wrap을 생성 유무 결정 
    if(!opt.isCk) $(opt.name).find(".wrap").hide(); 

    // content에 들어갈 데이터 연결 
    $.ajax({
        url:opt.data_url
    })
    .success(function(data){
        $(opt.name).find(".content").html(data); //환영합니다 데이터 
    })
    .error(function(err){
        console.log(err); // error.html의 오류구문 보여줌 
    })
}

//쿠키생성 함수 정의 - date/minutes 등 원하는 시간별로 설정
function setCookie(cookieName, cookieVal, time){
    var today = new Date(); 
    var date = today.getDate(); 

    today.setDate(date + time); 
    var duedate = today.toGMTString(); 

    //쿠키생성코드
    document.cookie = cookieName +"="+ cookieVal +"; path=/; expires="+ duedate;
}