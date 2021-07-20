// counter 

counter(".num_1", 120, 500); 
counter(".num_2", 90, 1000);
counter(".num_3", 50, 700);
counter(".num_4", 100, 1200);


function counter(el, num, time){
    var item = $(el); 
    var current_num = item.text(); //25
    var counter_num = num - current_num; 
    var interval = time/counter_num; 

    var timer = setInterval(function(){
        current_num++; 
    
        if(current_num == num){
            clearInterval(timer); 
        }
        item.text(current_num); 
    }, interval);
}