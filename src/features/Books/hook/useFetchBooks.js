import { useQuery } from "@tanstack/react-query"
import { fetchBooks, fetchBooksPage } from "../api/fetchBooks";
export const useFetchBooksPage = () => {
    return useQuery({
        queryKey: ["books-page"],
        queryFn: fetchBooksPage,

    });
}
export const useFetchBooks = () => {
    return useQuery({
        queryKey: ["books"],
        queryFn: fetchBooks,

    });
}