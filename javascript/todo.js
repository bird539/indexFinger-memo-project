const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"

let toDos = []; //저장. 근데 시작은 항상 비어있게 되어 자꾸 예전게 사라짐 

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //로컬스토리지에 저장(근데 문자로만 저장함.a,b...)->JSON.stringify(toDos)가 array로 저장하게 해 줌(["a","b"..])
}

function deleteToDo(event) {
    const li = event.target.parentElement; //리스트와 버튼을 연결
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id)); //필터로 클릭하지 않은 id는 남겨두고 싶다
    li.remove(); //리스트 제거
    saveToDos();
}

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span"); //스펜을 만들고
    span.innerText = newTodo.text; //스펜은안에 넣은 것은 newTodo값

    const button = document.createElement("button");
    button.innerText = "X";
    button.addEventListener("click", deleteToDo);

    li.appendChild(span);
    li.appendChild(button); //li안에 스펜을 넣음
    toDoList.appendChild(li);

}

function handleToDoSubmit(event) {
    event.preventDefault();//엔터시 새로고침 막음
    const newTodo = toDoInput.value; //복사해서 new에 저장     
    toDoInput.value = "";//엔터 시 비움
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),//시간으로 ID값을 가짐
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);//newTodo를 복사해 저장
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);


const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);//array로 만들어줌. 예전것 복원
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);//복원물 넣기
    //parsedToDos.forEach((item)=>console.log("this is the turn of ", item)); //arrow function(화살표 함수)
}
//function sFilter(item){return item !== 3}저장만 하고 true나 false를 지정해서 보낼 수 있어서 특정 값을 필터링 한 채로 값 반환 가능 sFilter(input) { return input !== 4} -> 4를 제외하고 값 리턴