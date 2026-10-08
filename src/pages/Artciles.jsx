import ArticlesDescription from "../features/Articles/component/ArticlesDescription";
import ArticlesGrid from "../features/Articles/component/ArticlesGrid";
import {
  useFetchArticles,
  useFetchArticlesCategory,
} from "../features/Articles/hook/useFetchArticlesCategory";
import useArticlesFilters from "../features/Articles/hook/useArtcilesFilter";
import { useFetchHomePage } from "../features/home/hook/useFetchHome";
import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import MetaHelmet from "../component/metaHelmet/metaHelmet";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";

const Articles = () => {
  const filters = useArticlesFilters();

  const {
    data: articlesData,
    isLoading: articlesDataLoading,
    error: articlesDataError,
    isFetching: articlesFetching,
  } = useFetchArticles(filters.category, filters.sort);

  const {
    data: articlesCategoryData,
    isLoading: articlesCategoryDataLoading,
    error: articlesCategoryDataError,
  } = useFetchArticlesCategory();
  const {
    data: homePageData,
    isLoading: homePageDataLoading,
    error: homePageDataError,
  } = useFetchHomePage();
  const finalLoading =
    articlesDataLoading || articlesCategoryDataLoading || homePageDataLoading;
  const combinedError =
    articlesDataError || articlesCategoryDataError || homePageDataError;
  if (finalLoading) {
    return <Loader />;
  }
  if (combinedError) {
    return <ErrorMessageNetwork />;
  }
  return (
    <div>
      <ScrollToTop />
      <HelmetProvider>
        <MetaHelmet title={"articles"} description={"articles"} />
        <div className="container4 mx-auto">
          <ArticlesDescription homePageData={homePageData} />
          <ArticlesGrid
            articlesCategoryData={articlesCategoryData}
            articlesData={articlesData}
            isLoading={finalLoading}
            isFetching={articlesFetching}
            filters={filters}
          />
        </div>
      </HelmetProvider>
    </div>
  );
};

export default Articles;
