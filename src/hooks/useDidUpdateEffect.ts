import { DependencyList, EffectCallback, MutableRefObject, useEffect, useRef } from 'react';

const useDidUpdateEffect = (effect: EffectCallback, deps: DependencyList | undefined) => {
  const didMountRef: MutableRefObject<boolean> = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return effect();
    }
    didMountRef.current = true;
  }, deps);
}

export default useDidUpdateEffect;
