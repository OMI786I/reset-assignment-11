import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLink = (
    <div className="flex-row md:flex-col gap-6  ">
      <NavLink to="/">
        <button className="hover:border-yellow-500 border-transparent border-2 duration-150 hover:text-yellow-500 font-bold p-2 rounded-lg focus:border-yellow-500 focus:text-yellow-500">
          Home
        </button>
      </NavLink>
      <NavLink to="/assignments">
        <button className="hover:border-yellow-500 border-transparent border-2 duration-150 hover:text-yellow-500 font-bold p-2 rounded-lg focus:border-yellow-500 focus:text-yellow-500">
          assignments
        </button>
      </NavLink>
      <NavLink to="/createAssignments">
        <button className="hover:border-yellow-500 border-transparent border-2 duration-150 hover:text-yellow-500 font-bold p-2 rounded-lg focus:border-yellow-500 focus:text-yellow-500">
          create assignments
        </button>
      </NavLink>
      <NavLink to="/pendingAssignments">
        <button className="hover:border-yellow-500 border-transparent border-2 duration-150 hover:text-yellow-500 font-bold p-2 rounded-lg focus:border-yellow-500 focus:text-yellow-500">
          pending assignmens
        </button>
      </NavLink>
    </div>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
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
          <div className="flex items-center">
            {" "}
            <img src="pngegg_(1).png" className="w-[30px]"></img>
            <p className="font-bold hidden md:block">Poralekha</p>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLink}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Register </a>
          <a className="btn">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
