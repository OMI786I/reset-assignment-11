import axios from "axios";
import { useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";

const SubmissionForm = () => {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const { user } = useContext(AuthContext);
  const submitterEmail = user.email;
  const name = user.reloadUserInfo.screenName;

  const submitterName = user.displayName ? user.displayName : name;
  const status = "pending";
  const obtainedMarks = "not yet evaluated";
  const title = data.title;
  const description = data.description;
  const marks = data.marks;
  const difficulty = data.difficulty;
  const userEmail = data.userEmail;
  const startDate = data.startDate;
  const photo = data.photo;
  const feedback = "No feedback yet";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://a11-three.vercel.app/createdAssignment/${params.id}`, {
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

  //console.log(data);

  const handleTakeAssignment = (e) => {
    e.preventDefault();
    //console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);
    const link = form.get("link");
    const notes = form.get("notes");
    const submitData = {
      title,
      description,
      marks,
      difficulty,
      userEmail,
      startDate,
      photo,
      submitterEmail,
      status,
      obtainedMarks,
      submitterName,
      feedback,
      link,
      notes,
    };

    axios
      .post("https://a11-three.vercel.app/submission", submitData, {
        withCredentials: "true",
      })
      .then((response) => {
        toast.success("successfully taken the assignment");
        //console.log(response);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div>
        <form
          className="card-body md:w-[50%] mx-auto bg-green-600 rounded-2xl mt-10 "
          onSubmit={handleTakeAssignment}
        >
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
              required
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
            ></textarea>
          </div>
          <button className="btn  btn-warning "> Submit</button>
        </form>
      </div>
    );
};

export default SubmissionForm;
