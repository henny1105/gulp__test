(function($){
   $.defaults = {      
       count: 10
   }

   $.fn.myYoutube = function(option){
       var result_opt = $.extend({}, $.defaults, option);

       if(result_opt.key == undefined || result_opt.playList == undefined){
           console.error("key와 playList는 필수입력사항입니다.");
       }

       new Youtube(this, result_opt);
       return this;
   }

   function Youtube(el, option){
       this.init(el,option);
       this.bindingEvent();
   } 

   Youtube.prototype.init = function(el, opt){
       this.frame = el; 
       this.key = opt.key;
       this.playList = opt.playList;
       this.count = opt.count;
   }
   
   Youtube.prototype.bindingEvent= function(){
       this.callData();
   
       $("body").on("click", "article a", function(e){
           e.preventDefault();
           var vidID = $(e.currentTarget).attr("href");
           this.createPop(vidID);
       }.bind(this));
   
       $("body").on("click", ".pop .close", function(e){
           e.preventDefault();
           this.removePop();
       }.bind(this));
   }
   Youtube.prototype.callData= function(){
       $.ajax({
           url: "https://www.googleapis.com/youtube/v3/playlistItems",
           dataType: "jsonp",
           data: {
               part: "snippet",
               key: this.key,
               playlistId: this.playList,
               maxResults: this.count
           }
       })
       .success(function(data){
           var items = data.items;  
           this.createList(items);
       }.bind(this))

       .error(function(err){
           console.error(err);
       })
   }
   Youtube.prototype.createList= function(items){
       $(items).each(function(index, data){  
           var tit = data.snippet.title;
           var txt = data.snippet.description;          
           var date = data.snippet.publishedAt.split("T")[0];
           var imgSrc = data.snippet.thumbnails.high.url;
           var vidId = data.snippet.resourceId.videoId;
   
           if(txt.length > 200) {
               txt= txt.substr(0, 200)+"...";
           }else {
              txt
           }

           if(tit.length > 85){
            tit = tit.substr(0, 85)+"...";
           }else {
              tit
           }
   
           this.frame
            .append(
               $(".youtube .inner")
                  .append(
                    $(".youtube_box")
                    .append(
                       $("<article>")
                           .append(
                               $("<a class='pic'>")
                                   .attr({ href: vidId })
                                   .css({ 
                                      backgroundImage: "url("+imgSrc+")",                                       
                                   }),
                               $("<div class='con'>")
                                   .append(
                                       $("<span>").text(date),
                                       $("<h2>").text(tit),
                                       $("<p>").text(txt)
                                   )
                           )
                   )
                  )
                  .append(
                      $(".youtube_sub")
                  )
            )
       
       }.bind(this))
   }

   Youtube.prototype.createPop = function(vidID){
       $("body")
           .append(
               $("<aside class='pop'>")
                   .append(
                       $("<img src='img/loading-3.gif'>")
                   )
                   .append(
                       $("<div class='con'>")
                           .append(
                               $("<iframe>")
                                   .attr({
                                       src: "https://www.youtube.com/embed/" + vidID,
                                       width: "100%",
                                       height: "100%",
                                       frameborder: 0,
                                       allowfullscreen: true
                                   })
                           )
                           .append(
                               $("<h2>").text("Lorem ipsum dolor sit amet."),
                               $("<p>").text("Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum placeat deserunt illo corporis natus ab odit laboriosam eveniet accusantium et?")
                           )
                   )
                   .append(
                       $("<a href='#' class='close'>")
                           .text("close")
                   ).fadeIn()
           );
   
           setTimeout(function(){
               $(".pop .con").fadeIn(500, function(){
                   $(".pop > img").remove();
               })
           }, 1500);
   
   }
   Youtube.prototype.removePop= function(){
       $(".pop").fadeOut(500,function(){
           $(this).remove();
       })
   } 

})(jQuery);

