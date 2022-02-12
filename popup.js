const userInput = document.querySelector('form');
const speedDiv = document.querySelector('.speedtext');
const error = document.querySelector('.error');
const errorWeb = document.querySelector('.error-web');

let userInputSpeed;

userInput.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (userInput.inputf.value >= 0 && userInput.inputf.value <= 5){

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        userInputSpeed = userInput.inputf.value;
        speedDiv.innerHTML = `Current Speed is ${userInputSpeed}`;
        speedDiv.classList.remove("d-none");

        error.classList.add("d-none");

        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                function: setSpeed,
                args: [userInputSpeed],
            },
        );
        
    }else{
        error.innerHTML = `Enter playback speed in the range of 0-5`;
        error.classList.remove("d-none");
        
        speedDiv.classList.add("d-none");
    }

});


function setSpeed(speed){
    if (location.href.includes("youtube")){
        //console.log(speed);
        document.getElementsByTagName("video")[0].playbackRate = speed;    
    }
}


