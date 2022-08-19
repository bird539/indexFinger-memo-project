const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
//const link = document.querySelector("a");
const greeting = document.querySelector("#greeting");

//내가 추가------
const rewriteName = document.querySelector("#rewriteName")
//end-----내가추가

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
//1.form 이름 저장하고 보여주기(form은 사라짐)--------
function onLoginSubmit(event){
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value
    localStorage.setItem(USERNAME_KEY, loginInput.value);//유저 저장
    paintGreetings(username);
}

function paintGreetings(username){
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME); //보여주고
    rewriteName.classList.remove(HIDDEN_CLASSNAME);//내가추가-rewriteName보여주기
    
}

const savedUername = localStorage.getItem(USERNAME_KEY);

if(savedUername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit); //숨기고
} else {
    paintGreetings(savedUername);
}

//내가 추가한 function---
//유저이름 삭제 및 수정
function rewriteNameRemove(event){
    event.preventDefault();
    localStorage.removeItem(USERNAME_KEY);//유저 이름 삭제
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
    event.preventDefault();
    //location.reload();

    
}
rewriteName.addEventListener("click", rewriteNameRemove);
//end---내가 추가한 function

//loginForm.addEventListener("submit", onLoginSubmit);
//end-1.form 이름 저장하고 보여주기(form은 사라짐)--------
