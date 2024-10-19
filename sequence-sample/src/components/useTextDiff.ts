import React, { useEffect } from "react";
import { TimestampContext } from "./TimestampProvider";
import { SequenceContext } from "./SequenceDataProvider";

import * as diff from "diff";
import { SequenceData } from "./types/sequenceData";

const useTextDiff = () => {
  const { timestamp } = React.useContext(TimestampContext);
  const [beforeTextInput, setBeforeTextInput] = React.useState("");
  const [textInput, setTextInput] = React.useState("");
  const { addNewSequenceData } = React.useContext(SequenceContext);

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
      from: {
        line: 0,
        ch: 0,
      },
      to: {
        line: 0,
        ch: 0,
      },
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

    const newSequence: SequenceData = {
      id: 1,
      partType: "textarea1",
      timestamp: timestamp,
      changeData: changeData,
    };

    addNewSequenceData(newSequence);

    setBeforeTextInput(textInput);
  }, [textInput, beforeTextInput]);

  return { textInput, setTextInput };
};

export default useTextDiff;
