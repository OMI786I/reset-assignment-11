import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root.jsx";
import Home from "./Components/Home.jsx";
import Assignments from "./Components/Assignments.jsx";
import CreateAssignments from "./Components/CreateAssignments.jsx";
import PendingAssignments from "./Components/PendingAssignments.jsx";
import Login from "./Firebase/Login.jsx";
import Register from "./Firebase/Register.jsx";
import AuthProvider from "./Firebase/AuthProvider.jsx";
import PrivateRoute from "./Firebase/PrivateRoute.jsx";
import UpdatedAssignment from "./Components/UpdatedAssignment.jsx";
import Details from "./Components/Details.jsx";
import SubmissionForm from "./Components/SubmissionForm.jsx";
import MyList from "./Components/MyList.jsx";
import EvaluationCopy from "./Components/EvaluationCopy.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
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
        element: (
          <PrivateRoute>
            <CreateAssignments></CreateAssignments>
          </PrivateRoute>
        ),
      },
      {
        path: "/pendingAssignments",
        element: (
          <PrivateRoute>
            <PendingAssignments></PendingAssignments>,
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdatedAssignment></UpdatedAssignment>
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
      },
      {
        path: "/evaluationCopy/:id",
        element: (
          <PrivateRoute>
            <EvaluationCopy></EvaluationCopy>
          </PrivateRoute>
        ),
      },
      {
        path: "/list",
        element: (
          <PrivateRoute>
            <MyList></MyList>
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

      {
        path: "/submission/:id",
        element: (
          <PrivateRoute>
            {" "}
            <SubmissionForm></SubmissionForm>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
