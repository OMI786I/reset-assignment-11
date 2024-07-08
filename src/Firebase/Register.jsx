import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassWord, setShowPassWord] = useState(false);
  return (
    <div>
      <div className="  ">
        <div className=" flex border-2 ">
          <div className="card w-[70%]">
            <form className="card-body">
              <div className="form-control">
                <h1 className="text-2xl font-bold text-center">
                  Register now!
                </h1>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="flex items-center grow">
                  {" "}
                  <input
                    name="password"
                    type={showPassWord ? "text" : "password"}
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                  <span
                    className="hover:cursor-pointer"
                    onClick={() => setShowPassWord(!showPassWord)}
                  >
                    {showPassWord ? (
                      <FaRegEye></FaRegEye>
                    ) : (
                      <FaRegEyeSlash></FaRegEyeSlash>
                    )}
                  </span>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="photo url"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-success text-white">Login</button>
              </div>
            </form>
          </div>
          <div className="w-[30%] hidden md:inline">
            <div
              className="hero min-h-screen min-w-screen"
              style={{
                backgroundImage: "url(https://i.ibb.co/DDMfDxD/5498400.jpg)",
              }}
            >
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                  <p className="mb-5">Already have an account?</p>
                  <Link to="/login">
                    {" "}
                    <button className="btn btn-primary">Sign in</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="md:hidden">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
