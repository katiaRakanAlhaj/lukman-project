import { useQuery } from "@tanstack/react-query"
import { fetchContactInfo } from "../api/fetchContactInfo";
export const useFetchContactInfo = () => {
    return useQuery({
        queryKey: ["contact-us-page"],
        queryFn: fetchContactInfo,
    });
}