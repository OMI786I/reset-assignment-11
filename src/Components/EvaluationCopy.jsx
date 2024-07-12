import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const EvaluationCopy = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const params = useParams();
  console.log(params.id);

  const handleGiveMark = (e) => {
    e.preventDefault();
  };

  const handleGiveMarks = (event) => {
    event.preventDefault();
    const form = event.target;

    const obtainedMarks = form.obtainedMarks.value;
    const feedback = form.feedback.value;
    const status = "marked";

    const newData = {
      obtainedMarks,
      feedback,
      status,
    };
    console.log(newData);

    //update operation
    axios
      .put(`http://localhost:5000/submission/${params.id}`, newData, {
        withCredentials: "true",
      })
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          toast.success("You have successfully Given marks");
        }
      })
      .catch((error) => {
        toast.error("There was an error ");
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/submission/${params.id}`, {
        withCredentials: "true",
      })
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
      <div className="bg-green-500">
        <div className="min-h-screen flex items-center justify-center ">
          <div className="hero w-full h-full rounded-lg">
            <div className="hero-content flex-col lg:flex-row-reverse h-full w-full">
              <div className="flex-1 flex flex-col items-center justify-center">
                <h1 className="text-xl text-white mb-4">Preview</h1>
                <iframe src={data.link} className="w-full h-full"></iframe>
              </div>

              <form
                className="card-body mx-auto bg-green-600 rounded-2xl mt-10 flex-1 flex flex-col items-center justify-center"
                onSubmit={handleGiveMark}
              >
                <div className="form-control w-full mb-4">
                  <label className="label">
                    <span className="label-text text-white">
                      Words/Pdf Link Here
                    </span>
                  </label>
                  <input
                    name="link"
                    type="text"
                    placeholder="link"
                    className="input input-bordered w-full"
                    value={data.link}
                  />
                </div>
                <div className="form-control w-full mb-4">
                  <label className="label">
                    <span className="label-text text-white">
                      Quick Text Notes
                    </span>
                  </label>
                  <textarea
                    name="notes"
                    placeholder="Notes"
                    className="textarea textarea-bordered textarea-lg w-full resize-none"
                    value={data.notes}
                  ></textarea>
                </div>
                <div className="w-full">
                  <h1 className="text-xl text-white mb-2">Submitted By:</h1>
                  <div className="bg-white rounded-xl p-2">
                    <h1>{data.submitterName}</h1>
                    <h1>{data.submitterEmail}</h1>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hero-content">
          <form onSubmit={handleGiveMarks}>
            <div className="">
              <div>
                <h1 className="text-xl text-black border bg-warning rounded-xl">
                  Total Marks:{data.marks}
                </h1>
              </div>
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text text-white text-xl">
                    Give marks
                  </span>
                </label>
                <input
                  name="obtainedMarks"
                  type="number"
                  placeholder="Give marks here"
                  className="input input-bordered w-full"
                  max={data.marks}
                />
              </div>

              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text text-white">Give Feedback</span>
                </label>
                <textarea
                  name="feedback"
                  placeholder="Feedback"
                  className="textarea textarea-bordered textarea-lg w-full resize-none"
                ></textarea>
              </div>
              <button className="btn btn-warning">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default EvaluationCopy;
