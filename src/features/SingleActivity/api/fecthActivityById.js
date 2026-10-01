import client from "../../../../src/api/client";
export const fetchSingleActivity = async (id) => {
  const response = await client.get(`/activity`, {
    params: { id },
  });
  return response.data;
};