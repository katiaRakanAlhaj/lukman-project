import client from "../../../../src/api/client";
export const fetchSingleMilestone = async (id) => {
  const response = await client.get(`/milestone`, {
    params: { id },
  });
  return response.data;
};
export const fetchMilestones = async() => {
    const response = await client.get(`/milestones`);
    return response.data;
};