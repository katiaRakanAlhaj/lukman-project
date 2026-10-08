import { HelmetProvider } from "react-helmet-async";
import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import LinksGrid from "../features/Links/component/LinksGrid";
import LinksHeader from "../features/Links/component/LinksHeader";
import {
  useFetchLinks,
  useFetchLinksPage,
} from "../features/Links/hook/useFetchLinks";
import MetaHelmet from "../component/metaHelmet/metaHelmet";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";

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
  if (LinksDataPageError || LinksDataError) {
    return <ErrorMessageNetwork />;
  }
  return (
    <div>
      <ScrollToTop />
      <HelmetProvider>
        <MetaHelmet
          title={LinksDataPage?.data?.meta_title}
          description={LinksDataPage?.data?.meta_description}
        />
        <div className="container4 mx-auto">
          <LinksHeader LinksDataPage={LinksDataPage} />
          <LinksGrid LinksData={LinksData} />
        </div>
      </HelmetProvider>
    </div>
  );
};
export default Links;
