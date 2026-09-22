import { useQuery } from "@tanstack/react-query";
import {
    fetchArticles,
    fetchArticlesCategory,
} from "../api/fetchArticles";

export const useFetchArticlesCategory = () =>
    useQuery({
        queryKey: ["article-category"],
        queryFn: fetchArticlesCategory,
    });

// normal list — sends category + sort to the server
export const useFetchArticles = (categoryName = "all", sort = "") =>
    useQuery({
        queryKey: ["articles", { categoryName, sort }],
        queryFn: () => fetchArticles({ categoryName, sort }),
        keepPreviousData: true,
    });