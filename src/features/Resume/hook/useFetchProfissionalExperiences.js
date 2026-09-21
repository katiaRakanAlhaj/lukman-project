import { useQuery } from "@tanstack/react-query"
import { fetchProfissionalExperiences } from "../api/fetchProfissionalExperiences";
export const useFetchProfissionalExperiences = () => {
    return useQuery({
        queryKey: ["profissional-experiences"],
        queryFn: fetchProfissionalExperiences,

    });
}