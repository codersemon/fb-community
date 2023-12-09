import Layouts from "../Layouts/Layouts";
import NotFound from "../pages/404/404";
import Auth from "../pages/Auth/Auth";

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
            }
        ]
    }
];

export default publicRouter;
