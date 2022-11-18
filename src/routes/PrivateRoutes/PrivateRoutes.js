import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    let location = useLocation();

    if (loading === true) {
        return <button className="btn loading w-full h-full">loading</button>
    }

    if (user?.uid) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }}></Navigate>
};

export default PrivateRoutes;