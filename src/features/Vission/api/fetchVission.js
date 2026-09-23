import client from "../../../../src/api/client";
export const fetchVissionPage = async() => {
    const response = await client.get(`/visions-page`);
    return response.data;
};
export const fetchVissionCategoryContent = async() => {
    const response = await client.get(`/vision/category-content`);
    return response.data;
};