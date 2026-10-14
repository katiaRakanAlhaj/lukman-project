import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useFetchContactInfo } from "../../features/contact/hook/useFetchContactInfo";
import NavbarMobile from "./NavbarMobile";
import { useFetchFooter } from "./hook/fetchFooter";

function Wrapper() {
  const {
    data: contactData,
  } = useFetchContactInfo();
  const {
    data: footerData,
  } = useFetchFooter();
  return (
    <div className="size-full relative">
      {/* <ScrollToTop /> */}
      <div className="hidden lg:flex">
        <Navbar contactData = {contactData}/>
      </div>
      <div className="lg:hidden md:block">
        <NavbarMobile contactData = {contactData}/>
      </div>
      <div className="lg:hidden md:block">{/* <NavbarMobile /> */}</div>
      {/* This is where your Home component should render */}
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer footerData = {footerData} contactData = {contactData}/>
    </div>
  );
}

export default Wrapper;
