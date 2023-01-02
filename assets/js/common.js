'use strict'

const jsonFile = {
    col : [
        {"key":"name", title:"이름", col:"20%", row:"center", add:"name"},
        {"key":"url", title:"경로", col:"30%", row:"center", add:"url"},
        {"key":"tel", title:"전화번호", col:"30%", row:"center", add:"tel"},
    ]
}

const UI = {
    init : function() {
        this.tableDraw("#jsonTable");
    },
    getJson : function ( url ) {
        return fetch(url, {
            method:"POST"
        })
            .then((response) => response.json())
            .then((data) => console.log("성공", JSON.stringify(data)))
            .catch((error) => console.log("실패", error))
    },
    tableDraw : function ( element ) {
        const table = document.querySelector(element);
        const colgroup = document.createElement("colgroup");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");

        jsonFile.col.forEach(function(value) {
            colgroup.innerHTML += "<col style='width:" + value.col  + "'>";
            tr.innerHTML += "<th scope='col' class='" + value.add + "'>" + value.title + "</th>";
        });

        console.log(this.getJson("data.json"))
        thead.appendChild(tr);
        table.appendChild(colgroup);
        table.appendChild(thead);

        /*this.getJson("data.json").forEach(function (value){
            console.log(value)
        })*/


    }
}

function onReady() {
    console.log("document ready");
    UI.init();
}
if (document.readyState !== "loading") {
    onReady(); // Or setTimeout(onReady, 0); if you want it consistently async
} else {
    document.addEventListener("DOMContentLoaded", onReady);
}

window.addEventListener("load", function(){
    console.log("window load");
})