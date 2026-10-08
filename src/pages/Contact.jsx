import { HelmetProvider } from "react-helmet-async";
import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import ContactBanner from "../features/contact/component/contactBanner";
import ContactGrid from "../features/contact/component/contactGrid";
import { useFetchContactInfo } from "../features/contact/hook/useFetchContactInfo";
import MetaHelmet from "../component/metaHelmet/metaHelmet";

const Contact = () => {
  const {
    data: contactDataPage,
    isLoading: contactDataPageLoading,
    error: contactDataPageError,
  } = useFetchContactInfo();
  if (contactDataPageLoading) {
    return <Loader />;
  }
  return (
    <div>
      <ScrollToTop />
      <HelmetProvider>
        <MetaHelmet
          title={contactDataPage?.data?.meta_title}
          description={contactDataPage?.data?.meta_description}
        />
        <ContactBanner contactDataPage={contactDataPage} />
        <ContactGrid contactDataPage={contactDataPage} />
      </HelmetProvider>
    </div>
  );
};
export default Contact;
