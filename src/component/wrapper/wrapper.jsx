import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useFetchContactInfo } from "../../features/contact/hook/useFetchContactInfo";
import NavbarMobile from "./NavbarMobile";

function Wrapper() {
  const {
    data: contactData,
  } = useFetchContactInfo();

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
      <Footer contactData = {contactData}/>
    </div>
  );
}

export default Wrapper;
