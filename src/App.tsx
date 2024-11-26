import { useCallback, useEffect, useRef, useState } from "react";
import { getWorkers } from "./api";
import "./App.css";
import { WORKER } from "./type";

const LIMIT = 10;
function App() {
  const [page, setPage] = useState(1);
  const [workers, setWorkers] = useState<WORKER[] | []>([]);
  const [hasNext, setHasNext] = useState(true);

  const ref = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    const response = await getWorkers(page, LIMIT);
    if (response.totalCount === workers.length) {
      setHasNext(false);
    }
    setWorkers((prev) => [...prev, ...response.data]);
    setPage((prev) => prev + 1);
  };
  const options = {
    root: null,
    rootMargin: "0px",
    treshold: 1,
  };
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNext) {
          fetchData();
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

  return (
    <>
      {workers.map((worker) => (
        <div
          key={worker.id}
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
