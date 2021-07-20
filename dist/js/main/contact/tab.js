// tab

var $frame = $(".qna"); 
var $tab_btns = $frame.find("dt"); 
var $tab_boxs = $frame.find("dd");  
var enableClick = true;  
 
$tab_btns.on("click",function(e){
   e.preventDefault(); 
 
   if(enableClick){
      activation(this);
      enableClick = false; 
   }
});
 
function activation(self){
   var isOn = $(self).hasClass("on"); 
    
   $tab_btns.removeClass("on");
   $tab_boxs.slideUp(500); 
 
   if(isOn){
      $(self).removeClass("on"); 
      $(self).next("dd").slideUp(500, function(){
         enableClick = true; 
      }); 
   }else{
      $(self).addClass("on"); 
      $(self).next().slideDown(500,function(){
         enableClick = true; 
      }); 
   }
}