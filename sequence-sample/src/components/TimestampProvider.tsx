import React, { useEffect } from "react";
import { createContext, Dispatch, SetStateAction } from "react";

export const TimestampContext = createContext(
  {} as {
    timestamp: number;
    isRunning: boolean;
    setIsRunning: Dispatch<SetStateAction<boolean>>;
    startTimer: () => void;
    recordTimestamp: () => void;
  }
);

export const TimestampProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [timestamp, setTimestamp] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const startTimeRef = React.useRef<number | null>(null);

  const startTimer = () => {
    setTimestamp(0);
    startTimeRef.current = performance.now();
  };

  const stopTimer = () => {
    setTimestamp(0);
    startTimeRef.current = null;
  };

  const recordTimestamp = () => {
    if (!startTimeRef.current) {
      return;
    }
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTimeRef.current;
    setTimestamp(Math.floor(elapsedTime));
  };

  useEffect(() => {
    if (isRunning) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [isRunning]);

  return (
    <TimestampContext.Provider
      value={{
        timestamp,
        isRunning,
        setIsRunning,
        startTimer,
        recordTimestamp,
      }}
    >
      {children}
    </TimestampContext.Provider>
  );
};
