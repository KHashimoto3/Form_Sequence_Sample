import React, { useEffect } from "react";
import { createContext, Dispatch, SetStateAction } from "react";
import useInterval from "./useInterval";

export const TimestampContext = createContext(
  {} as {
    timestamp: number;
    isRunning: boolean;
    setIsRunning: Dispatch<SetStateAction<boolean>>;
  }
);

export const TimestampProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [timestamp, setTimestamp] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(true);

  useInterval(
    () => {
      setTimestamp(timestamp + 1);
    },
    isRunning ? 1 : null
  );

  useEffect(() => {
    if (!isRunning) {
      setTimestamp(0);
    }
  }, [isRunning]);

  return (
    <TimestampContext.Provider value={{ timestamp, isRunning, setIsRunning }}>
      {children}
    </TimestampContext.Provider>
  );
};
