import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FcDocument } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { FcBiohazard } from "react-icons/fc";
import { FcLeave } from "react-icons/fc";
import { format } from "date-fns";
import { AuthContext } from "../Firebase/AuthProvider";

const Details = () => {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const SubmitterEmail = user.email;
  const status = "pending";

  const submitData = { ...data, SubmitterEmail, status };

  const handleTakeAssignment = () => {
    axios
      .post("http://localhost:5000/submission", submitData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const date = data.startDate
    ? format(data.startDate, "dd MMMM yyyy")
    : "date not available";
  console.log(date);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div>
        <div className="flex  md:gap-5 flex-col md:flex-row ">
          <div className="md:w-[50%]">
            <img src={data.photo} className="w-full md:h-96"></img>
          </div>
          <div className="md:w-[49%] p-3 flex justify-between flex-col gap-5 ">
            <div>
              <h1 className="text-2xl font-bold">{data.title}</h1>
              <div className="flex items-center gap-1 my-2">
                <FcDocument></FcDocument>
                <h1 className="text-xl underline">Details</h1>
              </div>

              <p>{data.description}</p>
              <div className="flex gap-4 mt-6">
                <div className="flex justify-center items-center flex-col">
                  <FcOk className="text-xl md:text-2xl"></FcOk>
                  <h1 className="text-md font-bold">Marks</h1>
                  <p>{data.marks}</p>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <FcBiohazard className="text-xl md:text-2xl" />
                  <h1 className="text-md font-bold">Difficulty</h1>
                  <p>{data.difficulty}</p>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <FcLeave className="text-xl md:text-2xl" />
                  <h1 className="text-md font-bold">Date</h1>
                  <p>{date}</p>
                </div>
              </div>
            </div>

            <Link to={`/submission/${data._id}`}>
              <button
                className="btn btn-success text-white"
                onClick={() => handleTakeAssignment()}
              >
                Take Assignment
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Details;
