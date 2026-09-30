import client from "../../../../src/api/client";
export const fetchHighlights = async() => {
    const response = await client.get(`/excerpt-page`);
    return response.data;
};
export const fetchCategories = async() => {
    const response = await client.get(`/excerpt/categories`);
    return response.data;
};
export const fetchCategoryContent = async (id) => {
  const response = await client.get(`/excerpt-category/content`, {
    params: { id },
  });
  return response.data;
  };