// dependencies
import { createBrowserRouter } from "react-router-dom";
import privateRouter from "./PrivateRouter";
import publicRouter from "./PublicRouter";

// create router
const router = createBrowserRouter([...privateRouter, ...publicRouter]);

// export default router
export default router;


document.addEventListener('click', function (event) {
    var modalContainer = document.getElementById('modalContainer');
    var modal = document.getElementById('myModal');
  
    // Check if the clicked element is outside the modal container
    if (event.target !== modalContainer && !modalContainer.contains(event.target)) {
      // If so, close the modal
      modal.style.display = 'none';
    }
  });
  