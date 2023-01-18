import { useEffect, useState } from 'react';

export function useOnScreen(
  ref: React.MutableRefObject<Element>,
  rootMargin = '0px',
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref, rootMargin]);

  return isIntersecting;
}
