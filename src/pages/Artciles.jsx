import ArticlesDescription from "../features/Articles/component/ArticlesDescription";
import ArticlesGrid from "../features/Articles/component/ArticlesGrid";
import {
  useFetchArticles,
  useFetchArticlesCategory,
} from "../features/Articles/hook/useFetchArticlesCategory";
import useArticlesFilters from "../features/Articles/hook/useArtcilesFilter";
import { useFetchHomePage } from "../features/home/hook/useFetchHome";

const Articles = () => {
  const filters = useArticlesFilters();

  const {
    data: articlesData,
    isLoading: articlesDataLoading,
    isFetching: articlesFetching,
  } = useFetchArticles(filters.category, filters.sort);

  const {
    data: articlesCategoryData,
    isLoading: articlesCategoryDataLoading,
  } = useFetchArticlesCategory();
 const {
    data: homePageData,
    isLoading: homePageDataLoading,
  } = useFetchHomePage();
  const finalLoading = articlesDataLoading || articlesCategoryDataLoading;

  return (
    <div className="container4 mx-auto">
      <ArticlesDescription homePageData = {homePageData}/>
      <ArticlesGrid
        articlesCategoryData={articlesCategoryData}
        articlesData={articlesData}
        isLoading={finalLoading}
        isFetching={articlesFetching}
        filters={filters}
      />
    </div>
  );
};

export default Articles;