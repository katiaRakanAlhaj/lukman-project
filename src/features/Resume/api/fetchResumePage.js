import client from "../../../../src/api/client";
export const fetchResumePage = async() => {
    const response = await client.get(`/cv-page`);
    return response.data;
};