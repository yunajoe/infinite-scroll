import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { getWorkers } from "./api";
import { ITEM } from "./type";

const LIMIT = 10;

function App() {
  const [workers, setWorkers] = useState<[] | ITEM[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const ref = useRef<HTMLDivElement | null>(null);

  const fetchWorkers = async () => {
    console.log("page", page);
    setIsLoading(true);
    const response = await getWorkers(page, LIMIT);
    if (response.totalCount === workers.length) {
      setHasNext(false);
      return;
    }

    setWorkers((prev) => [...prev, ...response.data]);
    setIsLoading(false);
    setPage((prev) => prev + 1);
  };
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNext) {
          console.log("API 를 호출합니다");
          fetchWorkers();
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

  useEffect(() => {
    fetchWorkers();
  }, []);

  if (isLoading) {
    return <h1>로딩중</h1>;
  }

  return (
    <>
      {workers.map((item) => (
        <div
          key={item.id}
          style={{ width: "150px", height: "300px", border: "1px solid blue" }}
        >
          {item.name}
        </div>
      ))}
      <div ref={ref} style={{ margin: "10px" }}></div>
    </>
  );
}

export default App;
