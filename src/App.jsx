import { useContext, useState } from 'react'
import va from "./images/1.png"
import './App.css'
import { FaMicrophone } from "react-icons/fa";
import { PiMoonStarsLight } from "react-icons/pi";
import { IoIosApps } from "react-icons/io";
import { FiSun } from "react-icons/fi";
import { dataContext } from './Context/UserContext'

function App() {
  const [background , setBackground] = useState(false)
  let {recognition ,speaking ,setSpeaking,recognitionText,response,setRecognition,setResponse,speak} =  useContext(dataContext)


  function click(){
    console.log("hi")
    recognition.start();
    setSpeaking(true)
    setRecognition("listening...")
    setResponse(false)
    
  }
  

  function about(){
      speak("hi i am DooM your ai assistant , try asking anything to me, i will give all youor answers . bonus try saying open youtube or open linkedin")
  }
  function toggle(){
      
     setBackground((prev) => !prev)
     if(!background){
      speak("light , i like it !")

     }
     else{
      speak("dark , thats my type")
     }
  }
  
  return (
    <div className={`${!background?"body":"body2"}`}>

      <div className={`${!background?"main":"main2"}`} >
        <div className="navbar"><div className="toggle" onClick={toggle} href="dark mode">{!background?<PiMoonStarsLight />:<FiSun />
      }</div><div className="toggle " onClick={about}><IoIosApps /> 
      </div> </div>
          {/* {response?<div className="back"></div>:<div></div>} */}
        <img src={va} alt="" />
        <span id="span">I AM DOOM . YOUR VIRTUAL ASSISTANT.....</span>
        <div className={`${!background?"p":"p2"}`}>
           {!speaking? <button onClick={click} >click here <FaMicrophone /></button> : <div className='response'>{!response?<div className='loader1'> </div>: <div className='loader'></div>}< p >{recognitionText}</p></div>}
        </div>
       
        
      </div>
    </div>
  )
}

export default App

