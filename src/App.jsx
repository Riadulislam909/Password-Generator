import { useCallback, useEffect, useRef, useState } from "react"


function App() {
  
  const [length, setLength] = useState(8);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const [password, setPassword] = useState("");

  const [buttonColor, setButtonColor] = useState("blue");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(allowNumber) str += "0123456789";
    if(allowChar) str += "!@#$%^&*?/<>|";

    for(let i=1; i<=length; i++ ){
      let charIndex = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);

  }, [length, allowNumber, allowChar, setPassword]);

  useEffect(()=>{
    passwordGenerator();
  },[length, allowNumber, allowChar, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    
    //selecting input field 
    passwordRef.current?.select();

    //selecting in range
    //passwordRef.current?.setSelectionRange(0,6);
  },[password])

  const changeButtonColor = ()=>{
      setButtonColor("gray");
  }
  return (
    <>
    <div className=" w-full max-w-lg  mx-auto shadow-md rounded-lg px-4 py-6 my-8 text-orange-500 bg-gray-800">
    <h1 className="text-center text-2xl font-sans text-white my-3">Psasword Generator</h1>
    <div className="flex shadow-md rounded-lg">
    <input type="text"
           value={password}
           className="outline-none w-full py-1 px-3 rounded-md"
           placeholder="Password"
           readOnly
           ref={passwordRef}
           />
           <button onClick={()=>{
              copyPasswordToClipboard();
              changeButtonColor();
           }} className="outline-none bg-blue-600 text-white rounded-md shrink-0 px-2 py-1" style={{backgroundColor: buttonColor}}>Copy</button>
    </div>
    <div className="flex text-sm gap-x-2 py-2">
      <div className="flex justify-center items-center gap-x-1">
        <input type="range"
               min = {8}
               max =  {25}
               value={length}
               className="cursor-pointer"
               onChange={(e)=> setLength(e.target.value)}/>
        <label>Length: {length}</label>

      </div>
      <div className="flex justify-center items-center gap-x-1">
        <input type="checkbox" 
        defaultChecked={allowNumber}
        id="numberInput"
        onChange={()=>{
          setAllowNumber((prev)=> !prev);
        }}
        />
        <label>Allow Numbers</label>

      </div>

      <div className="flex justify-center items-center gap-x-1">
        <input type="checkbox"
               defaultValue={allowChar}
               id="charInput"
               onChange={
                ()=>{setAllowChar((prev) => !prev);}
               } />
        
        <label>Allow Character</label>

      </div>

    </div>
    </div>
    </>
  )
}

export default App
