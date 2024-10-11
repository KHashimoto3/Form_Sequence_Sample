import React from "react";

export const InputArea: React.FC = () => {
  const [beforeTextInput, setBeforeTextInput] = React.useState("");
  const [textInput, setTextInput] = React.useState("");

  //textarea1が変更されるたびに、追加されたか削除されたかを判定する
  const updateTextInput = (text: string) => {
    console.log("変更前のtextarea1: ", beforeTextInput);
    console.log("変更後のtextarea1: ", text);
    const diffLength = text.length - beforeTextInput.length;
    if (diffLength > 0) {
      console.log("追加:" + diffLength);
    } else if (diffLength < 0) {
      console.log("削除" + Math.abs(diffLength));
    }
    setBeforeTextInput(text);
    setTextInput(text);
  };

  return (
    <textarea
      rows={10}
      cols={50}
      value={textInput}
      onChange={(e) => {
        updateTextInput(e.target.value);
      }}
    />
  );
};
