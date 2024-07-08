import { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [showPassWord, setShowPassWord] = useState(false);
  const { createUser } = useContext(AuthContext);
  const handleRegitser = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const name = form.get("name");
    const photo = form.get("photo");

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }
    createUser(email, password)
      .then((result) => {
        toast.success("successfully logged in");
        console.log(result);
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });
      })
      .catch((error) => {
        toast.error("There was an error");
        console.log(error);
      });
  };

  return (
    <div>
      <Toaster />
      <div className="  ">
        <div className=" flex border-2 ">
          <div className="card w-[70%]">
            <form className="card-body" onSubmit={handleRegitser}>
              <div className="form-control">
                <h1 className="text-3xl md:text-5xl font-bold text-center">
                  Register now!
                </h1>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
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
                  name="email"
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
                  name="photo"
                  type="text"
                  placeholder="photo url"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-success text-white">Register</button>
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
