import { Link, NavLink } from "react-router-dom";
import { SiSololearn } from "react-icons/si";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allClasses">All Classes</NavLink>
      </li>
      <li>
        <NavLink to="/teachOn">Teach on EduMate</NavLink>
      </li>
    </>
  );
  return (
    <>
      <div className="navbar bg-[#07332F]">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white"
            >
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-poppin"
            >
              {navLinks}
            </ul>
          </div>
          <Link className=" text-3xl font-pop text-[#151515]">
            <div className="flex items-center gap-1">
              <SiSololearn className="text-[#F2871D]"></SiSololearn>
              <p className="text-[#F2871D]">EduMate</p>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex text-white">
          <ul className="menu menu-horizontal px-1 font-poppin">{navLinks}</ul>
        </div>
        <div className="navbar-end ">
          <Link to="/login">
            <button className="btn btn-xs text-[#F2871D] font-poppin md:btn-sm lg:btn-md mr-4">
              Login
            </button>
          </Link>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar w-14 "
            >
              <div className="w-16 rounded-full border-4 border-green-600">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1]  p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 font-poppin"
            >
              <li>
                <p className="justify-between">Profile</p>
              </li>
              <li>
                <Link>Dashboard</Link>
              </li>
              <li>
                <button>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
