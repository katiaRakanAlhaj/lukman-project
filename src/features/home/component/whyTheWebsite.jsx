import i18next from "i18next";
import DOMPurify from "dompurify";

const WhyTheWebsite = ({ homePageData }) => {
  if (!homePageData) return null;

  const { Why_the_website_image, Why_the_website } = homePageData?.data;

  if (!Why_the_website) return null;

  return (
    <section className="mt-[4rem] py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {i18next.t("why_website")}
          </h2>
          {/* Divider */}
          <div className="mt-4 w-[6rem] h-[0.25rem] bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          {/* Image Column */}
          {Why_the_website_image && (
            <div className="w-full lg:w-1/2 flex-shrink-0">
              <div className="relative group sticky top-8">
                {/* Image frame gradient */}
                <div className="absolute -inset-3 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-sm" />
                <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-white/50">
                  <img
                    src={Why_the_website_image}
                    alt="Why the website"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
                {/* Decorative accent border */}
                <div className="absolute -bottom-4 -right-4 w-[6rem] h-[6rem] border-4 border-primary/30 rounded-2xl -z-10" />
              </div>
            </div>
          )}

          {/* Text Column - Scrollable Area */}
          <div
            className={`w-full ${Why_the_website_image ? "lg:w-1/2" : "lg:w-full"}`}
          >
            {/* Scrollable text */}
            <div
              className={`max-h-[37.5rem] lg:max-h-[43.75rem] overflow-y-auto pl-4 custom-scrollbar ${i18next.language == "ar" ? "text-right" : "text-left"}`}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(Why_the_website),
                }}
                className="text-gray-800 leading-relaxed lg:text-xl text-lg font-medium mt-2"
              />
            </div>

            {/* Bottom fade effect */}
            <div className="h-[2.5rem] -mt-[2.5rem] bg-gradient-to-t from-white to-transparent pointer-events-none relative z-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTheWebsite;
