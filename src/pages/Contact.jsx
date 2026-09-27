import ContactBanner from "../features/contact/component/contactBanner";
import ContactGrid from "../features/contact/component/contactGrid";
import { useFetchContactInfo } from "../features/contact/hook/useFetchContactInfo";

const Contact = () => {
  const {
    data: contactDataPage,
    isLoading: contactDataPageLoading,
    error: contactDataPageError,
  } = useFetchContactInfo();
  return (
    <div>
      <ContactBanner contactDataPage={contactDataPage} />
      <ContactGrid contactDataPage = {contactDataPage}/>
    </div>
  );
};
export default Contact;
