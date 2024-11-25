import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const PAGE_SIZE = 20;

function App() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<[] | number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const numberArr = Array.from({ length: 100 }, (_, index) => index + 1);

  const ref = useRef<HTMLDivElement>(null);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  const fetchMoreData = useCallback(() => {
    const newData = numberArr.slice(
      page * PAGE_SIZE,
      PAGE_SIZE + page * PAGE_SIZE
    );

    setData([...data, ...newData]);
    setPage(page + 1);
    setNextPage(data.length < numberArr.length);
    setIsLoading(false);
  }, [page]);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchMoreData();
          setIsLoading(true);
        }
      });
    },
    [page]
  );
  const handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    if (window.innerWidth + scrollTop > offsetHeight * 0.5) {
      setIsFetching(true);
    }
  };
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, callback, options]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log("isLoading", isLoading);
  // console.log("isFecthing", isFetching);

  return (
    <>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              border: "1px solid blue",
              margin: "10px",
              width: "150px",
              height: "200px",
            }}
          >
            {item}
          </div>
        );
      })}
      {isLoading && <div>로오딩</div>}
      <div ref={ref} style={{ margin: "10px" }}></div>
    </>
  );
}

export default App;
