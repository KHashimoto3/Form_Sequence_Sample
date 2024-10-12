import ReactCodeMirror from "@uiw/react-codemirror";
import { SetStateAction, useCallback, useEffect } from "react";

import React from "react";

export const InputArea: React.FC = () => {
  const [beforeTextInput, setBeforeTextInput] = React.useState("");
  const [textInput, setTextInput] = React.useState("");

  const onChange = useCallback((val: SetStateAction<string>) => {
    setTextInput(val);
  }, []);

  useEffect(() => {
    if (textInput === beforeTextInput) {
      return;
    }
    console.log("変更前のtextarea1: ", beforeTextInput);
    console.log("変更後のtextarea1: ", textInput);
    const diffLength = textInput.length - beforeTextInput.length;
    if (diffLength > 0) {
      console.log("追加:" + diffLength);
    } else if (diffLength < 0) {
      console.log("削除" + Math.abs(diffLength));
    }
    setBeforeTextInput(textInput);
  }, [textInput, beforeTextInput]);

  return (
    <>
      <ReactCodeMirror value={textInput} onChange={onChange} />
    </>
  );
};
