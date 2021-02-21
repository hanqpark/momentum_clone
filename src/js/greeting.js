const nameForm = document.querySelector(".name"),
    nameInput = nameForm.querySelector("input"),
    greeting = document.querySelector(".greetings"),
    greeting_clock = document.querySelector('.clock'),
    USER_LS = "currentUser",
    SHOWING_CN = "showing";


function saveName(name){
    localStorage.setItem(USER_LS, name);
}


function handleSubmit(event){
    event.preventDefault();
    const curVal = nameInput.value;
    paintGreeting(curVal);
    saveName(curVal);
}
    

function askForName(){
    nameForm.classList.add(SHOWING_CN);
    nameForm.addEventListener("submit", handleSubmit);
}


function setGreeting(username){
    let time = greeting_clock.innerHTML.toString();
    time = time.split(" ");
    hour = time[0];
    if (hour < 6){
        greeting.innerHTML = `Good Night, ${username}`;
    } else if (hour >= 6 && hour < 12){
        greeting.innerHTML = `Good Morning, ${username}`;
    } else if (hour >= 12 && hour < 18){
        greeting.innerHTML = `Good Afternoon, ${username}`;
    } else if (hour >= 18 && hour < 24){
        greeting.innerHTML = `Good Evening, ${username}`;
    } 
}


function paintGreeting(username){
    nameForm.classList.remove(SHOWING_CN);
    nameForm.removeChild(nameInput)
    greeting.classList.add(SHOWING_CN);
    setGreeting(username);
}

function loadName(){
    const curUser = localStorage.getItem(USER_LS);
    if (curUser == null){
        askForName();
    } else {
        paintGreeting(curUser);
    }
}


function init(){
    loadName();
}

init();