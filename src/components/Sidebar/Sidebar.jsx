import React, { useContext, useState } from 'react'
import '../Sidebar/Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';
const Sidebar = () => {
  const [extended,setExtended] = useState(false);
  const {onSent,previousPrompt,setRecentPrompt,newChat}=useContext(Context);

  const loadPrompt =  async (prompt) =>{
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  return (
    <div className='sidebar'>
      <div className="top">
        <img className='menu' onClick={()=>setExtended(prev=>!prev)} src={assets.menu_icon} alt={""} />
        <div className="new-chat" onClick={()=>newChat()}>
          <img src={assets.plus_icon} alt="" />
          {extended && (<p>New Chat</p>)}
        </div>

        {extended &&<div className='recent'>
          <p className='recent-title'>Recent</p>
          {previousPrompt.map((item,index)=>{
            return (
            <div onClick={()=>loadPrompt(item)} className='recent-entry' id={index} >
              {localStorage.setItem('prompts',previousPrompt)}
              <img src={assets.message_icon} alt="" />
              <p>{item.slice(0,17)}...</p>
            </div>
            )
          })}          
        </div>
      }
      </div>

      <div className="bottom">
        <div className='bottom-item recent-entry'>
          <img src={assets.question_icon} alt="" />
         {extended && <p>Help</p> }
        </div>

        <div className='bottom-item recent-entry'>
          <img src={assets.history_icon} alt="" />
         {extended && <p>Activity</p> }
        </div>

        <div className='bottom-item recent-entry'>
          <img src={assets.setting_icon} alt="" />
         {extended && <p>Setting</p> }
        </div>
      </div>
    </div>
  )
}

 

export default Sidebar

 

 