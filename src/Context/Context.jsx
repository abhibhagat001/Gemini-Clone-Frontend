import { createContext, useEffect, useState } from "react";
import run from "../Config/gemini";
export const Context = createContext();
const ContextProvider = (props)=>{

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [previousPrompt,setPreviousPrompt] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData]= useState("");

    useEffect(()=>{
        if(localStorage.getItem('response')){
            setShowResult(true);
            setResultData(localStorage.getItem('response'));
            setRecentPrompt(localStorage.getItem('recentPrompt'));
            setPreviousPrompt([...localStorage.getItem('prompts').split(',')]);
        }       
    },[])


    const newChat = () =>{
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) =>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let data;
        if(prompt!==undefined){
             data = await run(prompt);
            
             if(data.error && data.status===500){
                setResultData("Check your internet connection.");
                setLoading(false);
                return;
             }
             if(data.error && data.status === 429){
                setResultData("You have used all 5 allowed requests.Please try again after 7 days");
                setLoading(false);
                return;
             }
             setRecentPrompt(prompt);
             localStorage.setItem('recentPrompt',prompt);
        }else{
            data = await run(input);
            setPreviousPrompt(prev=>[...prev,input])
            setRecentPrompt(input);
          
            if(data.error && data.status===500){
                setResultData("Check your internet connection.");
                setLoading(false);
                return;
             }
             if(data.error && data.status === 429){
                setResultData("You have used all 5 allowed requests.Please try again after 7 days");
                setLoading(false);
                return;
             }
            localStorage.setItem('recentPrompt',input);
        }

        let responseArray = data.response.split("**");
        let newResponse="";
        for(let i=0;i<responseArray.length;i++){
            if(i==0 || i%2!==1){
                newResponse += responseArray[i];
            }else{
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }

        let newResponse2 = newResponse.split('*').join("</br>");
        localStorage.setItem('response',newResponse2);
        setResultData(newResponse2);
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        previousPrompt,setPreviousPrompt,onSent,setRecentPrompt,recentPrompt,showResult,loading,input,setInput,resultData,newChat,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;

 