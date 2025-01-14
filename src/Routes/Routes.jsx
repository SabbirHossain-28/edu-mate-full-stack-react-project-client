import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/MainLayout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import MyClasses from "../Pages/Dashboard/StudentRoutes/MyClasses/MyClasses";
import TeachOn from "../Pages/TeachOn/TeachOn";
import AllClasses from "../Pages/AllClasses/AllClasses";
import AllUsers from "../Pages/Dashboard/AdminRoutes/AllUsers/AllUsers";
import TeacherRequest from "../Pages/Dashboard/AdminRoutes/TeacherRequest/TeacherRequest";
import AddClass from "../Pages/Dashboard/TeacherRoutes/AddClass/AddClass";
import MyClass from "../Pages/Dashboard/TeacherRoutes/MyClass/MyClass";
import AllAddedClasses from "../Pages/Dashboard/AdminRoutes/AllAddedClasses/AllAddedClasses";
import AddedClassDetails from "../Pages/Dashboard/TeacherRoutes/MyClass/AddedClassDetails";
import ClassDetailEnroll from "../Pages/AllClasses/ClassDetailEnroll";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import AdminRoute from "./AdminRoute";
import MyClassDetails from "../Pages/Dashboard/StudentRoutes/MyClassDetails";
import AddedClassProgress from "../Pages/Dashboard/AdminRoutes/AllAddedClasses/AddedClassProgress";
import MyOrder from "../Pages/Dashboard/StudentRoutes/MyOrder/MyOrder";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/teachOn",
        element: (
          <PrivateRoute>
            <TeachOn></TeachOn>
          </PrivateRoute>
        ),
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/classDetail-enroll/:id",
        element: (
          <PrivateRoute>
            <ClassDetailEnroll></ClassDetailEnroll>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "userProfile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "enrollClasses",
        element: (
          <PrivateRoute>
            <MyClasses></MyClasses>
          </PrivateRoute>
        ),
      },
      {
        path: "myOrder",
        element: (
          <PrivateRoute>
            <MyOrder></MyOrder>
          </PrivateRoute>
        ),
      },
      {
        path: "enrollClassDetails/:id",
        element: (
          <PrivateRoute>
            <MyClassDetails></MyClassDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <AllUsers></AllUsers>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "teacherRequest",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <TeacherRequest></TeacherRequest>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "allAddedClasses",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <AllAddedClasses></AllAddedClasses>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "addedClassProgress/:id",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <AddedClassProgress></AddedClassProgress>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "addClass",
        element: (
          <PrivateRoute>
            <AddClass></AddClass>
          </PrivateRoute>
        ),
      },
      {
        path: "myClass",
        element: (
          <PrivateRoute>
            <MyClass></MyClass>
          </PrivateRoute>
        ),
      },
      {
        path: "my-class/:id",
        element: (
          <PrivateRoute>
            <AddedClassDetails></AddedClassDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
