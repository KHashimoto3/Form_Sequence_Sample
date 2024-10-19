import React from "react";
import { createContext, Dispatch, SetStateAction } from "react";

export const TimestampContext = createContext(
  {} as {
    timestamp: number;
    setTimestamp: Dispatch<SetStateAction<number>>;
    resetTimestamp: () => void;
  }
);

export const TimestampProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [timestamp, setTimestamp] = React.useState(0);

  const resetTimestamp = () => {
    setTimestamp(0);
  };

  return (
    <TimestampContext.Provider
      value={{ timestamp, setTimestamp, resetTimestamp }}
    >
      {children}
    </TimestampContext.Provider>
  );
};
