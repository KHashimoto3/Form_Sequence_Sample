import ReactCodeMirror from "@uiw/react-codemirror";
import React, { SetStateAction, useCallback } from "react";

import useTextDiff from "./useTextDiff";

export const InputArea: React.FC = () => {
  const { textInput, setTextInput } = useTextDiff();

  const onChange = useCallback(
    (val: SetStateAction<string>) => {
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
