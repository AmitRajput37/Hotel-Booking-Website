var more = document.getElementById('city-images-2');
more.style.display = "none";
var btnTxt = document.getElementById('view-button');

$(document).ready(function(){
    $("#view-button").click(function(){
        $("#city-images-2").show();
        btnTxt.innerHTML = "View Less";

        $("#view-button").click(function(){
            $("#city-images-2").hide();
            btnTxt.innerHTML = "View More";
            window.location.reload();
        });
    });  
});
