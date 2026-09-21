import client from "../../../../src/api/client";
export const fetchDegrees = async() => {
    const response = await client.get(`/cv/degrees`);
    return response.data;
};