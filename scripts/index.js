const API_URL = "https://travel-advisor.p.rapidapi.com/";
const tripAdvisorHost = "travel-advisor.p.rapidapi.com";
const tripAdvisorKey = "<444555afa7msh1ba877b2529af90p1f12bbjsn5a24aeb42913>";


var more = document.getElementById('city-images-2');
more.style.display = "none";
var btnTxt = document.getElementById('view-button');

$(document).ready(function () {
    $("#view-button").click(function () {
        $("#city-images-2").show();
        btnTxt.innerHTML = "View Less";

        $("#view-button").click(function () {
            $("#city-images-2").hide();
            btnTxt.innerHTML = "View More";
            window.location.reload();
        });
    });
});

let debounce = (func, wait, immediate) => {
    let timeout;
    return function executedFunction() {
        let context = this;
        let args = arguments;
        let later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

let search = () => {
    let currentFocus;
    let searchInput = document.getElementById("search-bar");
    /*Event Listender when some data is entered in the search text field*/
    searchInput.addEventListener("input", debounce(function(e) {
        // Get the new value entered in the input field
        let newValue = this.value;

        let xhttp = new XMLHttpRequest();
        if (!newValue || newValue.length < 3) {
            closeAllLists();
            return false;
        }

        xhttp.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                /*close any already open lists of searched values*/
                closeAllLists();
                const data = JSON.parse(this.responseText).data;
                const geos = data.filter((element) => {
                    return element.result_type === "geos"
                });
                let loactionList = [];
                geos.forEach((element) => {
                    loactionList.push(element.result_object.name);
                });
                currentFocus = -1;
                /*create a div which will show the suggestion list:*/
                let searchListDiv = document.createElement("div");
                searchListDiv.setAttribute("id", searchInput.id + "search-list");
                searchListDiv.setAttribute("class", "search-items");
                /*append the DIV element as a child of the search container:*/
                searchInput.parentNode.appendChild(searchListDiv);
                /*for each item in the array...*/
                for (let i = 0; i < loactionList.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                    if ((loactionList[i].toUpperCase()).includes(newValue.toUpperCase())) {
                        /*create a DIV element for each matching element:*/
                        let listElementDiv = document.createElement("div");
                        listElementDiv.setAttribute("onClick", "window.location='list.html?city=" + loactionList[i] + "'");
                        listElementDiv.innerText = loactionList[i];
                        /*insert a input field that will hold the current array item's value:*/
                        listElementDiv.innerHTML += "<input type='hidden' value='" + loactionList[i] + "'>";
                        /*execute a function when someone clicks on a city shown as the suggestions*/
                        listElementDiv.addEventListener("click", function(e) {
                            /*insert the value for the search text field:*/
                            searchInput.value = this.getElementsByTagName("input")[0].value;
                            /*close the list of search values,
                            (or any other open lists of search values:*/
                            closeAllLists();
                        });
                        searchListDiv.appendChild(listElementDiv);
                    }
                }
            }
        });
        xhttp.open("GET", API_URL + "locations/auto-complete?lang=en_US&units=km&query=" + newValue);
        xhttp.setRequestHeader("x-rapidapi-host", tripAdvisorHost);
        xhttp.setRequestHeader("x-rapidapi-key", tripAdvisorKey);

        xhttp.send();
        
    },500));

    let closeAllLists = element => {
        /*close all search lists in the document,
        except the one passed as an argument:*/
        let x = document.getElementsByClassName("search-items");
        for (let i = 0; i < x.length; i++) {
            if (element != x[i] && element != searchInput) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", e => {
        closeAllLists(e.target);
    });
}