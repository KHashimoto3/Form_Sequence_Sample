import { useEffect } from "react";

const useInterval = (callback: () => void, delay?: number | null) => {
  useEffect(() => {
    if (delay) {
      const interval = setInterval(() => {
        callback();
      }, delay || 0);
      return () => clearInterval(interval);
    }
  }, [callback, delay]);
};

export default useInterval;
