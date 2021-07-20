// clock
setInterval(showTime, 1000);

function showTime(){
    var today = new Date();

    var month = today.getMonth() + 1;
    var date = today.getDate();
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();

    var result_month = plusZero(month);
    var result_date = plusZero(date);
    var result_hr = getHr(hour).hr;
    var result_min = plusZero(min);
    var result_sec = plusZero(sec);

    $(".month").text(result_month);
    $(".date").text(result_date);
    $(".hr").text(result_hr);
    $(".min").text(result_min);
    $(".sec").text(result_sec);
}

function getHr(hour){    

    if(hour < 12){ 
        (hour < 10)? hour = "0" + hour : hour;
    
        var result = {
            hr: hour,
            day: "am"
        }
        return result;
    
    }else {
        hour = hour - 12;
        (hour < 10)? hour = "0" + hour : hour;
    
        var result = {
            hr : hour,
            day : "pm"
        }
        return result;
    }
}

function plusZero(time){
    (time < 10 ) ? time = "0" + time : time;
    return time;
}