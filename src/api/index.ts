export const getWorkers = async (page: number, limit: number) => {
  const response = await fetch(
    `https://crystarvisioin/workers?page=${page}&limit=${limit}`
  );
  const jsonData = await response.json();
  return jsonData;
};
