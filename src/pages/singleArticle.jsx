import SingleArticleBanner from "../features/singleArticle/component/singleArticleBanner";
import { useParams } from "react-router-dom";
import {
  useFetchArticleById,
  useFetchArticles,
} from "../features/singleArticle/hook/useFetchArticleById";
import SingleArticleContent from "../features/singleArticle/component/singleArticleGrid";
import LastArticles from "../features/singleArticle/component/LastArticles";
import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
const SingleArticle = () => {
  const { id } = useParams();
  const {
    data: articleByIdData,
    isLoading: articleByIdDataLoading,
    error: articleByIdDataError,
  } = useFetchArticleById(id);
  const {
    data: articlesData,
    isLoading: articlesDataLoading,
    error: articlesDataError,
  } = useFetchArticles();
  const combinedLoading = articleByIdDataLoading || articlesDataLoading;
  if (combinedLoading) {
    return <Loader />;
  }
  return (
    <div>
      <ScrollToTop />
      <div className="container4 mx-auto">
        <SingleArticleBanner articleByIdData={articleByIdData} />
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[3rem] mt-[2rem]">
          <div className="lg:col-span-8 col-span-1">
            <SingleArticleContent articleByIdData={articleByIdData} />
          </div>
          <div className="lg:col-span-4 col-span-1">
            <LastArticles articlesData={articlesData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleArticle;
