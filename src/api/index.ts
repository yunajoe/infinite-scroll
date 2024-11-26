export const getWorkers = async (page: number, limit: number) => {
  const response = await fetch(
    `https://crystalvision/workers?page=${page}&limit=${limit}`
  );
  const jsonData = response.json();
  return jsonData;
};
