import { useQuery } from "@tanstack/react-query"
import client from "../../../../src/api/client";
export const fetchFooter = async() => {
    const response = await client.get(`/footer`);
    return response.data;
};
export const useFetchFooter = () => {
    return useQuery({
        queryKey: ["footer"],
        queryFn: fetchFooter,

    });
}