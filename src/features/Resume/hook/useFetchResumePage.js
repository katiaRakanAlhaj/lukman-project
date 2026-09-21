import { useQuery } from "@tanstack/react-query"
import { fetchResumePage } from "../api/fetchResumePage";
export const useFetchResumePage = () => {
    return useQuery({
        queryKey: ["cv-pag"],
        queryFn: fetchResumePage,

    });
}