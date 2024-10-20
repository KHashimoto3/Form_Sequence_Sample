import ReactCodeMirror from "@uiw/react-codemirror";
import React, { SetStateAction, useCallback } from "react";

import useTextDiff from "./useTextDiff";
import { TimestampContext } from "./TimestampProvider";

export const InputArea: React.FC = () => {
  const { textInput, setTextInput } = useTextDiff();
  const { recordTimestamp } = React.useContext(TimestampContext);

  const onChange = useCallback(
    (val: SetStateAction<string>) => {
      recordTimestamp();
      setTextInput(val);
    },
    [setTextInput]
  );

  return (
    <>
      <ReactCodeMirror value={textInput} onChange={onChange} />
    </>
  );
};
