import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Toaster></Toaster>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
