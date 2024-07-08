import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root.jsx";
import Home from "./Components/Home.jsx";
import Assignments from "./Components/Assignments.jsx";
import CreateAssignments from "./Components/CreateAssignments.jsx";
import PendingAssignments from "./Components/PendingAssignments.jsx";
import Login from "./Firebase/Login.jsx";
import Register from "./Firebase/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/assignments",
        element: <Assignments></Assignments>,
      },
      {
        path: "/createAssignments",
        element: <CreateAssignments></CreateAssignments>,
      },
      {
        path: "/pendingAssignments",
        element: <PendingAssignments></PendingAssignments>,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
