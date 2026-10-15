import { useQuery } from "@tanstack/react-query"
import { fetchMilestones, fetchSingleMilestone } from "../api/fetchSingleMilestone";
export const useFetchMilestoneById= (id) => {
  return useQuery({
    queryKey: ["single-milestone", id],
    queryFn: () => fetchSingleMilestone(id),
    enabled: !!id, // ✅ لا تنفّذ الطلب إذا كان id غير موجود
  });
}

export const useFetchMilestones = () => {
    return useQuery({
        queryKey: ["milestones"],
        queryFn: fetchMilestones,

    });
}