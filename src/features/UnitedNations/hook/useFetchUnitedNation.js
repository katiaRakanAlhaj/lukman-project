import { useQuery } from "@tanstack/react-query";
import {
  fetchUnitedNationCategory,
  fetchUnitedNationCategoryById,
} from "../api/fetchUnitedNation";
export const useFetchUnitedNationCategory = () => {
  return useQuery({
    queryKey: ["united-nations-category"],
    queryFn: fetchUnitedNationCategory,
  });
};
export const useFetchUnitedNationCategoryId = (id) => {
  return useQuery({
    queryKey: ["united-nations-category-id", id],
    queryFn: () => fetchUnitedNationCategoryById(id),
    enabled: !!id, // ✅ لا تنفّذ الطلب إذا كان id غير موجود
  });
};
