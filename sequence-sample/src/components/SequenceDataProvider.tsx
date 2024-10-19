import { SequenceData } from "./types/sequenceData";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const SequenceContext = createContext(
  {} as {
    sequenceDataArray: SequenceData[];
    setSequenceDataArray: Dispatch<SetStateAction<SequenceData[]>>;
    addNewSequenceData: (sequenceData: SequenceData) => void;
  }
);

export const SequenceDataProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [sequenceDataArray, setSequenceDataArray] = useState<SequenceData[]>(
    []
  );

  const addNewSequenceData = (sequenceData: SequenceData) => {
    setSequenceDataArray([...sequenceDataArray, sequenceData]);
  };

  return (
    <SequenceContext.Provider
      value={{
        sequenceDataArray,
        setSequenceDataArray,
        addNewSequenceData,
      }}
    >
      {children}
    </SequenceContext.Provider>
  );
};
