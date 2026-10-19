const BrokenImageIcon = () => (
  <div className="absolute top-3 right-3 w-8 h-8 bg-[#1a2235] rounded-md flex items-center justify-center border-2 border-[#ff4d4f] z-10">
    <svg
      className="w-5 h-5 text-[#ff4d4f]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  </div>
);

export default BrokenImageIcon;