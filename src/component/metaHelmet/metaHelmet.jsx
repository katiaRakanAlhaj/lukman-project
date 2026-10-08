import { Helmet } from "react-helmet-async";
import logo from "../../assets/images/logo.png";

const MetaHelmet = ({ title, description }) => {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && (
        <meta name="description" content={description} />
      )}
      <link rel="icon" href={logo} type="image/png" />
    </Helmet>
  );
};

export default MetaHelmet;