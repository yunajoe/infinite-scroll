import { useState } from "react";
import "./App.css";
import { getWorkers } from "./api";
import UseInfiniteScroll from "./hooks/useInfiniteScroll";
import { WORKER } from "./type";

const LIMIT = 10;

function App() {
  const [page, setPage] = useState(1);
  const [workers, setWorkers] = useState<WORKER[] | []>([]);
  const [hasNext, setHasNext] = useState(true);

  const fetchData = async () => {
    console.log("page", page);
    const response = await getWorkers(page, LIMIT);
    if (response.totalCount === workers.length) {
      setHasNext(false);
    }
    setWorkers((prev) => [...prev, ...response.data]);
    setPage((prev) => prev + 1);
  };

  const ref = UseInfiniteScroll(fetchData, hasNext, page);

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
