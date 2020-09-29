import { useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal';


const useDeepEffect = (fn: () => any, deps: any[]) => {
  const prevDeps = useRef(deps);
  const isFirstTime = useRef(true);

  useEffect(() => {
    if (isFirstTime.current) {
      console.log('render first', deps);
      fn();
      isFirstTime.current = false;
    } else if (!isEqual(prevDeps.current, deps)) {
      prevDeps.current = deps;
      console.log('render', deps);
      fn();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps, isFirstTime.current]);
};

export default useDeepEffect;
