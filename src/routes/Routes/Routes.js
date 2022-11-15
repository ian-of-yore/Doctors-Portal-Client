import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import LogIn from "../../pages/Authentication/LogIn/LogIn";
import Register from "../../pages/Authentication/Register/Register";
import Home from "../../pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <LogIn></LogIn>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    }
])