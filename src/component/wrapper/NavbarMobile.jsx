import { useState } from 'react';

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="absolute top-2 z-50 w-full">
        <div className="flex justify-between items-center w-full px-4">
          <a href="/ar/" data-discover="true">
            <img
              className="h-[2.5rem] w-auto object-cover"
              alt="Logo"
              src="data:image/png;base64,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"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </a>
          <div className="flex items-center gap-4 left-2 absolute">
            <div className="cursor-pointer font-semibold text-white">
              <p className="text-[1.1rem]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                English
              </p>
            </div>
            <button
              className="text-3xl text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? (
                // Close (X) icon
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 352 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                </svg>
              ) : (
                // Hamburger (☰) icon
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay - only visible when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Slide-in menu panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[100%] bg-[#005774] z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ maxHeight: '100%', overflowY: 'auto' }}
      >
        <div className="flex flex-col p-6 space-y-4 mt-[2rem]">
          <a className="text-[1.3rem] font-[400] py-2 px-4 hover:bg-[#004a63] rounded-lg transition-colors text-white" href="/ar/" data-discover="true">الرئيسية</a>
          <a className="text-[1.3rem] font-[400] py-2 px-4 hover:bg-[#004a63] rounded-lg transition-colors text-white" href="/ar/platform_message" data-discover="true">رسالة المنصة</a>
          <a className="text-[1.3rem] font-[400] py-2 px-4 hover:bg-[#004a63] rounded-lg transition-colors text-white" href="/ar/resume" data-discover="true">السيرة الذاتية</a>
          <a className="text-[1.3rem] font-[400] py-2 px-4 hover:bg-[#004a63] rounded-lg transition-colors text-white" href="/ar/activities" data-discover="true">النشاطات</a>
          <a className="text-[1.3rem] font-[400] py-2 px-4 hover:bg-[#004a63] rounded-lg transition-colors text-white" href="/ar/articles" data-discover="true">المقالات</a>
          <a className="text-[1.3rem] font-[400] py-2 px-4 hover:bg-[#004a63] rounded-lg transition-colors text-white" href="/ar/media" data-discover="true">الميديا</a>
          <a className="text-[1.3rem] font-[400] py-2 px-4 hover:bg-[#004a63] rounded-lg transition-colors text-white" href="/ar/contact" data-discover="true">اتصل بنا</a>
          <a className="text-[1.3rem] font-[400] py-2 px-4 hover:bg-[#004a63] rounded-lg transition-colors text-white" href="/ar/vision_and_principles" data-discover="true">الرؤية والمبادئ</a>
          <a className="text-[1.3rem] font-[400] py-2 px-4 hover:bg-[#004a63] rounded-lg transition-colors text-white" href="/ar/united_nations" data-discover="true">الأمم المتحدة</a>
          <a className="text-[1.3rem] font-[400] py-2 px-4 hover:bg-[#004a63] rounded-lg transition-colors text-white" href="/ar/books_and_research" data-discover="true">الكتب والأبحاث</a>
          <a className="text-[1.3rem] font-[400] py-2 px-4 hover:bg-[#004a63] rounded-lg transition-colors text-white" href="/ar/Highlights" data-discover="true">مقتطفات</a>
          <a className="text-[1.3rem] font-[400] py-2 px-4 hover:bg-[#004a63] rounded-lg transition-colors text-white" href="/ar/important_links" data-discover="true">روابط مهمة</a>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;