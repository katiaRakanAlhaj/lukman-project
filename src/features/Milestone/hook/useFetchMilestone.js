import { useQuery } from "@tanstack/react-query"
import { fetchMilestoneCategory } from "../api/fetchMilestone";
export const useFetchMilestoneCategory = () => {
    return useQuery({
        queryKey: ["milestone-category"],
        queryFn: fetchMilestoneCategory,
    });
}