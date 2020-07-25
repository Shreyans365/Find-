chrome.runtime.onMessage.addListener(function (request) {
    console.log(request);
    request.forEach(element => {
        highlight(element.word, element.color);
    });
})

function highlight(word, color) {
    let text = document.body.innerHTML.trim();
    const reg = new RegExp(word,"gi");
    const replaced = `<span style="background-color: ${color};">${word}</span>`;
    document.body.innerHTML = text.replace(reg, replaced);
}