'use strict'

const defaultThSet = {
    col : [
        {"key":"name", title:"이름", row:"center", add:"name"},
        {"key":"tel", title:"전화번호", row:"center", add:"tel"},
        {"key":"url", title:"경로", row:"center", add:"url"},
        {"key":"mail", title:"메일주소", row:"center", add:"mail"}
    ]
}


const UI = {
    keywords : new Array(),
    selectElements : document.querySelectorAll("[data-select]"),
    selectStatus : "",
    init : function() {
        this.getKeywords( defaultThSet.col );
        this.tableDraw("#jsonTable");
        this.searchFieldEvent("searchField", "#jsonTable")
        this.keywords.length > 0 ? this.drawCheckbox("jsonTable") : console.log("keyword 가 존재 하지 않습니다.")
        this.selectElements.length > 0 ? this.select() : console.log("select 를 사용 하지 않습니다.")
        document.querySelectorAll("[data-checkbox]").length > 0 ? this.checkbox() : console.log("checkbox 를 사용 하지 않습니다.")

        window.addEventListener("load", function() {
        })
    },
    getKeywords : function( obj ){
        const _this = this;
        obj.forEach(function(value){
            _this.keywords.push(value.key)
        })
    },
    drawCheckbox : function ( id ) {
        const fieldset = document.querySelector("[data-checkbox-group='listHideCheckbox']");
        this.keywords.forEach(function(value){
            const checkbox = document.createElement("span");
            checkbox.setAttribute("data-checkbox", 'list' + value);
            checkbox.classList.add("checkbox")
            checkbox.innerHTML += "<input type='checkbox' id='list" + value + "' data-checkbox-input='list" + value + "'><label for='list" + value + "' data-checkbox-label='list" + value + "' data-table-hide='" + id + "'>" + value + "</label>"
            fieldset.append(checkbox)
        })
    },
    tableHideWrap : function( id , value) {
        const table = document.getElementById( id )
        table.querySelectorAll("." + value).forEach(function (value){
            value.classList.toggle("is-hide")
        })
    },
    getJson :  function ( url="", element ,  col) {
        const _this = this;
        return fetch(url, {
            method:"GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("성공", data)
                const tbody = document.createElement("tbody");
                data.forEach(function(rowvalue){
                    const tr = document.createElement("tr");
                    col.forEach(function(colvalue){
                        const td = document.createElement("td");
                        td.classList.add(colvalue.add)
                        switch (colvalue["key"]){
                            case "name":
                                td.innerHTML +=  rowvalue[colvalue["key"]];
                                break;
                            case "url":
                                td.innerHTML += '<a href="' + rowvalue[colvalue["key"]] + '" target="_blank">' + rowvalue[colvalue["key"]] + '</a>';
                                break;
                            case "tel":
                                td.innerHTML += '<a href="tel:' + rowvalue[colvalue["key"]] + '">' + rowvalue[colvalue["key"]] + '</a>';
                                break;
                            case "mail":
                                td.innerHTML += '<a href="@mailto:' + rowvalue[colvalue["key"]] + '">' + rowvalue[colvalue["key"]] + '</a>';
                                break;
                            default:
                        }
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr)
                })
                element.appendChild(tbody)
            })
            .catch((error) => console.log("실패", error))
    },
    tableDraw : function ( element ) {
        const _this = this;
        const table = document.querySelector(element);
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");

        defaultThSet.col.forEach(function(value) {
            tr.innerHTML += "<th scope='col' class='" + value.add + "'>" + value.title + "</th>";
        });
        thead.appendChild(tr);
        table.appendChild(thead);

        this.getJson("data.json", table, defaultThSet.col);
    },
    searchFieldEvent : function ( value, target){
        const select = document.querySelector("[data-search-select='" + value + "']");
        const input = document.querySelector("[data-search-input='" + value + "']");
        const button = document.querySelector("[data-search-btn='" + value + "']");
        const table = document.querySelector(target);
        input.addEventListener("keyup", function(){
            switch (select.textContent){
                case "선택":
                    alert("검색 카테고리를 선택하세요.")
                    input.value = ""
                    break;
                case "name":
                    table.querySelectorAll("td.name").forEach(function(value){
                        if(value.textContent.includes(input.value)){
                            value.parentElement.style.display = "";
                        } else {
                            value.parentElement.style.display = "none";
                        }
                    })
                    break;
                case "url":
                    table.querySelectorAll("td.url").forEach(function(value){
                        if(value.textContent.includes(input.value)){
                            value.parentElement.style.display = "";
                        } else {
                            value.parentElement.style.display = "none";
                        }
                    })
                    break;
                case "tel":
                    table.querySelectorAll("td.tel").forEach(function(value){
                        if(value.textContent.includes(input.value)){
                            value.parentElement.style.display = "";
                        } else {
                            value.parentElement.style.display = "none";
                        }
                    })
                    break;
                case "mail":
                    table.querySelectorAll("td.mail").forEach(function(value){
                        if(value.textContent.includes(input.value)){
                            value.parentElement.style.display = "";
                        } else {
                            value.parentElement.style.display = "none";
                        }
                    })
                    break;
                default:
                    break;
            }
            console.log(input.value)
        })
    },
    select : function () {
        const _this = this;
        const body = document.body;
        const selectBoxGroup = [];
        this.selectElements.forEach(function(value, key){
            selectBoxGroup.push(value.dataset.select)
        })
        selectBoxGroup.forEach(function(value, key){
            const select = document.querySelector("[data-select='" + value + "']");
            const view = document.querySelector("[data-select-view='" + value + "']");
            const dropDown = document.querySelector("[data-select-dropdown='" + value + "']");

            if(dropDown.dataset.options === "keywords"){
                _this.keywords.forEach(function(value){
                    const span = document.createElement("span");
                    span.classList.add("option");
                    span.innerHTML += value ;
                    dropDown.appendChild(span)
                })
            }

            const options = dropDown.querySelectorAll(".option");

            view.addEventListener("click", function(e){
                select.classList.toggle("is-active");
                _this.selectStatus = select;
            })

            options.forEach(function (value){
                value.addEventListener("click", function(e){
                    select.classList.remove("is-active");
                    view.textContent = value.textContent;
                    _this.selectStatus = "";
                })
            })
        })

    },
    checkbox : function () {
        const _this = this;
        const checkboxGroup = [];
        document.querySelectorAll("[data-checkbox]").forEach(function(value){
            checkboxGroup.push(value.dataset.checkbox)
        })

        console.log("체크박스 사용 빈도 : ", checkboxGroup)

        checkboxGroup.forEach(function(value){
            const checkbox = document.querySelector("[data-checkbox='" + value + "']");
            const input = document.querySelector("[data-checkbox-input='" + value + "']");
            const label = document.querySelector("[data-checkbox-label='" + value + "']");

            label.addEventListener("click", function(){
                checkbox.classList.toggle("is-checked");
                if (checkbox.classList.contains("is-checked")){
                    input.checked = true
                } else {
                    input.checked = false
                }

                if (label.dataset.tableHide){
                    _this.tableHideWrap("jsonTable", this.textContent)
                }
                console.log(checkbox , input.checked)
            })
        });
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