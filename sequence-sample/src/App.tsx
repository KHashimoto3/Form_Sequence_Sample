import React from "react";

function App() {
  const [beforeTextInput1, setBeforeTextInput1] = React.useState("");
  const [beforeTextInput2, setBeforeTextInput2] = React.useState("");
  const [textInput1, setTextInput1] = React.useState("");
  const [textInput2, setTextInput2] = React.useState("");

  //textarea1が変更されるたびに、追加されたか削除されたかを判定する
  const updateTextInput1 = (text: string) => {
    console.log("変更前のtextarea1: ", beforeTextInput1);
    console.log("変更後のtextarea1: ", text);
    const diffLength = text.length - beforeTextInput1.length;
    if (diffLength > 0) {
      console.log("追加:" + diffLength);
    } else if (diffLength < 0) {
      console.log("削除" + Math.abs(diffLength));
    }
    setBeforeTextInput1(text);
    setTextInput1(text);
  };

  const updateTextInput2 = (text: string) => {
    console.log("工事中");
  };

  return (
    <>
      <div>
        <h1>Sequence Sample</h1>
        <textarea
          rows={10}
          cols={50}
          value={textInput1}
          onChange={(e) => {
            updateTextInput1(e.target.value);
          }}
        />
        <br />
        <textarea
          rows={10}
          cols={50}
          value={textInput2}
          onChange={(e) => updateTextInput2(e.target.value)}
        />
      </div>
      <div>
        beforetextarea1: {beforeTextInput1} <br />
        beforetextarea2: {beforeTextInput2} <br />
        textarea1: {textInput1} <br />
        textarea2: {textInput2} <br />
      </div>
    </>
  );
}

export default App;
