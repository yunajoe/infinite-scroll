import { useCallback, useEffect, useRef } from "react";

function UseInfiniteScroll(
  callback: () => void,
  hasNext: boolean,
  page: number
) {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  const ref = useRef<HTMLDivElement>(null);
  const observerCallback = useCallback(
    (entires: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entires.forEach((entry) => {
        if (entry.isIntersecting && hasNext) {
          callback();
        }
      });
    },
    [page]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, options);
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref.current, observerCallback]);
  return ref;
}

export default UseInfiniteScroll;
