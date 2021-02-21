
function clock(){
    let clock = document.querySelector(".clock");
    let curDate = new Date();
    let curHour = curDate.getHours();
    let curMinute = curDate.getMinutes();
    let curSecond = curDate.getSeconds();
    clock.innerHTML = `${curHour < 10 ? `0${curHour}` : curHour} : ${curMinute < 10 ? `0${curMinute}` : curMinute} : ${curSecond < 10 ? `0${curSecond}` : curSecond}`;
}


function init(){
    clock();
    setInterval(clock, 1000);
}

init();
