import client from "../../../../src/api/client";
export const fetchSingleArticle = async (id) => {
  const response = await client.get(`/article`, {
    params: { id },
  });
  return response.data;
};
export const fetchArticles = async() => {
    const response = await client.get(`/articles`);
    return response.data;
};