const linkForm = document.getElementById("link-form");
const NameInput = document.querySelector("#link-form input");
const URLinput = linkForm.getElementsByTagName('input')[1];
const linkList = document.getElementById("link-list");

const LinkMemos_text = "LinkMemos";

let LinkMemos = []; //array로 입렵값들 받음. 그러나 새로고침 후에는 비워짐

function saveLinkMemos() { //로컬스토리지에 저장
    localStorage.setItem(LinkMemos_text, JSON.stringify(LinkMemos));
}

function deleteLinkMemo(event){ //메모를 삭제
    const deleteLiTarget = event.target.parentElement;
    const child = deleteLiTarget.childNodes[1];

    LinkMemos = LinkMemos.filter(LinkMemo => LinkMemo.linkID !== parseInt(child.id));//인덱스로 값 제거
    deleteLiTarget.remove();
    saveLinkMemos();
}

function rewriteLink(event) {
    const target = event.target.parentElement;
    const li = target.closest("li")
    const liId = li.id;
    const check = document.getElementById(liId);

    const getData = JSON.parse(localStorage.getItem(LinkMemos_text));

    const reForm = check.childNodes[2];
    const rewriteInput =reForm.childNodes[0];

    const rewriteclick = check.childNodes[3];
    const rewriteChek = rewriteclick.childNodes[1].checked;

    const deleteText = /[^0-9]/g;	
    const onlyNumber = liId.replace(deleteText, "")
    const linkindex = parseInt(onlyNumber);
    rewriteInput.value = `${getData[linkindex].linkName}`;

    function submitRewriteLink(event) {

        getData[linkindex] = {
            linkName: rewriteInput.value,
            link: getData[linkindex].link,
            linkID: getData[linkindex].linkID
        }
        LinkMemos = getData;
        localStorage.setItem(LinkMemos_text, JSON.stringify(LinkMemos));
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
    saveLinkMemos();
}

function copyLinkMemo(event){
    const target = event.target.parentElement;
    const spanLink = target.childNodes[1];
    const content  = spanLink.innerText;

    navigator.clipboard.writeText(content)    
    .then(() => {
        console.log("Text copied to clipboard...")
    })
        .catch(err => {
        console.log('Something went wrong', err);
    })
}

let Lenght_i = 0;//id를 인덱스로 줌
function paintURLmemo(newLinksOb){//메모장을 HTML로 생성
    const linkLi = document.createElement("li");

    linkLi.id = `${Lenght_i++}_Link`;
    const linkA = document.createElement("a");
    //const linkBr = document.createElement("br");
    const linkSpan = document.createElement("span");
    const linkButton = document.createElement("button");

    const linkRewrite_label = document.createElement("label");
    linkRewrite_label.innerText = "rewrite";

    const linkRewrite = document.createElement("INPUT");
    linkRewrite.setAttribute("type", "checkbox");
    linkRewrite.style.display = "none";
    linkRewrite.addEventListener("click", rewriteLink);//checkTodo 바꾸기

    const copyLink = document.createElement("button");
    copyLink.innerText = "copy"
    copyLink.addEventListener("click", copyLinkMemo);


    const linkReInput = document.createElement("INPUT", "text");
    linkReInput.style.display = "none";
    const linkReForm = document.createElement("form");
    //linkReInput.addEventListener("submit", submitRewriteLink);
    linkReForm.appendChild(linkReInput);

    linkA.href = newLinksOb.link;
    linkA.innerText = newLinksOb.linkName;
    linkSpan.id = `${newLinksOb.linkID}`
    linkSpan.innerText = newLinksOb.link;
    linkButton.innerText = "X";
    linkButton.addEventListener("click", deleteLinkMemo);

    linkLi.appendChild(linkA);


    linkRewrite_label.appendChild(linkRewrite);


    //linkLi.appendChild(linkBr);
    linkLi.appendChild(linkSpan);

    linkLi.appendChild(linkReForm);
    linkLi.appendChild(linkRewrite_label);

    linkLi.appendChild(copyLink);
    linkLi.appendChild(linkButton);

    linkList.appendChild(linkLi);


}

function handleUrlSubmit(event) {//입력박스에 값을 받을시
    event.preventDefault();
    const newNameMemo = NameInput.value;
    const newURLmemo = URLinput.value;
    const newLinksOb = {
        linkName:newNameMemo,
        link: newURLmemo,
        linkID: Date.now(),
    }

    NameInput.value = "";
    URLinput.value = "";

    LinkMemos.push(newLinksOb)
    paintURLmemo(newLinksOb);
    saveLinkMemos();

}

linkForm.addEventListener("submit", handleUrlSubmit);

const GetsaveLinkMemos = localStorage.getItem(LinkMemos_text);


if(GetsaveLinkMemos){//strig을 parse하여 array로 만들어줌
    const parsedLinks = JSON.parse(GetsaveLinkMemos);
    LinkMemos = parsedLinks;//로컬스토리지에서 값을 받아 새로고침 후 비워졌던 array를 복원
    parsedLinks.forEach(paintURLmemo);
}
