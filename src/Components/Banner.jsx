const Banner = () => {
  return (
    <div>
      <div className="hero bg-green-600 min-h-screen w-[90%] mx-auto rounded-3xl mt-7">
        <div className="hero-content flex-col lg:flex-row-reverse md:p-12">
          <img
            src="https://i.ibb.co/3fQ2BjD/writing-assignment-190304.jpg"
            className="max-w-xsm md:max-w-lg rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Move beyond the limitations of e learning
            </h1>
            <p className="py-6 text-white">
              Let us do group study. You can easily give your assignment and do
              other's assignment. A great opportunity for all{" "}
            </p>
            <button className="btn btn-white">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
