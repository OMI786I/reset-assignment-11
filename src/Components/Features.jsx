import axios from "axios";
import { useEffect, useState } from "react";

const Features = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/Features.json`)
      .then((assignment) => {
        setLoading(false);
        setData(assignment.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  //console.log(data);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div className="my-20 bg-base-200 rounded-xl ">
        <h1 className="text-3xl text-center my-10 bg-[#ffb300] p-8 text-black">
          Features
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((data) => (
            <div
              className="card bg-base-100 w-full  md:w-72 mx-auto my-6  shadow-xl pt-5"
              key={data.icon}
            >
              <figure>
                <img src={data.icon} className="w-16" alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{data.title}</h2>
                <p>{data.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Features;
