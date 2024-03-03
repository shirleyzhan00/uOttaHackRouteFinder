import React, { useState } from "react";

import "./App.css";
import InputForm from "./InputForm";
import MapDisplay from "./MapDisplay";

function App() {
  const [sourceAddress, setSourceAddress] = useState("");
  const [destAddress, setDestAddress] = useState("");
  const [temperature, setTemp] = useState("");
  const [carModel, setModel] = useState("");
  const [percentage, setPercent] = useState(0);

  return (
    <div className="App" style={{ marginTop: 15 }}>
      <div className="LeftPanel">
        <InputForm
          setSourceAddress={setSourceAddress}
          setDestAddress={setDestAddress}
          setTemp={setTemp}
          setModel={setModel}
          setPercent={setPercent}
        />
        
      </div>
      <div className="RightPanel">
        <MapDisplay
          sourceAddress={sourceAddress}
          destAddress={destAddress}
          temperature={temperature}
          carModel={carModel}
          percentage={percentage}
        />
      </div>
    </div>
  );
}

export default App;
