import { useState } from "react";
import "./App.css";
import VideoRoom from "./components/VideoRoom";

function App() {
  const [joined, setJoined] = useState(false);
  return (
    <div>
      <h1>WDJ Virtual Call</h1>
      {!joined && <button onClick={() => setJoined(true)}>join room</button>}

      {joined && <VideoRoom setJoined={setJoined} />}
    </div>
  );
}

export default App;
