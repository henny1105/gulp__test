(function($){
    $.default = {
       btn : "dt",
       boxs : "dd",
       active :"on",
       speed : 500
    }
 
    $.fn.myToggle = function(opt){
       opt = $.extend({}, $.default, opt);
 
       new Toggle(this, opt); 
       return this; 
    }
 
    function Toggle(selector, opt){
       this.init(selector, opt); 
       this.bindingEvent(); 
    }
    
    Toggle.prototype.init = function(selector, opt){
       this.$frame = selector; 
       this.$btns = this.$frame.find(opt.btn); 
       this.$boxs = this.$frame.find(opt.boxs);
       this.active = opt.active; 
       this.speed = opt.speed; 
    }
    
    Toggle.prototype.bindingEvent = function(){
       var self = this; 
       self.$btns.on("click",function(e){
          e.preventDefault();    
         // console.log(e); 
          self.activation(e.currentTarget);         
       });
    }
     
    Toggle.prototype.activation = function(self){
       var isOn = $(self).hasClass(this.active); 
        
       this.$btns.removeClass(this.active);
       this.$boxs.slideUp(this.speed); 
    
       if(isOn){
          this.btn.removeClass(this.active); 
          this.boxs.slideUp(this.speed); 
          return; 
       } 
       $(self).addClass(this.active); 
       $(self).next().slideDown(this.speed); 
        
    }
 })(jQuery); 
