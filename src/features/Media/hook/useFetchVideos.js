import { useQuery } from "@tanstack/react-query";
import { fetchVideoCategory, fetchVideos, fetchVideosPage } from "../api/fetchVideos";
export const useFetchVideos = (filters) => {
  return useQuery({
    queryKey: ["videos", filters],
    queryFn: () => fetchVideos(filters),
  });
};

export const useFetchVideosPage = () => {
  return useQuery({
    queryKey: ["video-page"],
    queryFn: fetchVideosPage,
  });
};

export const useFetchVideoCategory = () => {
  return useQuery({
    queryKey: ["video-category"],
    queryFn: fetchVideoCategory,
  });
};