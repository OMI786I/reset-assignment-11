import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleSignOut = () => {
    logout();
  };

  const navLink = (
    <div className="flex-row md:flex-col gap-6  ">
      <NavLink to="/">
        <button className="hover:border-green-500 border-transparent border-b-2 duration-150 hover:text-green-500 font-bold p-2  focus:border-green-500 focus:text-green-500">
          Home
        </button>
      </NavLink>
      <NavLink to="/assignments">
        <button className="hover:border-green-500 border-transparent border-b-2 duration-150 hover:text-green-500 font-bold p-2  focus:border-green-500 focus:text-green-500">
          assignments
        </button>
      </NavLink>
      <NavLink to="/createAssignments">
        <button className="hover:border-green-500 border-transparent border-b-2 duration-150 hover:text-green-500 font-bold p-2  focus:border-green-500 focus:text-green-500">
          create assignments
        </button>
      </NavLink>
      <NavLink to="/pendingAssignments">
        <button className="hover:border-green-500 border-transparent border-b-2 duration-150 hover:text-green-500 font-bold p-2  focus:border-green-500 focus:text-green-500">
          pending assignmens
        </button>
      </NavLink>
    </div>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-1xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLink}
            </ul>
          </div>
          <div className="flex items-center ">
            {" "}
            <img src="pngegg_(1).png" className="w-[30px] ]"></img>
            <p className="font-bold hidden md:block">Poralekha</p>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLink}</ul>
        </div>
        <div className="navbar-end gap-2">
          {user ? (
            <div className="flex items-center">
              {" "}
              <div className="avatar">
                <div className=" w-14 rounded-full">
                  <img src={user.photoURL} />
                </div>
              </div>
              <button
                className="btn btn-error text-white"
                onClick={handleSignOut}
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex">
              <Link to="login">
                <button className="btn">Login</button>
              </Link>
              <Link to="register">
                <button className="btn btn-error text-white">Register </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
