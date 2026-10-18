import client from "../../../../src/api/client";
export const FetchExtraTabs = async () => {
  const response = await client.get(`/cv/extra-tabs`);
  return response.data;
};
