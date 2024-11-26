export const getWorkers = async () => {
  const response = await fetch("https://crystarvision/workers");
  const jsonData = await response.json();
  return jsonData;
};
