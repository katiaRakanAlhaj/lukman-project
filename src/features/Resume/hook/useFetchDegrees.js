import { useQuery } from "@tanstack/react-query"
import { fetchDegrees } from "../api/fetchDegress";
export const useFetchDegrees = () => {
    return useQuery({
        queryKey: ["degrees"],
        queryFn: fetchDegrees,

    });
}