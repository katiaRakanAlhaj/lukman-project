import client from "../../../api/client";
export const fetchVideos = async (filters = {}) => {
  const params = {};
  if (filters.language) params.language = filters.language;
  if (filters.category && filters.category !== "all") params.category = filters.category;
  if (filters.sort) params.sort = filters.sort;

  const response = await client.get(`/videos`, { params });
  return response.data;
};

export const fetchVideosPage = async () => {
  const response = await client.get(`/video-page`);
  return response.data;
};

export const fetchVideoCategory = async () => {
  const response = await client.get(`/video/category`);
  return response.data;
};