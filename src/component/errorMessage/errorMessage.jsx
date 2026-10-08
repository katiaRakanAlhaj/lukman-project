import i18next from "i18next";
import { SiOpslevel } from "react-icons/si";

const ErrorMessageNetwork = () => {
  const handleRetry = () => {
    window.location.reload();
  };
  
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center text-center">
      <div>
        <p className="text-2xl font-bold text-[#333333]">
          <icon className="flex justify-center text-4xl mb-[1rem] text-secondary">
            <SiOpslevel />
          </icon>
          {i18next.t('errorMessage.errorOops')}
          <br />
          {i18next.t('errorMessage.errorMessage')}
          <br />
          <button
            onClick={handleRetry}
            className="w-auto px-4 h-[3rem] bg-secondary mt-[1rem] text-white rounded-lg"
          >
            <p className="text-[1.1rem] font-medium">
              {i18next.t('errorMessage.errorRetryButton')}
            </p>
          </button>
        </p>
      </div>
    </div>
  );
};

export default ErrorMessageNetwork;