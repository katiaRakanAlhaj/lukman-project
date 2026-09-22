import client from "../../../../src/api/client";
export const fetchActivitiesPage = async() => {
    const response = await client.get(`/activities-page`);
    return response.data;
};
export const fetchCategoryContent = async() => {
    const response = await client.get(`/activity/category-content`);
    return response.data;
};