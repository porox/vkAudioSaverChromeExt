function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}
var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.innerHTML = httpGet(chrome.runtime.getURL('/core.js'));
document.head.appendChild(script);
document.body.setAttribute("onLoad", " setInterval(function(){ return getAudiosArray();},700);");
