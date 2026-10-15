import client from "../../../../src/api/client";

/**
 * Fetch all milestone categories (for the sidebar).
 */
export const fetchMilestoneCategory = async () => {
  const response = await client.get(`/milestone/category`);
  return response.data;
};

/**
 * Fetch milestones.
 * - category === "all"    → GET /milestones
 * - category === "العراق" → GET /milestones?category=العراق
 * - sort === "title_asc"  → GET /milestones?sort=title_asc
 * - both                 → GET /milestones?category=العراق&sort=title_asc
 */
export const fetchMilestone = async (category, sort) => {
  const params = {};

  if (category && category !== "all") {
    params.category = category;
  }

  if (sort) {
    params.sort = sort;
  }

  const response = await client.get(`/milestones`, { params });
  return response.data;
};
export const fetchMilestoneSearch = async (search) => {
  const response = await client.get(`/milestones-search`, {
    params: { q: search },
  });
  return response.data;
};