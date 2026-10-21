import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import youtube from "../../../assets/images/youtube.svg";
import facebook from "../../../assets/images/facebook.svg";
import twitter from "../../../assets/images/x.svg";
import instgram from "../../../assets/images/instgram.svg";
import linkedin from "../../../assets/images/linkedin.svg";
import Spinner from "../../../component/ux/spinner";
import { useContactForm } from "../../contact/hook/useContactForm";
import ToastProvider from "../../../component/ux/Toaster";
import i18next from "i18next";
import toast from "react-hot-toast";
import { descriptionClasses } from "../../../component/ux/descriptionClasses";

/* ── reCAPTCHA v3 Site Key ───────────────────────────── */
const RECAPTCHA_SITE_KEY = "6Lce--EtAAAAAFbtaN4oOQTO5IyuVpFGE5r2COaG";

/* ── Styles ──────────────────────────────────────────── */
const inputClass =
  "w-full h-[3.5em] bg-[#5050501A] rounded-sm px-4 outline-none";
const textareaClass =
  "w-full h-[11em] bg-[#5050501A] rounded-sm p-4 outline-none";
const errorClass = "text-red-500 text-md mt-2";

/* ── Helper ──────────────────────────────────────────── */
const isValidSocialLink = (href) => {
  if (!href) return false;
  const trimmed = String(href).trim();
  if (trimmed === "" || trimmed === "#") return false;
  return true;
};

const ContactSection = ({ contactdata }) => {
  const { t } = useTranslation();

  const { register, handleSubmit, errors, onSubmit, onError, isPending } =
    useContactForm();

  /* ── reCAPTCHA state ─────────────────────────────── */
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState("");
  const isSubmittingRef = useRef(false);

  /* ── Load reCAPTCHA v3 script once ───────────────── */
  useEffect(() => {
    const loadRecaptcha = () => {
      // Script already injected — just wait for ready
      if (document.getElementById("recaptcha-script")) {
        const waitForReady = () => {
          if (window.grecaptcha?.ready) {
            window.grecaptcha.ready(() => setIsRecaptchaLoaded(true));
          } else {
            setTimeout(waitForReady, 100);
          }
        };
        waitForReady();
        return;
      }

      const script = document.createElement("script");
      script.id = "recaptcha-script";
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        if (window.grecaptcha?.ready) {
          window.grecaptcha.ready(() => setIsRecaptchaLoaded(true));
        }
      };

      script.onerror = () => {
        setRecaptchaError(i18next.t("contact.recaptcha_error"));
      };

      document.body.appendChild(script);
    };

    loadRecaptcha();
    // NOTE: do not remove the script on cleanup — reCAPTCHA must persist
  }, []);

  /* ── Get reCAPTCHA token ─────────────────────────── */
  const getRecaptchaToken = async () => {
    if (!window.grecaptcha?.ready) return "";

    try {
      await new Promise((r) => window.grecaptcha.ready(r));
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: "submit",
      });
      return token || "";
    } catch {
      return "";
    }
  };

  /* ── Wrapped submit handler ──────────────────────── */
  const handleFormSubmit = async (formData) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setRecaptchaError("");

    // reCAPTCHA not loaded yet
    if (!isRecaptchaLoaded) {
      const msg = i18next.t("contact.recaptcha_loading");
      setRecaptchaError(msg);
      toast.error(msg);
      isSubmittingRef.current = false;
      return;
    }

    // Fetch token
    const token = await getRecaptchaToken();
    if (!token) {
      const msg = i18next.t("contact.recaptcha_error");
      setRecaptchaError(msg);
      toast.error(msg);
      isSubmittingRef.current = false;
      return;
    }

    // Build payload — include token under both common backend keys
    const payload = {
      ...formData,
      "g-recaptcha-response": token,
    };

    // Release the lock before handing off — hook's isPending drives the UI
    isSubmittingRef.current = false;

    // Call your existing mutation
    onSubmit(payload);
  };

  const socials = [
    {
      href: contactdata?.data?.linkedin,
      icon: linkedin,
      alt: t("contact.linkedin"),
    },
    {
      href: contactdata?.data?.instagram,
      icon: instgram,
      alt: t("contact.instagram"),
    },
    { href: contactdata?.data?.x, icon: twitter, alt: t("contact.twitter") },
    {
      href: contactdata?.data?.facebook,
      icon: facebook,
      alt: t("contact.facebook"),
    },
    {
      href: contactdata?.data?.youtube,
      icon: youtube,
      alt: t("contact.youtube"),
    },
  ].filter((s) => isValidSocialLink(s.href));

  return (
    <>
      <ToastProvider />
      <div className="container3 mx-auto lg:mt-[6em] mt-[2rem]">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-[2.5rem] gap-x-24">
          {/* Left column */}
          <div>
            <h1 className="text-[2em] text-secondary font-extrabold">
              {t("contact.contactUs")}
            </h1>
            <p className={`${descriptionClasses} text-secondary mt-2 whitespace-pre-line flex text-justify`}></p>
            <div className="flex flex-col space-y-2 mt-2"></div>
            <p className="text-[#000000] text-[1.2rem] font-bold mt-6">
              {t("contact.email")}
            </p>
            <p className="lg:text-xl text-lg mt-2 text-[#002F3C]">
              {contactdata?.data?.email}
            </p>
            <div className="flex flex-col space-y-1 mt-4 items-center">
              <p className="text-[2em] mt-[2rem] font-bold text-secondary">
                {t("contact.followUs")}
              </p>
              <p className={`${descriptionClasses} text-secondary`}>
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

          {/* Right column: form */}
          <form
            className="space-y-4 mt-4"
            onSubmit={handleSubmit(handleFormSubmit, onError)}
            noValidate
          >
            <div className="relative">
              <input
                placeholder={t("contact.namePlaceholder")}
                className={inputClass}
                {...register("name")}
              />
              {errors.name && (
                <p className={errorClass}>{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder={t("contact.emailPlaceholder")}
                className={inputClass}
                {...register("email")}
              />
              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <textarea
                placeholder={t("contact.messagePlaceholder")}
                className={textareaClass}
                {...register("message")}
              ></textarea>
              {errors.message && (
                <p className={errorClass}>{errors.message.message}</p>
              )}
            </div>

            {/* reCAPTCHA error line */}
            {recaptchaError && (
              <p className="text-red-500 text-sm">{recaptchaError}</p>
            )}

            <div className="flex justify-start">
              <button
                type="submit"
                disabled={isPending}
                className="w-[19.5em] h-[3.7em] bg-negative text-white font-bold rounded-b-2xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
    </>
  );
};

export default ContactSection;
