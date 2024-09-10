import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated, isLoading } = useAuth(); // เพิ่ม isLoading
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>; // รอให้โหลดข้อมูลเสร็จก่อน
    }

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace state={{ from: location }} />
    );
};

export default PrivateRoute;
