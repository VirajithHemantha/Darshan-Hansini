/** True on phones/tablets and coarse-pointer devices (incl. most iPhones). */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const narrowViewport = window.matchMedia('(max-width: 768px)').matches;
  const mobileUa = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  return mobileUa || (coarsePointer && narrowViewport);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function shouldReduceEffects(): boolean {
  return isMobileDevice() || prefersReducedMotion();
}
