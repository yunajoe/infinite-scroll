import { useCallback, useEffect, useRef } from "react";

function UseInfiniteScroll(
  callback: () => void,
  hasNext: boolean,
  page: number
) {
  const ref = useRef<HTMLDivElement>(null);
  const options = {
    root: null,
    rootMargin: "0px",
    thresdhold: 1,
  };
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
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
