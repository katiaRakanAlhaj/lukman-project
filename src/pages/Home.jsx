// src/features/home/Home.jsx
import { HelmetProvider } from "react-helmet-async";
import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import { useFetchContactInfo } from "../features/contact/hook/useFetchContactInfo";
import ContactSection from "../features/home/component/contactSection";
import HomeImage from "../features/home/component/homeImage";
import { useFetchHomePage } from "../features/home/hook/useFetchHome";
import MetaHelmet from "../component/metaHelmet/metaHelmet";

const Home = () => {
  const {
    data: homePageData,
    isLoading: homePageDataLoading,
    error: homePageDataError,
  } = useFetchHomePage();
  const {
    data: contactdata,
    isLoading: contactdataloading,
    error: contactdataError,
  } = useFetchContactInfo();
  const combinedLoading = homePageDataLoading || contactdataloading;
  if (combinedLoading) {
    return <Loader />;
  }

  return (
    <div>
      <ScrollToTop />
      <HelmetProvider>
        <MetaHelmet
          title={homePageData?.data?.meta_title}
          description={homePageData?.data?.meta_description}
        />
        <HomeImage banner={homePageData?.data?.banner} />
        <ContactSection contactdata={contactdata} />
      </HelmetProvider>
    </div>
  );
};

export default Home;
