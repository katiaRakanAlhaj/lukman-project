import client from "../../../../src/api/client";
export const fetchHomePage = async() => {
    const response = await client.get(`/home-page`);
    return response.data;
};