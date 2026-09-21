import { useQuery } from "@tanstack/react-query"
import { fetchSkills } from "../api/fetchSkills";
export const useFetchSkills = () => {
    return useQuery({
        queryKey: ["skills"],
        queryFn: fetchSkills,

    });
}