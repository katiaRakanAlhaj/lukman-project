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
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";

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

  if (articleByIdDataError || articlesDataError) {
    return <ErrorMessageNetwork />;
  }

  return (
    <div>
      <ScrollToTop />
      <div className="container4 mx-auto">
        <SingleArticleBanner articleByIdData={articleByIdData} />

        {/* Grid layout with items-start for independent column sizing */}
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-y-[2rem] gap-x-[3rem] mt-[2rem] items-start">
          {/* Main Article Content */}
          <div className="lg:col-span-8 col-span-1">
            <SingleArticleContent articleByIdData={articleByIdData} />
          </div>

          {/* Sticky Sidebar with Hidden Scrollbar */}
          <div className="lg:col-span-4 col-span-1 lg:sticky lg:top-[2rem] max-h-[calc(100vh-4rem)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <LastArticles articlesData={articlesData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;
