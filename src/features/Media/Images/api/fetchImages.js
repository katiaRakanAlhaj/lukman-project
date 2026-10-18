import client from "../../../../../src/api/client";

export const fetchImagesCategory = async () => {
  const response = await client.get(`/image-folders`);
  return response.data;
};

// ✅ New: fetch images for a specific folder + page
export const fetchImages = async ({ id, page = 1 }) => {
  if (!id) return { data: [], meta: {} }; // safe guard
  const response = await client.get(`/image-folders/${id}/images`, {
    params: { page },
  });
  return response.data;
};