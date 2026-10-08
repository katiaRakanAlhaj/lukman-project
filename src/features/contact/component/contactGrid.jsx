import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
import youtube from "../../../assets/images/youtube.svg";
import facebook from "../../../assets/images/facebook.svg";
import twitter from "../../../assets/images/x.svg";
import instgram from "../../../assets/images/instgram.svg";
import linkedin from "../../../assets/images/linkedin.svg";
import Spinner from "../../../component/ux/spinner";
import { useContactForm } from "../hook/useContactForm";
import ToastProvider from "../../../component/ux/Toaster";
import i18next from "i18next";

/* ── Helper ──────────────────────────────────────────── */
const isValidSocialLink = (href) => {
  if (!href) return false;
  const trimmed = String(href).trim();
  if (trimmed === "" || trimmed === "#" || trimmed === ".") return false;
  return true;
};

const ContactGrid = ({ contactDataPage }) => {
  const { t } = useTranslation();
  const data = contactDataPage?.data || {};

  const { register, handleSubmit, errors, onSubmit, onError, isPending } =
    useContactForm();

  const socials = [
    { href: data.youtube, icon: youtube, alt: "YouTube" },
    { href: data.x, icon: twitter, alt: "Twitter" },
    { href: data.facebook, icon: facebook, alt: "Facebook" },
    { href: data.instagram, icon: instgram, alt: "Instagram" },
    { href: data.linkedin, icon: linkedin, alt: "LinkedIn" },
  ].filter((s) => isValidSocialLink(s.href));

  return (
    <>
      <ToastProvider />
      <div className="w-full lg:h-[45rem] rounded-3xl bg-white mt-[4.5rem] lg:py-0 py-[3rem]">
        <div className="container2 mx-auto grid lg:grid-cols-2 grid-cols-1 h-full gap-x-[2rem]">
          {/* Left Column — Info */}
          <div className="flex flex-col justify-center h-full">
            <p className="text-[1.6rem] font-bold text-[#000000]">
             {i18next.t("contact.contact_description")}
            </p>

            <div
              className="text-secondary text-[0.9rem] mt-2 whitespace-pre-line flex text-justify"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.description || ""),
              }}
            />

            <div className="md:flex mt-[3rem] gap-x-[4rem]">
              <div className="flex flex-col md:space-y-[4rem] space-y-[2rem]">
                <div className="space-y-1">
                  <h1 className="font-bold text-[#000000] text-[1.2rem]">
                    {i18next.t("contact.email")}
                  </h1>
                  <p className="text-secondary text-[0.9rem]">{data.email}</p>
                </div>
              </div>

              <div className="flex flex-col md:space-y-[4rem] space-y-[2rem] mt-[2rem] md:mt-0">
                <div className="space-y-1">
                  <h1 className="font-bold text-[#000000] text-[1.2rem]">
                    {i18next.t("contact.social_media_website")}                  </h1>
                  <div className="flex items-center justify-center gap-x-[1.6rem]">
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
                          className="w-[1.2rem] h-[1.2rem] object-contain"
                          style={{
                            filter:
                              "brightness(0) saturate(100%) invert(18%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(90%)",
                          }}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Contact Form */}
          <div className="w-full h-[35rem] border border-[#C7C7C7] mt-[3rem] rounded-3xl px-[1.5rem] relative">
            <h1 className="font-bold mt-[2rem] text-[1.5rem] text-[#000000]">
              {i18next.t("contact.contact_us")}
            </h1>

            <div
              className="text-[0.8rem] text-secondary mt-4 whitespace-pre-line flex text-justify"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.description || ""),
              }}
            />

            <form
              className="space-y-4 mt-4"
              onSubmit={handleSubmit(onSubmit, onError)}
              noValidate
            >
              <div className="relative">
                <input
                  placeholder={t("contact.namePlaceholder")}
                  className="w-full outline-none h-[3.5rem] border-b border-[#C4C4C4]"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder={t("contact.emailPlaceholder")}
                  className="w-full outline-none h-[3.5rem] border-b border-[#C4C4C4]"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  placeholder={t("contact.messagePlaceholder")}
                  className="w-full h-[8rem] outline-none border-b border-[#C4C4C4]"
                  {...register("message")}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex justify-start">
                <button
                  type="submit"
                  disabled={isPending}
                  className="absolute bottom-0 left-0 w-full h-[3.8rem] bg-negative text-white font-bold rounded-b-3xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="text-[1.2rem] text-white font-bold">
                    {isPending ? t("contact.sending") : t("contact.send")}
                  </span>
                  {isPending && <Spinner />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactGrid;
