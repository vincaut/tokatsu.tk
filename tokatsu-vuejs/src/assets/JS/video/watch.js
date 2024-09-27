var video = document.getElementById('video');

var playerBtn = document.getElementsByClassName('player');

var btnTimeLeft = 0;

var popTimeLeft = 0;
setInterval(function(){
    if (document.getElementById('video') == null)
    {
        document.getElementById('pop').hidden = false;
        document.getElementById('pop').style.opacity = 1;
    }
    else
    {
        if(popTimeLeft <= 0)
        {
            document.getElementById('pop').style.opacity = 0;
            setTimeout(function(){
                document.getElementById('pop').hidden = true;
            }, 200);
        }
        else
        {
            popTimeLeft = Math.round(popTimeLeft*10)/10 - 0.1;

            document.getElementById('pop').hidden = false;
            setTimeout(function(){
                document.getElementById('pop').style.opacity = 1;
            }, 200);
        }
    }

    if(btnTimeLeft <= 0){

        for (let index = 0; index < playerBtn.length; index++) {
            playerBtn[index].style.opacity = 0;
        }
        setTimeout(function(){
            for (let index = 0; index < playerBtn.length; index++) {
                playerBtn[index].hidden = true;
            }
        }, 200);
    }
    else
    {
        btnTimeLeft = Math.round(btnTimeLeft*10)/10 - 0.1;
        
        for (let index = 0; index < playerBtn.length; index++) {
            playerBtn[index].hidden = false;
        }
    
        setTimeout(function(){
            for (let index = 0; index < playerBtn.length; index++) {
                playerBtn[index].style.opacity = 1;
            }
        }, 200);    
      }
}, 100);

document.addEventListener("ended", () => {
    if (document.fullscreenElement)
        document.exitFullscreen();
});

//#region pop
function pop(value) {
    if (document.getElementById('video') != null){
        document.getElementById('pop').innerHTML = value;
        popTimeLeft = 3;
    }
}
function popPersiste(value) {
    popTimeLeft = 9999999999999;
    document.getElementById('pop').innerHTML = value;
}    
//#endregion

//#region Back, next btn
function refreshTimeleft(){
    if (percent > 99 || video.paused)
        btnTimeLeft = 999999999;
    else
        btnTimeLeft = 2;
}

video.addEventListener('play', function () {
    refreshTimeleft();
}, true);
video.addEventListener('pause', function () {
    refreshTimeleft();
}, true);
video.addEventListener('mousemove', function () {
    refreshTimeleft();
}, true);
video.addEventListener('click', function () {
    refreshTimeleft();
}, true);
video.addEventListener("touchstart", function () {
    refreshTimeleft();
}, true);
video.addEventListener("touchend", function () {
    refreshTimeleft();
}, true);
video.addEventListener("touchcancvideo", function () {
    refreshTimeleft();
}, true);
video.addEventListener("touchmove", function () {
    refreshTimeleft();
}, true);
//#endregion

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }    
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }    
    }    
    return "";
}        

//#region History
var checkUpdate = false;
var time = 0;
var duration = 0;
var percent = 0;
video.addEventListener('timeupdate', () => {
    time = video.currentTime;
    duration = video.duration;
    percent = Math.round((time / duration) * 1000) / 10;

    if (percent % 0.5 == 0 && percent > 1){
        if (!checkUpdate){
            ajaxUrl = '/api/video/history';
    
            datas = {
                "token": getCookie('token'),
                "video_id": document.getElementById('video_id').value,
                "timewatch": time,
                "percent": percent
            };    
        
            ajax(ajaxUrl, datas);
        }    
        checkUpdate = true;
    }    
    else
        checkUpdate = false;
        
    console.log(percent);    
});    

function progressHandler(e) {

}    

function completeHandler(e) {
    let response = JSON.parse(e.target.responseText);
    if (response['success']) {
    } else    
    {
        video.remove();
        popPersiste("Une erreur est survenue, veuillez recharger la page. Raison : " + response['message']);
    }    
}    

function errorHandler() {
    console.log("Echoué");
}    

function abortHandler() {
    console.log("Annulé");
}    
//#endregion

//#region contrôle
document.addEventListener('keydown', function (event) {
    event.stopPropagation();
    if (event.code == "Space") {
        if (video.paused){
            video.play();
            pop("Play");
        } else {
             video.pause();
            pop("Pause");
        }
    }

    if (event.code == "ArrowLeft") {
        video.currentTime -= 5;
        pop("-5s");
    }
    if (event.code == "ArrowRight") {
        video.currentTime += 5;
        pop("+5s");
    }

    if (event.code == "ArrowUp") {
        if (video.volume < 0.9)
            video.volume += 0.1;
        else
            video.volume = 1;
        
        pop(Math.round(video.volume * 100) + "%");
    }
    if (event.code == "ArrowDown") {
        if (video.volume > 0.1)
            video.volume -= 0.1;
        else
            video.volume = 0;
        
        pop(Math.round(video.volume * 100) + "%");
    }

    if (event.code == "KeyF") {
        if (document.fullscreenElement)
            document.exitFullscreen();
        else
        {
            document.querySelector('body').requestFullscreen();
        }
    }

    if (event.code == "Escape") {
        if (video.paused)
            document.location.href = "/video";   
    }
}, true);
//#endregion