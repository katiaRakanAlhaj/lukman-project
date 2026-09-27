import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={12}
      containerStyle={{ top: 80, zIndex: 99999 }}
      toastOptions={{
        duration: 4000,
        style: {
          fontSize: "15px",
          maxWidth: "500px",
          padding: "14px 18px",
          borderRadius: "10px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
        },
      }}
    />
  );
};

export default ToastProvider;