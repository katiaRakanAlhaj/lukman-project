const Model17 = ({ data }) => {
  return (
    <div>
      <h1 className="font-bold text-[1.5rem] text-secondary">{data.title}</h1>
      {data.image && (
        <img
          className="w-full lg:h-[40rem] h-[25rem] object-cover mt-2"
          src={data.image}
          alt={data.title}
        />
      )}
    </div>
  );
};

export default Model17;
