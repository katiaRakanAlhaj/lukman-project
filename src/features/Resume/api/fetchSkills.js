import client from "../../../../src/api/client";
export const fetchSkills = async() => {
    const response = await client.get(`/cv/skills`);
    return response.data;
};