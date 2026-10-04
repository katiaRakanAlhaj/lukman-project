import { useQuery } from "@tanstack/react-query";
import { fetchVideoCategory, fetchVideos, fetchVideosPage } from "../api/fetchVideos";
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
export const useFetchVideos = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });
};
