import { useEffect, useState } from 'react';
import { isMobileDevice, prefersReducedMotion } from '../utils/device';

export function useMobilePerformance() {
  const [state, setState] = useState(() => {
    const mobile = isMobileDevice();
    const reduced = prefersReducedMotion();
    return {
      isMobile: mobile,
      reduceMotion: reduced,
      reduceEffects: mobile || reduced,
    };
  });

  useEffect(() => {
    const update = () => {
      const mobile = isMobileDevice();
      const reduced = prefersReducedMotion();
      setState({
        isMobile: mobile,
        reduceMotion: reduced,
        reduceEffects: mobile || reduced,
      });
    };
    update();
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return state;
}
