import { useCallback, useEffect, useRef } from "react";

function UseInfiniteScroll(func: () => void, hasNext: boolean, page: number) {
  const ref = useRef<HTMLDivElement | null>(null);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNext) {
          console.log("API를 한번 더 호올출");
          func();
        }
      });
    },
    [page]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [callback]);
  return ref;
}

export default UseInfiniteScroll;
