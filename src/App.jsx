import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [password,setPassword]=useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const refPassword=useRef(null);
  const highLightPass=()=>{
    refPassword.current.focus()
    refPassword.current?.select();
    refPassword.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }


  const generatePassword=useCallback(()=>{
    let pass="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let newPassword=""
    if(numberAllowed){
      pass+="1234567890"
    }
    if(charAllowed){
      pass+="!@#$%^&*()_+"
    }
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*(pass.length)+1)

      newPassword+=pass.charAt(char)
    }
    setPassword(newPassword);
  },[length,setPassword,numberAllowed,charAllowed])
  useEffect(()=>{generatePassword()},[setPassword,charAllowed,numberAllowed,length])
  return (
    <div className="w-full h-screen flex flex-wrap justify-center ">
      <div className="w-1/2 h-1/3 bg-slate-200 text-blue-950 p-3 rounded-lg shadow-lg sm:flex-row">
        <div className="text-3xl font-bold p-5">
          <h1>P/w Generator</h1>
        </div>
        <div className="m-3  flex  justify-center">
          <input className="pl-2 rounded-lg shadow-lg" type="text" ref={refPassword} value={password}  placeholder="Password" />
          <button onClick={highLightPass} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-lg">Copy</button>
        </div>
        <div className="m-3 flex sm:flex-col justify-center">
          <div className="flex justify-center items-center">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex justify-center items-center gap-x-1 mx-4">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex justify-center items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
