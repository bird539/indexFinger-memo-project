const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const deletTodoAll = document.getElementById("deletAllTodo");
const deletCheckAllTodo = document.getElementById("deletCheckAllTodo");


const TODOS_KEY = "todos"
let toDos = []; //저장. 근데 시작은 항상 비어있게 되어 자꾸 예전게 사라짐. paintToDo가 만들어 질 때 마다 여기 array에 push함

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //로컬스토리지에 저장(근데 문자로만 저장함.a,b...)->JSON.stringify(toDos)가 array로 저장하게 해 줌(["a","b"..])
} //saveToDos가 하는 일은 오직 toDos array를 localStorage에 집어넣는 것

function deleteToDo(event) {
    const li = event.target.parentElement; //리스트와 버튼을 연결
    const child = li.childNodes[1];

    toDos = toDos.filter(toDo => toDo.textID !== parseInt(child.id)); //지우고 싶은 item을 제외하고 저장함. 필터로 클릭하지 않은 id는 남겨두고 싶다.
    li.remove(); //리스트 제거
    saveToDos();
}

function deleteAll (event) {
    toDos = [];
    while (toDoList.hasChildNodes()) {
        toDoList.removeChild(toDoList.firstChild);
    }
    saveToDos();
    }
    
deletTodoAll.addEventListener("click", deleteAll);

function deletCheckAllTodos(event){
    const getData = JSON.parse(localStorage.getItem(TODOS_KEY));
    let die = [];
    for(let i=0; i<toDos.length; i++){
        const liAll = document.getElementById(`${getData[i].textID}`);
        const parent = liAll.parentElement;
        const childN = parent.childNodes[0];
        if(childN.checked === true){
            die.push(getData[i].textID)
            liAll.parentElement.remove();
        }else{
            childN.checked === false;
        }
    }
    for(let i=0; i<die.length; i++){
        toDos = toDos.filter(toDo => toDo.textID !== parseInt(die[i]));
        saveToDos();
    }
    location.reload();
}

deletCheckAllTodo.addEventListener("click", deletCheckAllTodos)

//내가 추가---!!!!

function checkTodo(event){
    const li = event.target.parentElement; //리스트와 버튼을 연결

    const liID = li.id;
    const chk = document.getElementById(liID);
    const check = chk.childNodes[0].checked;
    const getData = JSON.parse(localStorage.getItem(TODOS_KEY)); 

    const deleteText = /[^0-9]/g;	
    const onlyNumber = liID.replace(deleteText, "")
    const linkindex = parseInt(onlyNumber);

    switch (check) {
        case true:
            getData[linkindex] = {
                text: getData[linkindex].text,
                checkTodo: "true",
                textID: getData[linkindex].textID
            }
            toDos = getData;
            localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
            li.style.textDecoration = "line-through";
            break;
        case false:
            getData[linkindex] = {
                text: getData[linkindex].text,
                checkTodo: "false",
                textID: getData[linkindex].textID
            }
            toDos = getData;
            localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
            li.style.textDecoration = "none";
            break;
    }
    saveToDos();

}

function check_paintToDo(){
    const newCheckObj_2 = JSON.parse(localStorage.getItem(TODOS_KEY));
    for (let i = 0; i < toDos.length; i++) {    
        if (newCheckObj_2[i].checkTodo === "true") {
            const get_check = document.getElementById(`${i}_Todo`);
            const checkk = get_check.childNodes[0];
            checkk.checked = true;
            get_check.style.textDecoration = "line-through";
        }}
}
//end---내가추가!!!! 


function rewriteTodo(event) {
    const target = event.target.parentElement;
    const li = target.closest("li")
    const liId = li.id;
    const check = document.getElementById(liId);

    const getData = JSON.parse(localStorage.getItem(TODOS_KEY));

    const reForm = check.childNodes[2];
    const rewriteInput =reForm.childNodes[0];

    const rewriteclick = check.childNodes[3];
    const rewriteChek = rewriteclick.childNodes[1].checked;

    const deleteText = /[^0-9]/g;	
    const onlyNumber = liId.replace(deleteText, "")
    const linkindex = parseInt(onlyNumber);
    rewriteInput.value = `${getData[linkindex].text}`;

    function submitRewriteLink(event) {

        getData[linkindex] = {
            text: rewriteInput.value,
            checkTodo: getData[linkindex].checkTodo,
            textID: getData[linkindex].textID
        }
        toDos = getData;
        localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
        rewriteChek.value = false;
        
    }
    reForm.addEventListener("submit", submitRewriteLink);

    switch (rewriteChek) {
        case true:
            rewriteInput.style.display = "block";
            break;
        case false:
            rewriteInput.style.display = "none";            
            break;
    }
    saveToDos();
}

let textID_i = 0;

function paintToDo(newTodo){ //newTodo를 그려줌
    const li = document.createElement("li");
    li.id = `${textID_i++}_Todo`;
    const span = document.createElement("span"); //스펜을 만들고
    span.id = `${newTodo.textID}`
    span.innerText = newTodo.text; //스펜은안에 넣은 것은 newTodo값

    const button = document.createElement("button");
    button.innerText = "x";
    button.addEventListener("click", deleteToDo);

//내가추가-체크박스 버튼
    const checkButton = document.createElement("INPUT");
    checkButton.setAttribute("type", "checkbox");
    checkButton.setAttribute("id", "my_checkbox");
    checkButton.addEventListener("click", checkTodo);
    
    li.appendChild(checkButton);

    const todoRewrite_label = document.createElement("label");
    todoRewrite_label.innerText = "rewrite";

    const todoRewrite = document.createElement("INPUT");
    todoRewrite.setAttribute("type", "checkbox");
    todoRewrite.style.display = "none";
    todoRewrite.addEventListener("click", rewriteTodo);//checkTodo 바꾸기

    const todoReInput = document.createElement("INPUT", "text");
    todoReInput.style.display = "none";
    const todoReForm = document.createElement("form");
    //linkReInput.addEventListener("submit", submitRewriteLink);
    todoRewrite_label.appendChild(todoRewrite);
    todoReForm.appendChild(todoReInput);


//end---내가추가-체크박스 버튼

    li.appendChild(span);
    li.appendChild(todoReForm);
    li.appendChild(todoRewrite_label);
    li.appendChild(button); //li안에 스펜을 넣음
    toDoList.appendChild(li);

}



function handleToDoSubmit(event) {
    event.preventDefault();//엔터시 새로고침 막음
    const newTodo = toDoInput.value; //복사해서 new에 저장 
    toDoInput.value = "";//엔터 시 입력박스를 비움
    const newTodoObj = {
        text: newTodo,
        checkTodo: "false",
        textID: Date.now(),
    };

    toDos.push(newTodoObj);
    paintToDo(newTodoObj);//newTodo를 복사해 저장해 보여줌
    saveToDos();//저장
}

toDoForm.addEventListener("submit", handleToDoSubmit);//서밋에서 값 받아 handleToDoSubmit으로 보냄

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);//array로 만들어줌. 예전것 복원
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);//복원물 넣기. forEach함수는 이 parsedToDos배열의 요소마다 실행및 각각 item을 줌
    parsedToDos.forEach(check_paintToDo);
    //parsedToDos.forEach((item)=>console.log("this is the turn of ", item)); //arrow function(화살표 함수)
}



//function sFilter(item){return item !== 3}저장만 하고 true나 false를 지정해서 보낼 수 있어서 특정 값을 필터링 한 채로 값 반환 가능 sFilter(input) { return input !== 4} -> 4를 제외하고 값 리턴