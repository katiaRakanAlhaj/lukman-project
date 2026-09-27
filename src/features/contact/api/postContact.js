import client from "../../../api/client";
export const ContactUs = async(data) => {
    const response = await client.post(`/contact`, data);
    return response;
};