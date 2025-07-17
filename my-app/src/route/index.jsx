import { createBrowserRouter } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

export const router=createBrowserRouter([
{
    path:"/*",
    element:<UserRoutes/>
},
{
    path:"admin/*",
    element:<AdminRoutes/>
}
,
    
])