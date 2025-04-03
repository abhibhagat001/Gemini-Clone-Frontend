import React, { useContext } from 'react'
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';
const Main = () => {
  const {onSent,recentPrompt,setPreviousPrompt,showResult,loading,resultData,setInput,input,setRecentPrompt} = useContext(Context);

  const loadPrompt =  async (prompt) =>{
    setRecentPrompt(prompt);
    setPreviousPrompt(prev=>[...prev,prompt]);
    await onSent(prompt);
  }

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className='main-container'>
        {!showResult ? <>
          <div className='greet'>
            <span>Hello, Dev</span><br></br>
            <span>How can I help you today?</span>
        </div>

        <div className='cards'>
            <div className='card' onClick={()=>loadPrompt('What are the simple techniques to stay focused and productive while working on complex taks.')}>
                <p>What are the simple techniques to stay focused and productive while working on complex taks?</p>
                <img src={assets.compass_icon} alt="" />
            </div>

            <div className='card' onClick={()=>loadPrompt('How can I explain a technical concept to a non-technical person in the simplest way?')}>
                <p>How can I explain a technical concept to a non-technical person in the simplest way?</p>
                <img src={assets.bulb_icon} alt="" />
            </div>

 

            <div className='card' onClick={()=>loadPrompt('What are the best ways to approach and solve a problem when I am stuck?')}>
                <p>What are the best ways to approach and solve a problem when I'm stuck?</p>
                <img src={assets.message_icon} alt="" />
            </div>

 

            <div className='card' onClick={()=>loadPrompt('What are some easy habits to maintain a healthy work-life balance?')}>
                <p>What are some easy habits to maintain a healthy work-life balance?</p>
                <img src={assets.code_icon} alt="" />
            </div>

        </div>
        </>:<div className='result'>
            <div className='result-title'>
            <img src={assets.user_icon} />
              <p>{recentPrompt}</p>
            </div>
           <div className='result-data'>
            <img src={assets.gemini_icon} />
            {loading ? <div className='loader'>
              <hr />
              <hr />
              <hr />
            </div>:
             <p dangerouslySetInnerHTML={{__html:resultData}}></p>
            }
           </div>
          </div>}
    
        <div className='main-bottom'>
          <div className='search-box'>
            <input onChange={(e)=>setInput(e.target.value)} value={input} type='text' placeholder='Enter a prompt here' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
             {input && <img onClick={()=>onSent()} src={assets.send_icon} alt="" />}
            </div>
          </div>

          <p className='bottom-info'>
            Gemini may display inaccurate info, including about people, so double check its responses. Your privacy and Gemini Apps (@copyrights:GreatStack Youtube channel)
          </p>
        </div>
      </div>
    </div>
    )
}

export default Main

 

 