import client from "../../../../src/api/client";
export const fetchLanguages = async() => {
    const response = await client.get(`/cv/languages`);
    return response.data;
};