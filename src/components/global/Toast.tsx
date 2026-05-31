import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Toast=()=>{
    return (
           <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    )
}