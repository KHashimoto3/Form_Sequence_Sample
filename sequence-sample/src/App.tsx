import { SequenceDataProvider } from "./components/SequenceDataProvider";
import { TimestampProvider } from "./components/TimestampProvider";
import { Form } from "./Form";

function App() {
  return (
    <>
      <TimestampProvider>
        <SequenceDataProvider>
          <div>
            <Form />
          </div>
        </SequenceDataProvider>
      </TimestampProvider>
    </>
  );
}

export default App;
