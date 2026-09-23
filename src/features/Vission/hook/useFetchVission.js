import { useQuery } from "@tanstack/react-query"
import { fetchVissionCategoryContent, fetchVissionPage } from "../api/fetchVission";
export const useFetchVissionPage = () => {
    return useQuery({
        queryKey: ["visions-page"],
        queryFn: fetchVissionPage,

    });
}
export const useFetchVissionCategory = () => {
    return useQuery({
        queryKey: ["vission-category-content"],
        queryFn: fetchVissionCategoryContent,

    });
}