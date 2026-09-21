import client from "../../../../src/api/client";
export const fetchContactInfo = async() => {
    const response = await client.get(`/contact-us-page`);
    return response.data;
};