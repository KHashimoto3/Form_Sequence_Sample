import ReactCodeMirror from "@uiw/react-codemirror";
import { SetStateAction, useCallback, useEffect } from "react";

import React from "react";
import useInterval from "./useInterval";

export const InputArea: React.FC = () => {
  const [beforeTextInput, setBeforeTextInput] = React.useState("");
  const [textInput, setTextInput] = React.useState("");

  //timestamp関連
  const [timestamp, setTimestamp] = React.useState(0);
  const delay = 100;
  const [isRunning, setIsRunning] = React.useState(false);

  useInterval(
    () => {
      setTimestamp(timestamp + 100);
    },
    isRunning ? delay : null
  );

  const onChange = useCallback((val: SetStateAction<string>) => {
    setTextInput(val);
  }, []);

  useEffect(() => {
    if (isRunning) {
      console.log("カウントアップが開始しました。");
    } else {
      console.log("カウントアップが停止しました。");
      setTimestamp(0);
    }
  }, [isRunning]);

  useEffect(() => {
    if (textInput === beforeTextInput) {
      return;
    }
    console.log("変更前のtextarea1: ", beforeTextInput);
    console.log("変更後のtextarea1: ", textInput);
    const diffLength = textInput.length - beforeTextInput.length;
    if (diffLength > 0) {
      console.log("追加:" + diffLength + "timestatmp:" + timestamp);
    } else if (diffLength < 0) {
      console.log("削除" + Math.abs(diffLength), "timestatmp:" + timestamp);
    }
    setBeforeTextInput(textInput);
  }, [textInput, beforeTextInput]);

  return (
    <>
      <ReactCodeMirror value={textInput} onChange={onChange} />
      <input
        type="checkbox"
        checked={isRunning}
        onChange={() => setIsRunning(!isRunning)}
      />
    </>
  );
};
