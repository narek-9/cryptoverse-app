import { useEffect, useState } from "react";

export const useTimeCache = () => {
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

  useEffect(() => {
    const cachedTime = localStorage.getItem("lastFetchTime");

    if (cachedTime) {
      setLastFetchTime(Number(cachedTime));
    } else {
      const currentDate = new Date().getTime();
      setLastFetchTime(currentDate);
      localStorage.setItem("lastFetchTime", String(currentDate));
    }
  }, []);

  const updateLastFetchTime = () => {
    const currentDate = new Date().getTime();
    setLastFetchTime(currentDate);
    localStorage.setItem("lastFetchTime", String(currentDate));
  };

  return { lastFetchTime, updateLastFetchTime };
};
