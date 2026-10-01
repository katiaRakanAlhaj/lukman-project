const SingleActivityBanner = ({ singleActivityData }) => {
    return (
        <div className="lg:mt-[2.5rem]">
            <div className="w-full relative flex items-center justify-center text-center lg:h-[34rem] h-[20rem]">
                <div
                    className="absolute lg:rounded-3xl w-full h-full bg-cover -z-10 transition-all duration-700"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 57.69%, rgb(0, 0, 0) 100%), url("${singleActivityData?.banner}")`,
                        backgroundRepeat: "no-repeat",
                    }}
                ></div>
            </div>
        </div>
    );
};

export default SingleActivityBanner;