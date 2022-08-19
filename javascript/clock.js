const clock = document.querySelector("h2#clock");

function getClock() {
    const date =new Date();
    const hours = String(date.getHours()).padStart(2, "0");    
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText= `${hours}:${minutes}:${seconds}`;
}

getClock();//맨처음부터 시간이 보여주게 함. 없으면 1초가 지난 후에야 보임
setInterval(getClock, 1000);

//매 시간마다 반복해 실행setInterval()
//매 시간이 되면 반복해 실행setTimeout()
//.padStart(2,"0") -> 받은 숫자가 길이가 2가 아니라면 앞에 0을 추가.padEnd면 뒤에 추가