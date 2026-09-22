import { useQuery } from "@tanstack/react-query"
import { fetchPositions } from "../api/fetchPositions";
export const useFetchPositions = () => {
    return useQuery({
        queryKey: ["positions"],
        queryFn: fetchPositions,

    });
}