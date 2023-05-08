import { Outlet, Navigate } from "react-router-dom";


const PrivateRoutes = ({ user, token }) => {

    if (user && token) { 
        return <Outlet />
    }
    return <Navigate to="/login"/>
};

export default PrivateRoutes;
