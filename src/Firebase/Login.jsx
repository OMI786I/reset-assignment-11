import { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "./AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [showPassWord, setShowPassWord] = useState(false);
  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const { googleSignIn, githubSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogle = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      navigate(location?.state ? location.state : "/");
      toast.success("Successfully logged in");
    });
  };

  const handleGitHub = () => {
    githubSignIn().then((result) => {
      console.log(result.user);
      navigate(location?.state ? location.state : "/");
      toast.success("Successfully logged in");
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    signIn(email, password)
      .then((result) => {
        toast.success("Successfully logged in");

        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error("Couldn't sign. Are you registered?");
        setError(error);
      });
  };

  return (
    <div>
      <div className="  ">
        <div className=" flex border-2 ">
          <div className="card w-[70%]">
            <div className="">
              <div className="form-control">
                <h1 className="text-3xl md:text-5xl font-bold text-center mb-2">
                  Login now!
                </h1>
              </div>
              <p className="text-center">Sign in with social networks</p>
              <div className="flex justify-center">
                {" "}
                <div className="flex gap-4">
                  <button className="btn" onClick={handleGoogle}>
                    <FcGoogle className="text-3xl" />
                  </button>
                  <button className="btn" onClick={handleGitHub}>
                    <FaGithub className="text-3xl" />
                  </button>
                </div>
              </div>
            </div>
            <form className="card-body" onSubmit={handleLogin}>
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
                  <p className="mb-5">Do not have an account?</p>
                  <Link to="/register">
                    {" "}
                    <button className="btn btn-primary">Register</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="md:hidden">
          Do not have an account?{" "}
          <Link to="/register" className="text-blue-700 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
