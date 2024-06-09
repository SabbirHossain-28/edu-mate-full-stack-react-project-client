import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/MainLayout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import MyClasses from "../Pages/Dashboard/StudentRoutes/MyClasses/MyClasses";
import StudentProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import TeachOn from "../Pages/TeachOn/TeachOn";
import AllClasses from "../Pages/AllClasses/AllClasses";
import AllUsers from "../Pages/Dashboard/AdminRoutes/AllUsers/AllUsers";
import TeacherRequest from "../Pages/Dashboard/AdminRoutes/TeacherRequest/TeacherRequest";
import AddClass from "../Pages/Dashboard/TeacherRoutes/AddClass/AddClass";
import MyClass from "../Pages/Dashboard/TeacherRoutes/MyClass/MyClass";
import AllAddedClasses from "../Pages/Dashboard/AdminRoutes/AllAddedClasses/AllAddedClasses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
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
        path: "enrollClasses",
        element: <MyClasses></MyClasses>,
      },
      {
        path: "userProfile",
        element: <StudentProfile></StudentProfile>,
      },
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "teacherRequest",
        element: <TeacherRequest></TeacherRequest>,
      },
      {
        path: "allAddedClasses",
        element: <AllAddedClasses></AllAddedClasses>
      },
      {
        path: "addClass",
        element: <AddClass></AddClass>,
      },
      {
        path: "myClass",
        element: <MyClass></MyClass>,
      },
    ],
  },
]);
