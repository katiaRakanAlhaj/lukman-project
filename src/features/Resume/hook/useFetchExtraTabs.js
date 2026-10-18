import { useQuery } from "@tanstack/react-query";
import { FetchExtraTabs } from "../api/fetchExtraTabs";
export const useFetchExtraTabs = () => {
  return useQuery({
    queryKey: ["extra-tabs"],
    queryFn: FetchExtraTabs,
  });
};
