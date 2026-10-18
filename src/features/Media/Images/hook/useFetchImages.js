import { useQuery } from "@tanstack/react-query";
import { fetchImagesCategory, fetchImages } from "../api/fetchImages";

export const useFetchImagesCategory = () => {
  return useQuery({
    queryKey: ["images-category"],
    queryFn: fetchImagesCategory,
  });
};

// ✅ New: dynamic id + page
export const useFetchImages = ({ id, page = 1 }) => {
  return useQuery({
    queryKey: ["images", id, page],
    queryFn: () => fetchImages({ id, page }),
    enabled: !!id,          // don't fire until we have an id
    keepPreviousData: true, // smooth pagination — no flicker between pages
  });
};