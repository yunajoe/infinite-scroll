import { useEffect, useState } from "react";
import { getWorkers } from "./api";
import "./App.css";
import { ITEM } from "./type";

function App() {
  const [data, setData] = useState<[] | ITEM[]>([]);

  const fetchData = async () => {
    const response = await getWorkers();
    return response;
  };

  useEffect(() => {}, []);

  return <></>;
}

export default App;
