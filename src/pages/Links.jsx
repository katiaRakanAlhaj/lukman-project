import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import LinksGrid from "../features/Links/component/LinksGrid";
import LinksHeader from "../features/Links/component/LinksHeader";
import {
  useFetchLinks,
  useFetchLinksPage,
} from "../features/Links/hook/useFetchLinks";

const Links = () => {
  const {
    data: LinksDataPage,
    isLoading: LinksDataPageLoading,
    error: LinksDataPageError,
  } = useFetchLinksPage();
  const {
    data: LinksData,
    isLoading: LinksDataLoading,
    error: LinksDataError,
  } = useFetchLinks();
  if (LinksDataPageLoading || LinksDataLoading) {
    return <Loader />;
  }
  return (
    <div>
      <ScrollToTop />
      <div className="container4 mx-auto">
        <LinksHeader LinksDataPage={LinksDataPage} />
        <LinksGrid LinksData={LinksData} />
      </div>
    </div>
  );
};
export default Links;
