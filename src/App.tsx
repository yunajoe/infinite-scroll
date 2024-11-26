import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { getWorkersData } from "./axios/get-workers";
import Workers from "./components/workers";

function App() {
  const useWorkerQuery = useQuery({
    queryKey: ["workers"],
    queryFn: getWorkersData,
    select: (data) => {
      return data.data;
    },
  });
  if (useWorkerQuery.isFetching) {
    return <h1>로딩...</h1>;
  }

  if (useWorkerQuery.isError) {
    return <h1>useWorkerQuery.error</h1>;
  }

  return <Workers data={useWorkerQuery.data} />;
}

export default App;
