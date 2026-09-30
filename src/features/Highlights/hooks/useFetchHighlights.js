import { useQuery } from "@tanstack/react-query"
import { fetchCategories, fetchCategoryContent, fetchHighlights } from "../api/fetchHighlights";
export const useFetchHighlights = () => {
    return useQuery({
        queryKey: ["highlights-page"],
        queryFn: fetchHighlights,

    });
}
export const useFetchCategories = () => {
    return useQuery({
        queryKey: ["highlights-categories"],
        queryFn: fetchCategories,

    });
}
export const useFetchCategoryContent = (id) => {
  return useQuery({
    queryKey: ["category-content", id],
    queryFn: () => fetchCategoryContent(id),
    enabled: !!id, // ✅ لا تنفّذ الطلب إذا كان id غير موجود
  });
}