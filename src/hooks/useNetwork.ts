import { useEffect, useState } from 'react';

const useNetwork = () => {
  const [state, setState] = useState(navigator.onLine);

  useEffect(() => {
    setInterval(() => {
      if (state !== navigator.onLine) {
        setState(navigator.onLine);
      }
    }, 1000);
  }, [state]);

  return state;
};

export default useNetwork;
