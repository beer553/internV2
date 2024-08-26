// // ProtectedRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const ProtectedRoute = ({ element, roleRequired }) => {
//   const { user } = useAuth();

//   if (!user) {
//     // ถ้าผู้ใช้ไม่ได้ล็อกอิน, ให้ redirect ไปที่หน้า login
//     return <Navigate to="/" />;
//   }

// //   if (roleRequired && user.role !== roleRequired) {
// //     // ถ้าผู้ใช้ไม่มีสิทธิ์, ให้ redirect ไปที่หน้า home หรือหน้าอื่น ๆ ตามต้องการ
// //     return <Navigate to="/home" />;
// //   }

//   return element;
// };

// export default ProtectedRoute;
