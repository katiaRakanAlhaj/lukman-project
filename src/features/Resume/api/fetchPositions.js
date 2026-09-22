import client from "../../../../src/api/client";
export const fetchPositions = async() => {
    const response = await client.get(`/cv/positions`);
    return response.data;
};