import { Link, NavLink } from "react-router-dom";
import { SiSololearn } from "react-icons/si";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { IoIosContact } from "react-icons/io";
import useRole from "../../Hooks/useRole";
import { useTheme } from "../../Hooks/useTheme";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const { user, userLogOut, loading } = useAuth();
  const [role] = useRole();
  const {changeTheme,mode}=useTheme();
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

  const handleUserLogOut = () => {
    userLogOut().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Bye Bye ${user?.displayName}! Come back soon`,
        showConfirmButton: false,
        timer: 1500,
        background: "#07332F",
        color: "#F2871D",
      });
    });
  };
  return (
    <>
      <div className="navbar bg-[#07332F] fixed z-[99] bg-opacity-80">
        <div className="navbar-start">
          <div className="dropdown bg-base-orange rounded-lg">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-200 dark:bg-gray-900 rounded-box w-52 font-poppin text-gray-700 dark:text-gray-400"
            >
              {navLinks}
            </ul>
          </div>
          <Link to={"/"} className=" text-3xl font-pop text-[#151515]">
            <div className="flex items-center gap-1 ml-1">
              <SiSololearn className="text-[#F2871D]"></SiSololearn>
              <p className="text-[#F2871D]">EduMate</p>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex text-white">
          <ul className="menu menu-horizontal px-1 font-poppin">{navLinks}</ul>
        </div>
        <div className="navbar-end ">
        <button onClick={changeTheme} className={`p-2 lg:p-4 ${mode==="light"?"bg-teal-500 text-black":"bg-gray-500"} rounded-full border-none text-2xl mr-3 lg:mr-5 `}>{mode==="light"?<MdLightMode></MdLightMode>:<MdDarkMode></MdDarkMode>}</button>
          {!user && !loading && (
            <Link to="/login">
              <button className="btn btn-xs text-[#F2871D] font-poppin md:btn-sm lg:btn-md mr-4">
                Login
              </button>
            </Link>
          )}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar w-14 "
            >
              <div
                className={`w-16 rounded-full border-4 ${
                  user ? "border-green-600" : "border-red-600"
                } `}
              >
                {user && !loading ? (
                  <img
                    referrerPolicy="no-referrer"
                    alt="user-image"
                    src={user?.photoURL}
                  />
                ) : (
                  <div className="flex justify-center items-center ">
                    {loading ? (
                      <p className="text-base-orange text-xs pt-3">
                        Loading...
                      </p>
                    ) : (
                      <IoIosContact className="text-gray-200 size-11 border-2 rounded-full"></IoIosContact>
                    )}
                  </div>
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1]  p-2 shadow menu menu-sm dropdown-content bg-slate-200 dark:bg-gray-900 rounded-box w-52 font-poppin"
            >
              <li>
                <p className="justify-between text-gray-700 dark:text-gray-400">
                  {user ? user?.displayName : "User not available"}(
                  {role ? role : "?"})
                </p>
              </li>
              <li className="text-gray-700 dark:text-gray-400">
                <Link to="/dashboard/userProfile">Dashboard</Link>
              </li>
              <li>
                <button
                  disabled={!user}
                  className={`bg-red-600 text-white ${
                    user
                      ? "hover:text-red-600"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={handleUserLogOut}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
