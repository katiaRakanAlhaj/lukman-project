import { useQuery } from "@tanstack/react-query";
import {fetchMilestoneSearch, fetchMilestone, fetchMilestoneCategory } from "../api/fetchMilestone";

export const useFetchMilestoneCategory = () => {
  return useQuery({
    queryKey: ["milestone-category"],
    queryFn: fetchMilestoneCategory,
  });
};

export const useFetchMilestones = (category = "all", sort = "") => {
  return useQuery({
    queryKey: ["milestones", category, sort],
    queryFn: () => fetchMilestone(category, sort),
  });
};

export const useFetchMilestoneSearch = (search = "") => {
  return useQuery({
    queryKey: ["milestones-search", search],
    queryFn: () => fetchMilestoneSearch(search),
    enabled: !!search && search.trim() !== "",
  });
};