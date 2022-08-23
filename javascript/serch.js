const NaverForm = document.getElementById("Naver-serch");
const NaverInput = document.querySelector("#Naver-serch input");

const GoogleForm = document.getElementById("Google-serch");
const GoogleInput = document.querySelector("#Google-serch input");

function serchNeverSubmit(event){
    event.preventDefault();
    const openNewWindow = window.open("about:blank");
    openNewWindow.location.href = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${NaverInput.value}`;
    NaverInput.value = ""
}
NaverForm.addEventListener("submit", serchNeverSubmit);

function serchGoogleSubmit(event){
    event.preventDefault();
    const openNewWindow = window.open("about:blank");
    openNewWindow.location.href = `https://www.youtube.com/results?search_query=${GoogleInput.value}`;
    GoogleInput.value = ""
}
GoogleForm.addEventListener("submit", serchGoogleSubmit);

