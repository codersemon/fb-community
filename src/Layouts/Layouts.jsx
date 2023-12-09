// dependencies
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const Layouts = () => {
  return (
    <>
    <ToastContainer />
      <Outlet />
    </>
  );
};

export default Layouts;
