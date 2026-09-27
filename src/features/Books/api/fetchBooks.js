import client from "../../../../src/api/client";
export const fetchBooksPage = async() => {
    const response = await client.get(`/books-page`);
    return response.data;
};
export const fetchBooks = async() => {
    const response = await client.get(`/books`);
    return response.data;
};