import { useState, useEffect } from 'react';

const useData = <T>(url: string): T | undefined => {
  const [data, setData] = useState<T>();

  useEffect(() => {
    let ignore = false;

    fetch(url)
      .then((res) => res.json())
      .then((resDate: T) => {
        if (!ignore) {
          setData(resDate);
        }
      })
      .catch((e: string) => {
        throw new Error(e);
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return data;
};

export default useData;
