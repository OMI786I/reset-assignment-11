import { useParams } from "react-router-dom";

const SubmissionForm = () => {
  const params = useParams();
  console.log(params.id);

  return (
    <div>
      <form className="card-body md:w-[50%] mx-auto bg-green-600 rounded-2xl mt-10 ">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">
              {" "}
              Insert your pdf link here{" "}
            </span>
          </label>
          <input
            name="title"
            type="text"
            placeholder=" title"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white"> Quick Text Notes</span>
          </label>
          <textarea
            name="description"
            placeholder="description"
            className="textarea textarea-bordered textarea-lg w-full resize-none"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default SubmissionForm;
