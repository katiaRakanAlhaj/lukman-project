import { useQuery } from "@tanstack/react-query"
import { fetchActivitiesPage, fetchCategoryContent } from "../api/fetchActivities";
export const useFetchActivitiesPage = () => {
    return useQuery({
        queryKey: ["activities-page"],
        queryFn: fetchActivitiesPage,

    });
}
export const useFetchCategoryContent = () => {
    return useQuery({
        queryKey: ["category-content"],
        queryFn: fetchCategoryContent,

    });
}