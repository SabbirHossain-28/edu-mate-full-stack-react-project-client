import { SiSololearn} from "react-icons/si";
import { ImUserTie } from "react-icons/im";
import { Outlet } from "react-router-dom";
import useRole from "../../Hooks/useRole";
import NavlinkMenu from "../../Components/DashboardComponent/NavlinkMenu/NavlinkMenu";
import TeacherNavlinkMenu from "../../Components/DashboardComponent/NavlinkMenu/TeacherNavlinkMenu/TeacherNavlinkMenu";
import AdminNavlinkMenu from "../../Components/DashboardComponent/NavlinkMenu/AdminNavlinkMenu/AdminNavlinkMenu";
import StudentNavlinkMenu from "../../Components/DashboardComponent/NavlinkMenu/StudentNavlinkMenu/StudentNavlinkMenu";
import { FaList } from "react-icons/fa";


const DashboardLayout = () => {
  const [role] = useRole();
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
        <ul className="menu justify-between p-4 w-72 min-h-full bg-base-green text-base-content">
          <div>
            <div className="flex items-center justify-center my-4">
              <SiSololearn className="text-[#F2871D] text-3xl"></SiSololearn>
              <h2 className="text-3xl text-[#F2871D] font-pop font-bold ">
                EduMate
              </h2>
            </div>
            <li>{role === "Admin" && <AdminNavlinkMenu></AdminNavlinkMenu>}</li>
            <li>
              {role === "Teacher" && <TeacherNavlinkMenu></TeacherNavlinkMenu>}
            </li>
            <li>
              {role === "Student" && <StudentNavlinkMenu></StudentNavlinkMenu>}
            </li>
          </div>
          <div>
            <li>
              <NavlinkMenu
                label={"My Profile"}
                address={"/dashboard/userProfile"}
                icon={ImUserTie}
              ></NavlinkMenu>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
