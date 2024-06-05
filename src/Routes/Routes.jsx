import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/MainLayout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import MyClasses from "../Pages/Dashboard/MyClasses/MyClasses";
import StudentProfile from "../Pages/Dashboard/StudentProfile/StudentProfile";
import TeachOn from "../Pages/TeachOn/TeachOn";

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
        path:"/teachOn",
        element:<TeachOn></TeachOn>
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
    children:[
        {
            path:"myClasses",
            element:<MyClasses></MyClasses>
        },
        {
            path:"studentProfile",
            element:<StudentProfile></StudentProfile>
        },
    ]
  },
]);
