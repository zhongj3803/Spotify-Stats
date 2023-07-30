const bodyEl = document.querySelector("body");

export function callAPI() {
    // instantiate a headers object
    let myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    const rL = Math.floor(Math.random() * 128) + 128;
    const gL = Math.floor(Math.random() * 128) + 128;
    const bL = Math.floor(Math.random() * 128) + 128;

    const rD = rL - Math.floor(Math.random() * 128);
    const gD = rL - Math.floor(Math.random() * 128);
    const bD = rL - Math.floor(Math.random() * 128);
    bodyEl.style.backgroundImage = `linear-gradient(180deg, rgb(${rD}, ${gD}, ${bD}), rgb(${rL}, ${gL}, ${bL}))`;
    let raw = JSON.stringify({ "color": `gradient with colors rgb(${rD}, ${gD}, ${bD}) and rgb(${rL}, ${gL}, ${bL})` });
    // create a JSON object with parameters for API call and store in a variable
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://2uyj7p0mb2.execute-api.us-east-1.amazonaws.com/dev", requestOptions)
        .then(response => response.text())
        .then(result => alert(JSON.parse(result).body))
        .catch(error => console.log('error', error));
}


bodyEl.addEventListener("mousemove", event => {
    const spanEl = document.createElement("span");
    spanEl.style.left = event.pageX + "px";
    spanEl.style.top = event.pageY + "px";
    const size = Math.random() * 25;
    spanEl.style.width = size + "px";
    spanEl.style.height = size + "px";
    bodyEl.appendChild(spanEl);
    setTimeout(() => {
        spanEl.remove();
    }, 3000)
})
