import { SiSololearn, SiGoogleclassroom } from "react-icons/si";
import { FaList, FaUserGraduate } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    // <div className="flex">
    //   <div className="w-72 min-h-screen bg-[#07332F]">
    //     <div className="flex items-center justify-center my-4">
    //       <SiSololearn className="text-[#F2871D] text-3xl"></SiSololearn>
    //       <h2 className="text-3xl text-[#F2871D] font-pop font-bold ">
    //         EduMate
    //       </h2>
    //     </div>
    //     {/* <ul className="menu">
    //       {isAdmin ? (
    //         <>
    //         <li>
    //             <NavLink
    //               className="text-lg font-medium"
    //               to="/dashboard/adminHome"
    //             >
    //               <FaHome className="text-xl"></FaHome>AdminHome
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink className="text-lg font-medium" to="/dashboard/addItems">
    //               <FaUtensils className="text-xl"></FaUtensils>Add Items
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink className="text-lg font-medium" to="/dashboard/manageItems">
    //               <FaList className="text-xl"></FaList>Manage Items
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink className="text-lg font-medium" to="/dashboard/manageBookings">
    //               <FaBook className="text-xl"></FaBook>Manage Bookings
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink className="text-lg font-medium" to="/dashboard/Users">
    //               <FaUsers className="text-xl"></FaUsers>All Users
    //             </NavLink>
    //           </li>
    //           </>
    //       ) : (
    //         <>
    //           <li>
    //             <NavLink
    //               className="text-lg font-medium"
    //               to="/dashboard/userHome"
    //             >
    //               <TiHome className="text-xl"></TiHome>UserHome
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink className="text-lg font-medium" to="/dashboard/cart">
    //               <TiShoppingCart className="text-xl"></TiShoppingCart>My Cart
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink className="text-lg font-medium" to="/dashboard/paymentHistory">
    //               <FaMoneyBills className="text-xl"></FaMoneyBills>Payment History
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink
    //               className="text-lg font-medium"
    //               to="/dashboard/reservation"
    //             >
    //               <TiCalendar className="text-xl"></TiCalendar>Reservation
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink className="text-lg font-medium" to="/dashboard/review">
    //               <MdOutlineRateReview className="text-xl"></MdOutlineRateReview>
    //               Add Review
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink
    //               className="text-lg font-medium"
    //               to="/dashboard/booking"
    //             >
    //               <MdBookOnline className="text-xl"></MdBookOnline>My Bookings
    //             </NavLink>
    //           </li>
    //         </>
    //       )}
    //       <div className="divider"></div>
    //       <li>
    //         <NavLink className="text-lg font-medium" to="/">
    //           <TiHome className="text-xl"></TiHome>Home
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink className="text-lg font-medium" to="/menu">
    //           <TiThMenu className="text-xl"></TiThMenu> Menu
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink className="text-lg font-medium" to="/shop/salad">
    //           <TiShoppingBag className="text-xl"></TiShoppingBag> Our Shop
    //         </NavLink>
    //       </li>
    //     </ul> */}
    //     <ul className="menu">
    //       <li>
    //         <NavLink
    //           className="text-lg text-white font-medium"
    //           to="/dashboard/myClasses"
    //         >
    //           <SiGoogleclassroom className="text-xl"></SiGoogleclassroom>My
    //           Enroll Class
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           className="text-lg text-white font-medium"
    //           to="/dashboard/studentProfile"
    //         >
    //           <FaUserGraduate className="text-xl"></FaUserGraduate>My Profile
    //         </NavLink>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="flex-1">
    //     <Outlet></Outlet>
    //   </div>
    // </div>
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
