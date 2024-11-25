import { useEffect, useState } from "react";
import { getWorkers } from "./api";
import "./App.css";
import { ITEM } from "./type";

const LIMIT = 10;

function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<[] | ITEM[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getWorkers(page, LIMIT);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    </>
  );
}

export default App;
