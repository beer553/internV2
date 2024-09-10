import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // เพิ่ม isLoading เพื่อตรวจสอบการโหลดข้อมูล

    // ฟังก์ชันที่ใช้ในการเข้าสู่ระบบ
    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);

        // บันทึกข้อมูลผู้ใช้ใน localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
    };

    // ฟังก์ชันที่ใช้ในการออกจากระบบ
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);

        // ลบข้อมูลผู้ใช้จาก localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
    };

    // ตรวจสอบสถานะการเข้าสู่ระบบเมื่อ component ถูกโหลดใหม่
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedAuthStatus = localStorage.getItem('isAuthenticated');

        if (storedAuthStatus === 'true' && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        } else {
            setIsAuthenticated(false);
        }

        setIsLoading(false); // สิ้นสุดการโหลดข้อมูล
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// ฟังก์ชันที่ใช้ในการเข้าถึง context
export const useAuth = () => {
    return useContext(AuthContext);
};
