import Layouts from "../Layouts/Layouts";
import NotFound from "../pages/404/404";
import Auth from "../pages/Auth/Auth";
import Home from "../pages/home/Home";

// create public router
const publicRouter = [
    {
        element: <Layouts />,
        children: [
            {
                path: '*',
                element: <NotFound />
            },
            {
                path: '/',
                element: <Auth />
            },
            {
                path: '/home',
                element: <Home />
            }
        ]
    }
];

export default publicRouter;
