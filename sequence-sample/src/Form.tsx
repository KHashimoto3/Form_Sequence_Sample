import { InputArea } from "./components/InputArea";

import { TimestampContext } from "./components/TimestampProvider";
import { SequenceContext } from "./components/SequenceDataProvider";
import { useEffect } from "react";
import React from "react";

export const Form = () => {
  const { isRunning, setIsRunning } = React.useContext(TimestampContext);
  const { sequenceDataArray } = React.useContext(SequenceContext);

  useEffect(() => {
    if (isRunning) {
      console.log("start");
    } else {
      console.log("stop");
    }
  }, [isRunning]);

  return (
    <div>
      <h1>Sequence Sample</h1>
      <InputArea />
      <input
        type="checkbox"
        checked={isRunning}
        onChange={(e) => {
          setIsRunning(e.target.checked);
        }}
      />
      <br />
      <textarea
        readOnly
        value={JSON.stringify(sequenceDataArray)}
        rows={10}
        cols={50}
      />
    </div>
  );
};
