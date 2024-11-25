import { useCallback, useEffect, useState } from "react";
import "./App.css";
import useThrottle from "./hooks/useThrottle";

const PAGE_SIZE = 20;

function App() {
  const numberArr = Array.from({ length: 100 }, (_, index) => index + 1);
  const [page, setPage] = useState(0);
  const [data, setData] = useState<[] | number[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const fetchMoreData = useCallback(() => {
    const newData = numberArr.slice(
      page * PAGE_SIZE,
      PAGE_SIZE + page * PAGE_SIZE
    );

    setData([...data, ...newData]);
    setPage(page + 1);
    setNextPage(data.length < numberArr.length);
    setIsFetching(false);
  }, [page]);
  const handleScroll = () => {
    let { scrollTop, offsetHeight, scrollHeight } = document.documentElement;
    if (window.innerHeight + scrollTop > offsetHeight * 0.7) {
      setIsFetching(true);
    }
  };

  const throttleScroll = useThrottle(handleScroll);

  useEffect(() => {
    // const handleScroll = () => {
    //   let { scrollTop, offsetHeight, scrollHeight } = document.documentElement;
    //   if (window.innerHeight + scrollTop > offsetHeight * 0.7) {
    //     setIsFetching(true);
    //   }
    // };
    throttleScroll();

    setIsFetching(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) {
      fetchMoreData();
    }
    if (!hasNextPage) {
      setIsFetching(false);
    }
  }, [isFetching]);

  return (
    <div>
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
      {isFetching && <h1 style={{ background: "red" }}>로오딩</h1>}
    </div>
  );
}

export default App;
