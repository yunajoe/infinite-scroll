import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const PAGE_SIZE = 20;

function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<[] | any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);
  const [numberArr, setNumberArr] = useState([]);

  const ref = useRef<HTMLDivElement>(null);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  const fetchMoreData = useCallback(() => {
    if (numberArr.length === 0) {
      return;
    }
    const newData = numberArr.slice(
      page * PAGE_SIZE,
      PAGE_SIZE + page * PAGE_SIZE
    );
    setData([...data, ...newData]);
    setPage(page + 1);
    setNextPage(data.length < numberArr.length);
    setIsLoading(false);
  }, [page, numberArr]);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchMoreData();
        }
      });
    },
    [page, numberArr]
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, callback, options]);

  const fetchhandler = async () => {
    setIsLoading(true);
    const response = await fetch("https://example.com/user");
    const jsonData = await response.json();
    setIsLoading(false);
    return jsonData;
  };

  useEffect(() => {
    fetchhandler().then((data) => {
      setNumberArr(data.users);
      setData(data.users.slice(0, 20));
    });
  }, []);

  return (
    <>
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
            {item.firstName}
          </div>
        );
      })}
      {isLoading && <div>로오딩</div>}
      <div ref={ref} style={{ margin: "10px" }}></div>
    </>
  );
}

export default App;
