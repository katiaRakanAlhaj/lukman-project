import client from "../../../../src/api/client";
export const fetchUnitedNationCategory = async() => {
    const response = await client.get(`/united-nations-category`);
    return response.data;
};
export const fetchUnitedNationCategoryById = async (id) => {
  const response = await client.get(`/united-nations-category/content`, {
    params: { id },
  });
  return response.data;
};