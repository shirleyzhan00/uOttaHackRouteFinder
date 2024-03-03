import { useState } from "react";

import "./App.css";
import EvStation from "./EvStation";
import InputForm from "./InputForm";
import MapDisplay from "./MapDisplay";

function App() {
  const [sourceAddress, setSourceAddress] = useState("");
  const [destAddress, setDestAddress] = useState("");
  return (
    <div className="App" style={{ marginTop: 15 }}>
      <div className="LeftPanel">
        <InputForm
          setSourceAddress={setSourceAddress}
          setDestAddress={setDestAddress}
        />
        
      </div>
      <div className="RightPanel"><MapDisplay sourceAddress={sourceAddress} destAddress={destAddress} /></div>
     
    </div>
  );
}

export default App;
