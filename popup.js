  
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("add").focus();
    let colors = ["#C5E1A5","#ef9a9a","#B39DDB","#90CAF9","#FFCC80"];
    let taken = [1,0,0,0,0];

    function firstAvailabe() {
        for (let i=0;i<5;i++) {
            if (taken[i] === 0) {
                return i+1;
            }
        }
        return -1;
    }

    document.getElementById("btn").addEventListener('click', onclickBtn, false);
    document.getElementById("add").addEventListener('click',onclickAdd, false);
    document.getElementById("1-trash").addEventListener('click',trash,false);

    function changeDOM(word) {
        if (word != null && word != "") {
            chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, [{word, color: "white"}]);
            })
        }
        else {
            chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
                let wordColors = [];
                for (var i=0;i<5;i++) {
                    if (taken[i] === 1) {
                        let id = `${i+1}-input`;
                        let word = document.getElementById(id).value;
                        if (word === "") {
                            continue;
                        }
                        let color = colors[i];
                        wordColors.push({word, color});
                    }
                }
                console.log(wordColors);
                chrome.tabs.sendMessage(tabs[0].id, wordColors);
            })
        }
    }

    function onclickBtn() {
        changeDOM();
    }

    function trash(e) {
        let id = String(e.srcElement.id[0]);
        changeDOM(document.getElementById(`${id}-input`).value, colors[Number(id)-1]);
        document.getElementById(`${id}-div`).remove();
        taken[Number(id)-1] = 0;
        document.getElementById("add").disabled = false;
    }

    function onclickAdd() {
        let newInput = document.createElement('input');
        let x = firstAvailabe();
        taken[x-1] = 1;
        if (firstAvailabe() === -1) {
            document.getElementById("add").disabled = true;
        }
        newInput.id = `${x}-input`;
        newInput.style = `background-color: ${colors[x-1]};`;
        let newIcon = document.createElement('i');
        newIcon.id = `${x}-trash`;
        newIcon.className = "fa fa-times";
        newIcon.setAttribute("aria-hidden","true");
        newIcon.addEventListener('click',trash,false);
        let myDiv = document.createElement("div");
        myDiv.id = `${x}-div`;
        myDiv.style = "margin-bottom: 5px;";
        newInput.spellcheck = false;
        myDiv.appendChild(newInput);
        myDiv.appendChild(newIcon);
        document.getElementById("search-fields").appendChild(myDiv);
    }

  }, false)



