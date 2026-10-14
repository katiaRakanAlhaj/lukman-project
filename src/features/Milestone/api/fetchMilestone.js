import client from "../../../../src/api/client";
export const fetchMilestoneCategory = async() => {
    const response = await client.get(`/milestone/category`);
    return response.data;
};