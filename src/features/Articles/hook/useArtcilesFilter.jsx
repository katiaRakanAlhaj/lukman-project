import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

export const SORT_OPTIONS = {
  TITLE_ASC: "title_asc",
  ID_ASC: "id_asc",
  ID_DESC: "id_desc",
};

const useArticlesFilters = () => {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const { i18n } = useTranslation();

  const setSortOrder = useCallback(
    (order) => {
      if (order === SORT_OPTIONS.TITLE_ASC) {
        setSort(i18n.language?.startsWith("ar") ? "title_ar" : "title_en");
      } else {
        setSort(order);
      }
    },
    [i18n.language]
  );

  const reset = useCallback(() => {
    setCategory("all");
    setSort("");
  }, []);

  return {
    category,
    sort,
    setCategory,
    setSort: setSortOrder,
    reset,
  };
};

export default useArticlesFilters;