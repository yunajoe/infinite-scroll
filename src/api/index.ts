export const getWorkers = async () => {
  const response = await fetch("https://crystarvisions/workers");
  const jsonData = await response.json();
  return jsonData;
};
