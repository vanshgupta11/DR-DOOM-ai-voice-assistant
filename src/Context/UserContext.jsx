import React, { createContext, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import run from '../api';

export const dataContext = createContext()


    const getDate = () => new Date().toLocaleDateString('en-US', { 
         year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
              });
      const getDay = () => new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const getTime = () => new Date().toLocaleTimeString();
   


function UserContext({children}) {
  let [speaking ,setSpeaking] = useState(false);
  let [recognitionText, setRecognition] = useState("")
  let [response , setResponse] = useState(false)

function speak(text) {
  setSpeaking(true);
  
  let text_speak = new SpeechSynthesisUtterance(text);

  // Wait for voices to load
  const setVoiceAndSpeak = () => {
    const voices = speechSynthesis.getVoices();
    
    // Look for male voices in order of preference
    const maleVoice = voices.find(v => 
      v.name.toLowerCase().includes("mark") ||
      v.name.toLowerCase().includes("david") ||
      v.name.toLowerCase().includes("alex") ||
      v.name.toLowerCase().includes("daniel") ||
      v.name.toLowerCase().includes("male") ||
      v.name.toLowerCase().includes("man")
    );
  
    // If no specific male voice found, try to find any voice that's not female
    const notFemaleVoice = voices.find(v => 
      !v.name.toLowerCase().includes("female") &&
      !v.name.toLowerCase().includes("woman") &&
      !v.name.toLowerCase().includes("samantha") &&
      !v.name.toLowerCase().includes("victoria") &&
      !v.name.toLowerCase().includes("karen") &&
      !v.name.toLowerCase().includes("zira")
    );

    if (maleVoice) {
      text_speak.voice = maleVoice;
      console.log("Using male voice:", maleVoice.name);
    } else if (notFemaleVoice) {
      text_speak.voice = notFemaleVoice;
      console.log("Using voice:", notFemaleVoice.name);
    } else {
      console.warn("No male voice found, using default voice.");
    }

    text_speak.volume = 1;
    text_speak.rate = 0.8;
    text_speak.pitch = 0.8;
    text_speak.lang = "en-US";

  
    text_speak.onend = () => {
      setSpeaking(false);
      setResponse(false);
    };

    text_speak.onerror = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(text_speak);
  };

  if (speechSynthesis.getVoices().length > 0) {
    setVoiceAndSpeak();
  } else {
    speechSynthesis.addEventListener('voiceschanged', setVoiceAndSpeak, { once: true });
  }
}




    async function airesponse(prompt) {
       let text = await run(prompt)
       let newText = text.split("**").join("").split("*").join("").replace("google","Vansh Gupta")
       console.log(newText)
       setRecognition(newText)
       speak(newText)
       setResponse(true)
    }


  let speechRecognition = window.SpeechRecognition|| window.webkitSpeechRecognition
  let recognition = new speechRecognition()
  recognition.onresult=(e)=>{
    let currentIndex = e.resultIndex
    let transcript = e.results[currentIndex][0].transcript
    console.log(transcript)
    setRecognition(transcript)
   
    takeCommand(transcript.toLowerCase())
  }

  function takeCommand(command){
    if(command.includes("open") && command.includes("youtube")){
      window.open("https://www.youtube.com/","_blank")
      speak("opening youtube")
      setRecognition("opening youtube...")
      setResponse(true)
    }
    else if(command.includes("open") && command.includes("instagram")){
      window.open("https://www.instagram.com/","_blank")
      speak("opening instagram")
      setRecognition("opening instagram...")
      setResponse(true)
    }
        else if(command.includes("open") && command.includes("mail") || command.includes("gmail")){
      window.open("https://mail.google.com/mail/u/0/#inbox","_blank")
      speak("opening mail")
      setRecognition("opening mail...")
      setResponse(true)
    }
      else if(command.includes("open") && command.includes("linkedin")){
      window.open("https://www.linkedin.com/in/vansh-gupta-6b062030a/","_blank")
      speak("opening linkedin")
      setRecognition("opening linkedin...")
      setResponse(true)
    }
     else if(command.includes("open") && command.includes("chat")){
      window.open("https://chatgpt.com/","_blank")
      speak("opening chatgpt")
      setRecognition("opening chatgpt...")
      setResponse(true)
    }
      else if(command.includes("date")){
        setRecognition(getDate())
        speak(getDate())
        setResponse(true)
      }
        
     else if(command.includes("day")){
        setRecognition( getDay())
        speak( getDay())
        setResponse(true)
      }
        else if(command.includes("time")){
        setRecognition(getTime())
        speak(getTime())
        setResponse(true)
      }
        


    else{
       airesponse(command)
    }
  }
  let value ={
    recognition,
    speaking ,
    setSpeaking,
    recognitionText,
     setRecognition,
     response,
     setResponse,
     speak
  }
  return (
    
    <div>
      <dataContext.Provider value={value}>
      {children}
      </dataContext.Provider>
      </div>
  )
}

export default UserContext