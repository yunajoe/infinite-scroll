import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { WORKER } from "./type";

const LIMIT = 10;

function App() {
  const [count, setCount] = useState(0);
  const [totalData, setTotalData] = useState<WORKER[] | []>([]);
  const [workersData, setWorkersData] = useState<WORKER[] | []>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const workers = Array.from({ length: 100 }, (_, index) => ({
    id: `ID-${index + 1}`,
    name: `name-${index + 1}`,
  }));

  const ref = useRef<HTMLDivElement | null>(null);

  const fetchWorkers = () => {
    if (workersData.length === workers.length) {
      setHasNext(false);
    }

    setWorkersData((prev) => [
      ...prev,
      ...totalData.slice(page * LIMIT, page * LIMIT + LIMIT),
    ]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setTotalData(workers);
    setWorkersData(workers.slice(0, LIMIT));
  }, []);
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNext) {
          fetchWorkers();
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
  }, [ref.current, callback]);

  return (
    <>
      {workersData.map((worker) => (
        <div
          style={{ width: "150px", height: "300px", border: "1px solid blue" }}
        >
          {worker.name}
        </div>
      ))}
      <div ref={ref} style={{ margin: "10px" }}></div>
    </>
  );
}

export default App;
