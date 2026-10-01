import { useQuery } from "@tanstack/react-query"
import { fetchSingleActivity } from "../api/fecthActivityById";
export const useFetchActivityById= (id) => {
  return useQuery({
    queryKey: ["single-activity", id],
    queryFn: () => fetchSingleActivity(id),
    enabled: !!id, // ✅ لا تنفّذ الطلب إذا كان id غير موجود
  });
}
