import client from "../../../../src/api/client";

export const fetchArticlesCategory = async() => {
    const response = await client.get(`/article/category`);
    return response.data;
};

export const fetchArticles = async({ categoryName, sort }) => {
    const response = await client.get(`/articles`, {
        params: {
            ...(categoryName && categoryName !== "all" ? { category: categoryName } : {}),
            ...(sort ? { sort } : {}),
        },
    });
    return response.data;
};
export const searchArticles = async({ query }) => {
    const response = await client.get(`/articles-search`, {
        params: {
            ...(query ? { q: query } : {}),
        },
    });
    return response.data;
};