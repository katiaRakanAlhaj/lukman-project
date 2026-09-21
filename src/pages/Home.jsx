// src/features/home/Home.jsx
import { useFetchContactInfo } from "../features/contact/hook/useFetchContactInfo";
import ContactSection from "../features/home/component/contactSection";
import HomeImage from "../features/home/component/homeImage";
import { useFetchHomePage } from "../features/home/hook/useFetchHome";

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
  // Optional: simple loading / error handling
  if (homePageDataLoading) return <div>Loading…</div>;
  if (homePageDataError) return <div>Something went wrong.</div>;

  return (
    <div>
      <HomeImage banner={homePageData?.data?.banner} />
      <ContactSection contactdata = {contactdata} />
    </div>
  );
};

export default Home;
