const backCheck = document.getElementById("backCheck");
const backColorInput = document.getElementById("backColorInput");
const backColorForm = document.getElementById("backColorForm");

const BackChenges_KEY = "BackChenges"
let BackChenges = [];
function saveBackChenges() {
    localStorage.setItem(BackChenges_KEY, JSON.stringify(BackChenges)); 
}

const BackColor_KEY = "BackColor"
let BackColor = [];
function saveBackColor() {
    localStorage.setItem(BackColor_KEY, JSON.stringify(BackColor)); 
}

function backChenge(event) {
    const backCheckValue = backCheck.checked;
    const efect = document.getElementById("efect");
    switch (backCheckValue) {
        case true:
            document.body.style.backgroundImage = "none";
            efect.style.display = "none";
            BackChenges = true;
            saveBackChenges();
            break;
        case false:
            document.body.style.backgroundImage = "";   
            efect.style.display = "";
            BackChenges = false;
            saveBackChenges();
            break;
    }
}
backCheck.addEventListener("click", backChenge);


function backColorToDoSubmit(event) {
    event.preventDefault();
    document.body.style.backgroundColor = backColorInput.value;
    BackColor = backColorInput.value;
    saveBackColor();

}
backColorForm.addEventListener("submit", backColorToDoSubmit);

    function paintBackGround() {
        document.body.style.backgroundColor = BackColor;
    }

function paintBacks(){
    const backCheck = document.getElementById("backCheck");
    const newCheckObj_2 = JSON.parse(localStorage.getItem(BackChenges_KEY));
    if (newCheckObj_2 === true) {
        backCheck.checked = true;
        document.body.style.backgroundImage = "none";
        efect.style.display = "none";
    } else {
        backCheck.checked = false;
    }
}

const savedBacks = localStorage.getItem(BackChenges_KEY);
const savedBackColor = localStorage.getItem(BackColor_KEY);


if(savedBacks !== null){
    const parsedBacks = JSON.parse(savedBacks);
    const parsedBackColor = JSON.parse(savedBackColor);
    BackChenges = parsedBacks;
    BackColor = parsedBackColor;
    paintBacks();
    paintBackGround();

}