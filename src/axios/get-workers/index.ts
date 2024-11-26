import { instance } from "..";

export const getWorkersData = async () => {
  const response = await instance.get("/workers");
  return response.data;
};
