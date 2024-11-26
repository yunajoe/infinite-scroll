import { useEffect, useState } from "react";
import "./App.css";
import { getWorkers } from "./api";
import UseInfiniteScroll from "./hooks/useInfiniteScroll";
import { ITEM } from "./type";

const LIMIT = 20;

function App() {
  const [data, setData] = useState<[] | ITEM[]>([]);
  const [workers, setWorkers] = useState<[] | ITEM[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const fetchMoreData = () => {
    console.log("page입니당", page);
    if (data.length > 0) {
      if (data.length === workers.length) {
        setHasNext(false);
        return;
      }
    }
    if (page >= 1) {
      setWorkers((prev) => [
        ...prev,
        ...data.slice(page * LIMIT, page * LIMIT + LIMIT),
      ]);
      setPage((prev) => prev + 1);
    }
  };

  const ref = UseInfiniteScroll(fetchMoreData, hasNext, page);

  const fetchInitData = async () => {
    const response = await getWorkers();
    setData(response.data);
    setWorkers(response.data.slice(page, LIMIT));
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  return (
    <>
      {workers.map((worker) => (
        <div
          style={{ width: "150px", height: "300px", border: "1px solid blue" }}
          key={worker.id}
        >
          {worker.firstName}
        </div>
      ))}
      <div ref={ref} style={{ margin: "10px" }}></div>
    </>
  );
}

export default App;
