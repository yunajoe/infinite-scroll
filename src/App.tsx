import { useCallback, useEffect, useRef, useState } from "react";
import { getWorkers } from "./api";
import "./App.css";
import { ITEM } from "./type";

const LIMIT = 10;

function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<[] | ITEM[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const targetRef = useRef<null | HTMLDivElement>(null);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
    },
    []
  );

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getWorkers(page, LIMIT);
    if (response.meta.totalCount === data.length) {
      setHasNext(false);
    }
    if (data.length === 0) {
      setData(response.data);
    } else {
      setData((prev) => [...prev, ...response.data]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, options);
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => observer.disconnect();
  }, [targetRef.current, observerCallback, options]);

  useEffect(() => {
    if (hasNext) {
      fetchData();
    }
  }, [page]);

  if (isLoading) {
    return <h1>로딩중</h1>;
  }

  return (
    <>
      {data.map((item) => {
        return (
          <div
            key={item.id}
            style={{
              width: "150px",
              height: "300px",
              border: "1px solid blue",
            }}
          >
            {item.firstName}
          </div>
        );
      })}
      <div ref={targetRef} style={{ margin: "10px" }}></div>
    </>
  );
}

export default App;
