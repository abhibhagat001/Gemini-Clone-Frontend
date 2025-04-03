async function run(prompt) 
{ 
    try 
    { 
        const res = await fetch("https://gemini-clone-htv3.vercel.app/generate", 
        { 
            method: "POST", headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ prompt })
        }); 
            const data = await res.json(); return data; 
    }
    catch (error) 
    { 
        return error; 
    } 
} 
      
export default run;