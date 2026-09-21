import client from "../../../../src/api/client";
export const fetchProfissionalExperiences = async() => {
    const response = await client.get(`/cv/profissional-experiences`);
    return response.data;
};