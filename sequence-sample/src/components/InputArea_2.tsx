import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/clike/clike"; // C言語モードをインポート
import "codemirror/addon/edit/closebrackets"; // 括弧補完のアドオン

import { Controlled as CodeMirror } from "react-codemirror2";
import { SetStateAction, useCallback, useEffect } from "react";

import React from "react";
import useInterval from "./useInterval";

interface Sequence {
  id: number;
  partType: string;
  timestamp: number;
  changeData: {
    text: string[];
    removed: string[];
    origin: string;
  };
}

export const InputArea: React.FC = () => {
  const [beforeTextInput, setBeforeTextInput] = React.useState("");
  const [textInput, setTextInput] = React.useState("");

  const [sequenceList, setSequenceList] = React.useState<Sequence[]>([]);

  //timestamp関連
  const [timestamp, setTimestamp] = React.useState(0);
  const delay = 1;
  const [isRunning, setIsRunning] = React.useState(false);

  useInterval(
    () => {
      setTimestamp(timestamp + 1);
    },
    isRunning ? delay : null
  );

  /*const onChange = useCallback((val: SetStateAction<string>) => {
    setTextInput(val);
  }, []);*/

  useEffect(() => {
    if (isRunning) {
      console.log("カウントアップが開始しました。");
    } else {
      console.log("カウントアップが停止しました。");
      console.log("sequenceList: ", sequenceList);
      setTimestamp(0);
      resetSequenceList();
    }
  }, [isRunning]);

  const resetSequenceList = () => {
    setSequenceList([]);
  };

  const handleChange = (editor, data, value) => {
    const { from, to, text, removed } = data;
    const changeData = {
      text: text,
      removed: removed,
      origin: "",
    };

    const newSequence = {
      id: 1,
      partType: "textarea1",
      timestamp: timestamp,
      changeData: changeData,
    };

    setSequenceList([...sequenceList, newSequence]);
  };

  /*useEffect(() => {
    if (textInput === beforeTextInput) {
      return;
    }

    const changeData = {
      text: [""],
      removed: [""],
      origin: "",
    };

    //console.log("変更前のtextarea1: ", beforeTextInput);
    //console.log("変更後のtextarea1: ", textInput);
    /*const diffLength = textInput.length - beforeTextInput.length;
    if (diffLength > 0) {
      //console.log("追加:" + diffLength + "timestatmp:" + timestamp);
      changeData.text = [createText(diffLength)];
      changeData.origin = "+input";
    } else if (diffLength < 0) {
      //console.log("削除" + Math.abs(diffLength), "timestatmp:" + timestamp);
      changeData.removed = [createText(Math.abs(diffLength))];
      changeData.origin = "+delete";
    }

    const result = findAddedAndRemovedChars(beforeTextInput, textInput);
    if (result.added.length > 0) {
      changeData.text = result.added.map((char) => char.char.repeat(char.count));
      changeData.origin = "+input";
    } else if (result.removed.length > 0) {
      changeData.removed = result.removed.map((char) => char.char.repeat(char.count));
      changeData.origin = "+delete";
    }

    //ライブラリを使用して差分を取得

    const newSequence = {
      id: 1,
      partType: "textarea1",
      timestamp: timestamp,
      changeData: changeData,
    };

    setSequenceList([...sequenceList, newSequence]);

    setBeforeTextInput(textInput);
  }, [textInput, beforeTextInput]);*/

  return (
    <>
      <CodeMirror
        value={textInput}
        options={{
          mode: "text/x-csrc",
          theme: "material",
          lineNumbers: true,
          autoCloseBrackets: {
            pairs: "()[]{}''\"\"",
            explode: "()[]{}",
          },
        }}
        onBeforeChange={(editor, data, value) => {
          setTextInput(value);
        }}
        onChange={handleChange}
      />
      <input
        type="checkbox"
        checked={isRunning}
        onChange={() => setIsRunning(!isRunning)}
      />
    </>
  );
};
