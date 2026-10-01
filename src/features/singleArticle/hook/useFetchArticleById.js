import { useQuery } from "@tanstack/react-query"
import { fetchArticles, fetchSingleArticle } from "../api/fetchArticleById";
export const useFetchArticleById= (id) => {
  return useQuery({
    queryKey: ["single-article", id],
    queryFn: () => fetchSingleArticle(id),
    enabled: !!id, // ✅ لا تنفّذ الطلب إذا كان id غير موجود
  });
}
export const useFetchArticles = () => {
    return useQuery({
        queryKey: ["articles"],
        queryFn: fetchArticles,

    });
}