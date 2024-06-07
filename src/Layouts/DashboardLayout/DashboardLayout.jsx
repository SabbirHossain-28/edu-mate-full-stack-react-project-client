import { SiSololearn, SiGoogleclassroom } from "react-icons/si";
import { FaList, FaUserGraduate } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../Hooks/useRole";

const DashboardLayout = () => {
  const [role]=useRole();
  console.log(role);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="btn bg-base-green drawer-button lg:hidden"
        >
          <FaList className="text-xl text-base-orange"></FaList>
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-green text-base-content">
        <div className="flex items-center justify-center my-4">
          <SiSololearn className="text-[#F2871D] text-3xl"></SiSololearn>
          <h2 className="text-3xl text-[#F2871D] font-pop font-bold ">
            EduMate
          </h2>
        </div>
          <li>
            <NavLink
              className="text-lg text-white font-medium"
              to="/dashboard/myClasses"
            >
              <SiGoogleclassroom className="text-xl"></SiGoogleclassroom>My
              Enroll Class
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-lg text-white font-medium"
              to="/dashboard/studentProfile"
            >
              <FaUserGraduate className="text-xl"></FaUserGraduate>My Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
