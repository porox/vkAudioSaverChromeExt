function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}
var data = httpGet(chrome.runtime.getURL('/core.js'));
var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.innerHTML = data;
document.head.appendChild(script);
document.body.setAttribute("onLoad", "getAudiosArray();");

