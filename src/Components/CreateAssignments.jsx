import { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CreateAssignments = () => {
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const userEmail = user.email;
  console.log(userEmail);
  console.log(startDate);
  return (
    <div>
      {" "}
      <form className="card-body md:w-[50%] mx-auto bg-green-600 rounded-2xl mt-10 ">
        <h1 className="text-center font-bold text-3xl underline text-white ">
          {" "}
          You can add Assignment here
        </h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white"> Title </span>
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
            <span className="label-text text-white"> description</span>
          </label>
          <input
            name="description"
            type="text"
            placeholder="description"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white"> marks</span>
          </label>
          <input
            name="marks"
            type="number"
            placeholder="marks"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Photo Url</span>
          </label>
          <input
            name="photo"
            type="text"
            placeholder="image"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Difficulty Level</span>
          </label>
          <select name="difficulty" className="select select-bordered">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Select due date</span>
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-warning">Add</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignments;
