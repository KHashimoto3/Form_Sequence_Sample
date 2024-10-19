import React from "react";
import { InputArea } from "./components/InputArea";
import { TimestampProvider } from "./components/TimestampProvider";

function App() {
  return (
    <>
      <TimestampProvider>
        <div>
          <h1>Sequence Sample</h1>
          <InputArea />
        </div>
      </TimestampProvider>
    </>
  );
}

export default App;
