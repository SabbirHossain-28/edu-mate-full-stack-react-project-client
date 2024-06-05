import { SiSololearn, SiGoogleclassroom } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <div className="w-72 min-h-screen bg-[#07332F]">
        <div className="flex items-center justify-center mt-4">
          <SiSololearn className="text-[#F2871D] text-3xl"></SiSololearn>
          <h2 className="text-3xl text-[#F2871D] font-pop font-bold ">
            EduMate
          </h2>
        </div>
        {/* <ul className="menu">
          {isAdmin ? (
            <>
            <li>
                <NavLink
                  className="text-lg font-medium"
                  to="/dashboard/adminHome"
                >
                  <FaHome className="text-xl"></FaHome>AdminHome
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg font-medium" to="/dashboard/addItems">
                  <FaUtensils className="text-xl"></FaUtensils>Add Items
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg font-medium" to="/dashboard/manageItems">
                  <FaList className="text-xl"></FaList>Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg font-medium" to="/dashboard/manageBookings">
                  <FaBook className="text-xl"></FaBook>Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg font-medium" to="/dashboard/Users">
                  <FaUsers className="text-xl"></FaUsers>All Users
                </NavLink>
              </li>
              </>
          ) : (
            <>
              <li>
                <NavLink
                  className="text-lg font-medium"
                  to="/dashboard/userHome"
                >
                  <TiHome className="text-xl"></TiHome>UserHome
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg font-medium" to="/dashboard/cart">
                  <TiShoppingCart className="text-xl"></TiShoppingCart>My Cart
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg font-medium" to="/dashboard/paymentHistory">
                  <FaMoneyBills className="text-xl"></FaMoneyBills>Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="text-lg font-medium"
                  to="/dashboard/reservation"
                >
                  <TiCalendar className="text-xl"></TiCalendar>Reservation
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg font-medium" to="/dashboard/review">
                  <MdOutlineRateReview className="text-xl"></MdOutlineRateReview>
                  Add Review
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="text-lg font-medium"
                  to="/dashboard/booking"
                >
                  <MdBookOnline className="text-xl"></MdBookOnline>My Bookings
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink className="text-lg font-medium" to="/">
              <TiHome className="text-xl"></TiHome>Home
            </NavLink>
          </li>
          <li>
            <NavLink className="text-lg font-medium" to="/menu">
              <TiThMenu className="text-xl"></TiThMenu> Menu
            </NavLink>
          </li>
          <li>
            <NavLink className="text-lg font-medium" to="/shop/salad">
              <TiShoppingBag className="text-xl"></TiShoppingBag> Our Shop
            </NavLink>
          </li>
        </ul> */}
        <ul className="menu">
          <li>
            <NavLink className="text-lg text-white font-medium" to="/dashboard/myClasses">
              <SiGoogleclassroom className="text-xl"></SiGoogleclassroom>My
              enroll class
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
