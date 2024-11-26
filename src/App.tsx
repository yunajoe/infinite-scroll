import { useEffect, useState } from "react";
import { getWorkers } from "./api";
import "./App.css";
import UseInfiniteScroll from "./hooks/useInfiniteScroll";
import { ITEM } from "./type";

const LIMIT = 20;

function App() {
  const [data, setData] = useState<[] | ITEM[]>([]);
  const [workers, setWorkers] = useState<[] | ITEM[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  //  더 불러오기

  const fetchMoreData = () => {
    if (data.length === workers.length) {
      setHasNext(false);
      return;
    }
    setWorkers((prev) => [
      ...prev,
      ...data.slice(page * LIMIT, page * LIMIT + LIMIT),
    ]);
    setPage((prev) => prev + 1);
  };

  const ref = UseInfiniteScroll(fetchMoreData, hasNext, page);

  // 처음 mount될 떄 데이터 불러오기
  useEffect(() => {
    const fetchInitData = async () => {
      setIsLoading(true);
      const response = await getWorkers();
      setData(response.data);
      setWorkers(response.data.slice(0, LIMIT));
      setPage((prev) => prev + 1);
      setIsLoading(false);
    };
    fetchInitData();
  }, []);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <div>
      {workers.map((item) => {
        return (
          <div
            key={item.id}
            style={{
              width: "150px",
              height: "300px",
              border: "5px solid blue",
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

export default App;
