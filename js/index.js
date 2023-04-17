//creación de variables del textarea, opciones y boton
const  textArea= document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speehBtn= document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

//metodo para obtener las voces
voices();

//funcion para obtener las voces
function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected":
        "";
        let option=`<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

// un evento para que muestre el listado de las voces en el option
synth.addEventListener("voiceschanged",voices);

//Por medio de la funcion se lee un texto por voz
function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speehBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textArea.value !== ""){
        //Si no habla, habla lo que ha en el textarea
        if(!synth.speaking){
            textToSpeech(textArea.value);
        }
        // if text was long, Add Resume and Pause Function
        if(textArea.value.length > 80){
            setInterval(() =>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true
                    speehBtn.innerHTML = "Convert To Speech";
                }else{ }

            }, 500)
            if(!isSpeaking){
                synth.resume();
                isSpeaking=false;
                speehBtn.innerText="Pause Speech";
            }else{
                synth.pause();
                isSpeaking= true;
                speehBtn.innerText = "Resume Speech";
            }
        }else{
            speehBtn.innerText="Convert To Speech";
        }
    }
});