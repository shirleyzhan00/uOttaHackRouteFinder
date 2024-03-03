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
        <MapDisplay sourceAddress={sourceAddress} destAddress={destAddress} />
      </div>
      <div className="RightPanel">
        <EvStation />
      </div>
    </div>
  );
}

export default App;
