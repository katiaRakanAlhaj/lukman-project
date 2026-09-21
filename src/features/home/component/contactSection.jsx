import { useTranslation } from "react-i18next";
import youtube from "../../../assets/images/youtube.svg";
import facebook from "../../../assets/images/facebook.svg";
import twitter from "../../../assets/images/twitter.svg";
import instgram from "../../../assets/images/instgram.svg";
import linkedin from "../../../assets/images/linkedin.svg";

/* ── Helper: check if a social link is valid ─────── */
const isValidSocialLink = (href) => {
  if (!href) return false;
  const trimmed = String(href).trim();
  if (trimmed === "" || trimmed === "#") return false;
  return true;
};

const ContactSection = ({ contactdata }) => {
  const { t } = useTranslation();

  const socials = [
    { href: contactdata?.data?.linkedin, icon: linkedin, alt: t("contact.linkedin") },
    { href: contactdata?.data?.instagram, icon: instgram, alt: t("contact.instagram") },
    { href: contactdata?.data?.x, icon: twitter, alt: t("contact.twitter") },
    { href: contactdata?.data?.facebook, icon: facebook, alt: t("contact.facebook") },
    { href: contactdata?.data?.youtube, icon: youtube, alt: t("contact.youtube") },
  ].filter((s) => isValidSocialLink(s.href));

  return (
    <div className="container3 mx-auto lg:mt-[12em] mt-[2rem]">
      <div
        data-rht-toaster=""
        style={{
          position: "fixed",
          zIndex: 9999,
          inset: "16px",
          pointerEvents: "none",
        }}
      ></div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-[2.5rem] gap-x-24">
        <div>
          <h1 className="text-[2em] text-secondary font-extrabold">
            {t("contact.contactUs")}
          </h1>
          <p className="text-[1em] text-secondary mt-2 whitespace-pre-line flex text-justify"></p>
          <div className="flex flex-col space-y-2 mt-2"></div>
          <p className="text-[#000000] text-[1.2rem] font-bold mt-6">
            {t("contact.email")}
          </p>
          <p className="text-[1rem] mt-2 text-[#002F3C]">
            {contactdata?.data?.email}
          </p>
          <div className="flex flex-col space-y-1 mt-4 items-center">
            <p className="text-[2em] mt-[2rem] font-bold text-secondary">
              {t("contact.followUs")}
            </p>
            <p className="text-[1em] text-secondary">
              {t("contact.stayConnected")}
            </p>
            {socials.length > 0 && (
              <div className="flex gap-x-4 mt-2">
                {socials.map(({ href, icon, alt }) => (
                  <a
                    key={alt}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    <img
                      src={icon}
                      alt={alt}
                      className="w-[1.5rem] h-[1.2rem] object-contain"
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(13%) sepia(53%) saturate(1476%) hue-rotate(166deg) brightness(94%) contrast(101%)",
                      }}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <form className="space-y-4 mt-4">
          <div className="relative">
            <input
              placeholder={t("contact.namePlaceholder")}
              className="w-full h-[3.5em] bg-[#5050501A] rounded-sm px-4 outline-none"
              name="name"
            />
            <p className="text-red-500 text-md mt-2">
              {t("contact.nameRequired")}
            </p>
          </div>
          <div>
            <input
              placeholder={t("contact.emailPlaceholder")}
              className="w-full h-[3.5em] bg-[#5050501A] rounded-sm px-4 outline-none"
              name="email"
            />
            <p className="text-red-500 text-md mt-2">
              {t("contact.emailRequired")}
            </p>
          </div>
          <div>
            <textarea
              name="message"
              placeholder={t("contact.messagePlaceholder")}
              className="w-full h-[11em] bg-[#5050501A] rounded-sm p-4 outline-none"
            ></textarea>
            <p className="text-red-500 text-md mt-2">
              {t("contact.messageRequired")}
            </p>
          </div>
          <div className="flex justify-start">
            <button
              type="submit"
              className="w-[19.5em] h-[3.7em] bg-negative text-white font-bold rounded-b-2xl flex items-center justify-center gap-2"
            >
              <span className="text-[1.2rem] text-white font-bold">
                {t("contact.send")}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;