import { useCallback, useEffect, useRef, useState } from "react";
import { ITEM } from "../type";

type WorkersProps = {
  data: ITEM[];
};

const LIMIT = 20;

function Workers({ data }: WorkersProps) {
  const [totalData, setTotalData] = useState<ITEM[]>(data);
  const [workers, setWorkers] = useState<[] | ITEM[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const fetchMoreData = () => {
    if (totalData.length > 0) {
      if (workers.length === totalData.length) {
        setHasNext(false);
        return;
      }
    }

    if (page >= 1) {
      console.log("fetchmoreData", page);
      setWorkers((prev) => [
        ...prev,
        ...totalData.slice(page * LIMIT, page * LIMIT + LIMIT),
      ]);
      setPage((prev) => prev + 1);
    }
  };

  const ref = useRef<HTMLDivElement | null>(null);
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNext) {
          fetchMoreData();
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
    setWorkers(totalData.slice(page, LIMIT));
    setPage((prev) => prev + 1);
  }, []);
  console.log("workes", workers);

  return (
    <div>
      {workers.map((item) => {
        return (
          <div
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
      <div ref={ref} style={{ margin: "10px" }}></div>
    </div>
  );
}

export default Workers;
