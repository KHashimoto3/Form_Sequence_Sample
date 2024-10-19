import ReactCodeMirror from "@uiw/react-codemirror";
import { SetStateAction, useCallback, useEffect } from "react";

import { TimestampContext } from "./TimestampProvider";

import React from "react";
import useInterval from "./useInterval";

import * as diff from "diff";

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
  const { timestamp, setTimestamp, resetTimestamp } =
    React.useContext(TimestampContext);
  const delay = 1;
  const [isRunning, setIsRunning] = React.useState(false);

  useInterval(
    () => {
      setTimestamp(timestamp + 1);
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
      console.log("sequenceList: ", sequenceList);
      resetTimestamp();
      resetSequenceList();
    }
  }, [isRunning]);

  const resetSequenceList = () => {
    setSequenceList([]);
  };

  const calculateDiff = (before: string, after: string) => {
    const changes = diff.diffChars(before, after);

    let added = "";
    let removed = "";

    changes.forEach((change) => {
      if (change.added) {
        added += change.value;
      } else if (change.removed) {
        removed += change.value;
      }
    });

    return { added, removed };
  };

  useEffect(() => {
    if (textInput === beforeTextInput) {
      return;
    }

    const changeData = {
      text: [""],
      removed: [""],
      origin: "",
    };

    //ライブラリを使用して差分を取得
    const { added, removed } = calculateDiff(beforeTextInput, textInput);

    if (added.length > 0) {
      changeData.text = [added];
      changeData.origin = "+input";
    } else if (removed.length > 0) {
      changeData.removed = [removed];
      changeData.origin = "+delete";
    }

    const newSequence = {
      id: 1,
      partType: "textarea1",
      timestamp: timestamp,
      changeData: changeData,
    };

    setSequenceList([...sequenceList, newSequence]);

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
