import client from "../../../../src/api/client";
export const fetchLinksPage = async() => {
    const response = await client.get(`/links-page`);
    return response.data;
};
export const fetchLinks = async() => {
    const response = await client.get(`/links`);
    return response.data;
};