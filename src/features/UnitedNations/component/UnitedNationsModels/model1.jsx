const Model1 = ({ data }) => {
  return (
    <div className="w-full relative h-[20rem]">
      <div
        className="absolute rounded-3xl w-full h-full bg-cover -z-10 transition-all duration-700"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 46, 59, 0) 0%, rgb(0, 47, 60) 100%), url("${data?.banner}")`,
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="mt-[2rem] lg:mt-0 absolute bottom-[3rem] right-[2rem]">
        <p className="text-white font-[700] lg:text-[2.8rem] text-[1.7rem]">
          {data?.title}
        </p>
      </div>
    </div>
  );
};

export default Model1;