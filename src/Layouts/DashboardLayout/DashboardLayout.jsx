import { ImUserTie } from "react-icons/im";
import { Link, Outlet } from "react-router-dom";
import useRole from "../../Hooks/useRole";
import NavlinkMenu from "../../Components/DashboardComponent/NavlinkMenu/NavlinkMenu";
import TeacherNavlinkMenu from "../../Components/DashboardComponent/NavlinkMenu/TeacherNavlinkMenu/TeacherNavlinkMenu";
import AdminNavlinkMenu from "../../Components/DashboardComponent/NavlinkMenu/AdminNavlinkMenu/AdminNavlinkMenu";
import StudentNavlinkMenu from "../../Components/DashboardComponent/NavlinkMenu/StudentNavlinkMenu/StudentNavlinkMenu";
import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { SiSololearn } from "react-icons/si";
import useAuth from "../../Hooks/useAuth";
import { RiLogoutCircleLine } from "react-icons/ri";

const DashboardLayout = () => {
  const [role] = useRole();
  const [isActive, setActive] = useState(false);
  const { userLogOut } = useAuth();

  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <div className="relative min-h-screen md:flex">
      {/* Sidebar */}
      {/* <Sidebar /> */}
      <div className="bg-gray-200 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <div className="flex items-center justify-center ">
                <SiSololearn className="text-[#F2871D] text-3xl"></SiSololearn>
                <h2 className="text-3xl text-[#F2871D] font-pop font-bold ">
                  EduMate
                </h2>
              </div>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-300"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-base-green w-64 space-y-6 px-3 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-xl rounded-lg justify-center items-center  mx-auto">
              <Link to="/">
                <div className="flex items-center justify-center ">
                  <SiSololearn className="text-[#F2871D] text-3xl"></SiSololearn>
                  <h2 className="text-3xl text-[#F2871D] font-pop font-bold ">
                    EduMate
                  </h2>
                </div>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between  flex-1 mt-6">
            {/*  Menu Items */}
            <nav className="navlink">
              {role === "Admin" && <AdminNavlinkMenu></AdminNavlinkMenu>}
              {role === "Teacher" && <TeacherNavlinkMenu></TeacherNavlinkMenu>}
              {role === "Student" && <StudentNavlinkMenu></StudentNavlinkMenu>}
            </nav>
          </div>
        </div>

        <div>
          <hr />
          {/* Profile Menu */}
          <NavlinkMenu
            label={"My Profile"}
            address={"/dashboard/userProfile"}
            icon={ImUserTie}
          ></NavlinkMenu>
          <button
            onClick={userLogOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <RiLogoutCircleLine className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Outlet --> Dynamic content */}
      <div className="flex-1 md:ml-64">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
