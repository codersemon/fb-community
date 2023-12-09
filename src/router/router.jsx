// dependencies
import { createBrowserRouter } from "react-router-dom";
import privateRouter from "./PrivateRouter";
import publicRouter from "./PublicRouter";

// create router
const router = createBrowserRouter([...privateRouter, ...publicRouter]);

// export default router
export default router;
