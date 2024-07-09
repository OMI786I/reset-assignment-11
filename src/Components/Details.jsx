import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FcDocument } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { FcBiohazard } from "react-icons/fc";
import { FcLeave } from "react-icons/fc";

const Details = () => {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/createdAssignment/${params.id}`)
      .then((assignment) => {
        setData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div>
        <div className="flex gap-5">
          <div className="w-[50%]">
            <img src={data.photo}></img>
          </div>
          <div className="w-[49%]">
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <div className="flex items-center gap-1 my-2">
              <FcDocument></FcDocument>
              <h1 className="text-xl underline">Details</h1>
            </div>

            <p>{data.description}</p>
            <div className="flex gap-4 mt-6">
              <div className="flex justify-center items-center flex-col">
                <FcOk className="text-xl md:text-2xl"></FcOk>
                <h1 className="text-md">Marks</h1>
                <p>{data.marks}</p>
              </div>
              <div className="flex justify-center items-center flex-col">
                <FcBiohazard className="text-xl md:text-2xl" />
                <h1 className="text-md">Difficulty</h1>
                <p>{data.difficulty}</p>
              </div>
              <div className="flex justify-center items-center flex-col">
                <FcLeave className="text-xl md:text-2xl" />
                <h1 className="text-md">Date</h1>
                <p>{data.startDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Details;
