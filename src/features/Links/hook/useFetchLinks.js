import { useQuery } from "@tanstack/react-query"
import { fetchLinks, fetchLinksPage } from "../api/fetchLinks";
export const useFetchLinksPage = () => {
    return useQuery({
        queryKey: ["Links-page"],
        queryFn: fetchLinksPage,

    });
}
export const useFetchLinks = () => {
    return useQuery({
        queryKey: ["Links"],
        queryFn: fetchLinks,

    });
}