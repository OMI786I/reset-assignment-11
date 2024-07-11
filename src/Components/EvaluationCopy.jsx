import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FcViewDetails } from "react-icons/fc";
import { FcSurvey } from "react-icons/fc";
import { FcRight } from "react-icons/fc";

const EvaluationCopy = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/submission/${params.id}`)
      .then((assignment) => {
        setData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="hero bg-green-500 rounded-lg">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <h1 className="text-xl text-white">Preview</h1>
            <iframe src={data.link}></iframe>
          </div>

          <form className="card-body mx-auto bg-green-600 rounded-2xl mt-10 ">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">
                  {" "}
                  Insert your pdf link here{" "}
                </span>
              </label>
              <input
                name="link"
                type="text"
                placeholder=" link"
                className="input input-bordered"
                value={data.link}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white"> Quick Text Notes</span>
              </label>
              <textarea
                name="notes"
                placeholder="Notes"
                className="textarea textarea-bordered textarea-lg w-full resize-none"
                value={data.notes}
              ></textarea>
            </div>
            <div>
              <h1 className="text-xl text-white">Submitted By:</h1>
              <div className="bg-white rounded-xl p-2">
                {" "}
                <h1>{data.submitterName}</h1>
                <h1>{data.submitterEmail}</h1>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EvaluationCopy;
