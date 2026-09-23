import { useQuery } from "@tanstack/react-query";
import {
    fetchArticles,
    fetchArticlesCategory,
    searchArticles,
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
export const useSearchArticles = (query = "") =>
    useQuery({
        queryKey: ["articles-search", query],
        queryFn: () => searchArticles({ query }),
        enabled: query.trim().length > 0, // don't fire on empty query
        keepPreviousData: true, // smooth UX while typing
    });