import { useQuery } from "@tanstack/react-query"
import { fetchLanguages } from "../api/fetchLanguages";
export const useFetchLanguages = () => {
    return useQuery({
        queryKey: ["languages"],
        queryFn: fetchLanguages,

    });
}