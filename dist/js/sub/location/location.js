var container = document.querySelector("#map"); //연결할 맵의 선택자
var branch_btns = document.querySelectorAll(".location_tab li"); //지점보기 버튼 선택자

var options = { 
	center: new kakao.maps.LatLng(37.51137334292228, 127.09875351584795), 
	level: 3 
};

var map = new kakao.maps.Map(container, options);
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

var markerOptions = [
    {
        title:"A-area", 
        latlng: new kakao.maps.LatLng(37.51137334292228, 127.09875351584795),
        imgSrc : 'img/marker-a.png', 
        imgSize: new kakao.maps.Size(30, 40),
        imgPos : { offset: new kakao.maps.Point(15, 40)},
        button: branch_btns[0]
    },
    {
        title:"B-area", 
        latlng: new kakao.maps.LatLng(37.51095929652477,127.09825530346042),
        imgSrc : 'img/marker-b.png', 
        imgSize: new kakao.maps.Size(30, 40),
        imgPos : { offset: new kakao.maps.Point(15, 40)},
        button: branch_btns[0]
    },
        {
        title:"C-area", 
        latlng: new kakao.maps.LatLng(37.51061790934475,127.0997563327329),
        imgSrc : 'img/marker-c.png', 
        imgSize: new kakao.maps.Size(30, 40),
        imgPos : { offset: new kakao.maps.Point(15, 40)},
        button: branch_btns[0]
    },
    {
        title:"D-area", 
        latlng: new kakao.maps.LatLng(37.51098193530768,127.09536829875793),
        imgSrc : 'img/marker-d.png', 
        imgSize: new kakao.maps.Size(30, 40),
        imgPos : { offset: new kakao.maps.Point(15, 40)},
        button: branch_btns[0]
    },
    {
        title:"A-area", 
        latlng: new kakao.maps.LatLng(37.4329261767543, 127.01840584816182),
        imgSrc : 'img/marker-a.png', 
        imgSize: new kakao.maps.Size(30, 40),
        imgPos : { offset: new kakao.maps.Point(15, 40)},
        button: branch_btns[1]
    },
    {
        title:"B-area", 
        latlng: new kakao.maps.LatLng(37.43404316467884,127.02007837826254),
        imgSrc : 'img/marker-b.png', 
        imgSize: new kakao.maps.Size(30, 40),
        imgPos : { offset: new kakao.maps.Point(15, 40)},
        button: branch_btns[1]
    },
        {
        title:"C-area", 
        latlng: new kakao.maps.LatLng(37.43172817360572,127.01601023401975),
        imgSrc : 'img/marker-c.png', 
        imgSize: new kakao.maps.Size(30, 40),
        imgPos : { offset: new kakao.maps.Point(15, 40)},
        button: branch_btns[1]
    },
    {
        title:"D-area", 
        latlng: new kakao.maps.LatLng( 37.433069969844176,127.02064306254134),
        imgSrc : 'img/marker-d.png', 
        imgSize: new kakao.maps.Size(30, 40),
        imgPos : { offset: new kakao.maps.Point(15, 40)},
        button: branch_btns[1]
    },
    {
        title:"A-area", 
        latlng: new kakao.maps.LatLng(35.853797727825054, 128.56470412578648),
        imgSrc : 'img/marker-a.png', 
        imgSize: new kakao.maps.Size(30, 40),
        imgPos : { offset: new kakao.maps.Point(15, 40)},
        button: branch_btns[2]
    },
    {
        title:"B-area", 
        latlng: new kakao.maps.LatLng(35.852596325037595, 128.5663076680611),
        imgSrc : 'img/marker-b.png', 
        imgSize: new kakao.maps.Size(30, 40),
        imgPos : { offset: new kakao.maps.Point(15, 40)},
        button: branch_btns[2]
    },
        {
        title:"C-area", 
        latlng: new kakao.maps.LatLng(35.851719704060656,128.56511711526005),
        imgSrc : 'img/marker-c.png', 
        imgSize: new kakao.maps.Size(30, 40),
        imgPos : { offset: new kakao.maps.Point(15, 40)},
        button: branch_btns[2]
    },
    {
        title:"D-area", 
        latlng: new kakao.maps.LatLng(35.85343267489908,128.5643648759452),
        imgSrc : 'img/marker-d.png', 
        imgSize: new kakao.maps.Size(30, 40),
        imgPos : { offset: new kakao.maps.Point(15, 40)},
        button: branch_btns[2]
    },

]; 

for(var i=0; i< markerOptions.length; i++){
    new kakao.maps.Marker({
        map:map,
        position:markerOptions[i].latlng,
        title: markerOptions[i].title, 
        image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
    });

    (function(index){
        markerOptions[index].button.onclick = function(e){         
             e.preventDefault(); 
                        
            for(var k=0; k<markerOptions.length; k++){
                markerOptions[k].button.classList.remove("on"); 
            }
            markerOptions[index].button.classList.add("on"); 
            moveTo(markerOptions[index].latlng); 
        }
    })(i);   
}

window.onresize = function(){
    var active_btn = document.querySelector(".location_tab.on"); //지점버튼의 활성화 선택자명
    var active_index = active_btn.getAttribute("data-index");  //해당 버튼의 data-index속성값 
    map.setCenter(markerOptions[active_index].latlng);
}

function moveTo(target){
    var moveLatLon = target; 
    map.setCenter(moveLatLon); 
}
   
setDraggable(true);
function setDraggable(draggable) {
    // 마우스 드래그로 지도 이동 가능여부를 설정합니다
    map.setDraggable(draggable);    
}

setZoomable(true); //false 
function setZoomable(zoomable) {
    // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
    map.setZoomable(zoomable);    
}