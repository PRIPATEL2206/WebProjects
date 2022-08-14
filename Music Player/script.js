// variables
let currentMusicIndex=1;
let audioPlayer= new Audio(`music/6MinuteEnglish-20190124-WhatIsHappiness-1.mp3`);
let pushPlayButton = document.getElementById("play");
let range=document.getElementById("musicRange");
let forwordButton=document.getElementById("forward")
let backwordButton=document.getElementById("backword")
let prewiusButton=document.getElementById("prewius");
let nextButton=document.getElementById("next");
let songTag=document.getElementsByClassName("song");
let songs=["6MinuteEnglish-20190124-WhatIsHappiness-1","Krushna-Bhagva-Chalya-Duwarka-Aaditya-Gadhavi-Umiya-Mataji-Mandir-Unjha_dFqH8NJhNgY","Meri_Zindagi_Hai_Tu_(Song)_Satyameva_Jayate_2___John_A,_Divya_K___Rochak_ft_Jubin,_Neeti___Manoj_M(256k)","Over_the_Horizon"];
// console.log(timePlayed)
setInterval(()=>{
    timePlayed.textContent = toTimeString(audioPlayer.currentTime);
    timeDuration.textContent = toTimeString(audioPlayer.duration)
},1000)

function toTimeString(time){
    return `${time>60 ? parseInt(time/60):0} : ${parseInt(time%60)}`
}

pushPlayButton.addEventListener("click",()=>{
if(pushPlayButton.alt=="pause"){
        pushPlayButton.src="photo/icon/playButton.png";
        pushPlayButton.alt="play";
        audioPlayer.pause();
        return;
    }
    pushPlayButton.src="photo/icon/pause.png";
    pushPlayButton.alt="pause";
    // console.log(audioPlayer.duration)
    audioPlayer.play();
}
)

forwordButton.addEventListener("click",()=>{
    audioPlayer.currentTime+=3; 
})

backwordButton.addEventListener("click",()=>{
    audioPlayer.currentTime-=3; 
})

range.addEventListener("change",()=>{
    audioPlayer.currentTime=range.value/100*audioPlayer.duration;
})

audioPlayer.addEventListener("timeupdate",()=>{
    range.value=parseInt(audioPlayer.currentTime/audioPlayer.duration*100);
    if(audioPlayer.currentTime===audioPlayer.duration){
        pushPlayButton.src="photo/icon/playButton.png";
        pushPlayButton.alt="play";
        audioPlayer.pause();
    }
    // console.log(toTimeString(audioPlayer.duration))
})

nextButton.addEventListener("click",()=>{
    if(currentMusicIndex>=songTag.length){
        currentMusicIndex=1;
        audioPlayer.src=`music/${songs[currentMusicIndex-1]}.mp3`;
        pushPlayButton.src="photo/icon/pause.png";
        pushPlayButton.alt="pause";
        audioPlayer.play();    
        return;
    }
    currentMusicIndex+=1;
    audioPlayer.src=`music/${songs[currentMusicIndex-1]}.mp3`;
    pushPlayButton.src="photo/icon/pause.png";
    pushPlayButton.alt="pause";
    audioPlayer.play();
})
prewiusButton.addEventListener("click",()=>{
    if(currentMusicIndex<=1){
        currentMusicIndex=songTag.length;
        audioPlayer.src=`music/${songs[currentMusicIndex-1]}.mp3`;
        pushPlayButton.src="photo/icon/pause.png";
        pushPlayButton.alt="pause";
        audioPlayer.play();    
        return;
    }
    currentMusicIndex-=1;
    audioPlayer.src=`music/${songs[currentMusicIndex-1]}.mp3`;
    pushPlayButton.src="photo/icon/pause.png";
    pushPlayButton.alt="pause";
    audioPlayer.play();
})

Array.from(songTag).forEach((element) => {
   element.addEventListener("click",(e)=>{
        // console.log(e.target.textContent);  
        currentMusicIndex=songs.indexOf(e.target.textContent)+1;
        console.log(e.target.textContent)
        audioPlayer.src=`music/${e.target.textContent}.mp3`
        audioPlayer.play();
        if(pushPlayButton.alt=="play"){
            pushPlayButton.src="photo/icon/pause.png";
            pushPlayButton.alt="pause";
            // console.log(audioPlayer.duration)
            audioPlayer.play();
        }
    })
});