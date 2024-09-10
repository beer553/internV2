import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';  // ดึงข้อมูลจาก AuthContext

const NavbarIntern = () => {
    const { user, logout } = useAuth();  // ใช้ข้อมูลจาก Context และดึงฟังก์ชัน logout
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(true); // ใช้เพื่อตรวจสอบการโหลดข้อมูล

    useEffect(() => {
        // ตรวจสอบว่าข้อมูล user จาก Context มีหรือไม่
        if (user) {
            setUsername(user.username);
            setRole(user.role);

            // บันทึกข้อมูลลง localStorage เผื่อกรณีที่ต้องการใช้ในอนาคต
            localStorage.setItem('username', user.username);
            localStorage.setItem('role', user.role);
        } else {
            // กรณีที่ไม่มี user ใน Context จะพยายามดึงจาก localStorage
            const storedUsername = localStorage.getItem('username');
            const storedRole = localStorage.getItem('role');


            if (storedUsername && storedRole) {
                setUsername(storedUsername);
                setRole(storedRole);
            } else {
                console.log('No username or role found in localStorage.');
            }
        }

        setIsLoading(false); // เสร็จสิ้นการโหลดข้อมูล
    }, [user]);

    // ฟังก์ชันสำหรับทำการ Logout
    const handleLogout = () => {
        // ล้างข้อมูลใน localStorage ทั้งหมด
        localStorage.clear();

        // เรียกฟังก์ชัน logout จาก Context เพื่อล้างข้อมูลใน Context
        logout();  // ฟังก์ชัน logout ที่นำมาจาก useAuth()

        // นำผู้ใช้กลับไปที่หน้า login หรือหน้าเริ่มต้น
        window.location.href = '/'; // หรือเปลี่ยนเป็นเส้นทางที่คุณต้องการ
    };

    // ตรวจสอบ role และกำหนดข้อความที่จะแสดง
    const roleDisplay = role === 'intern' 
        ? 'Team Development' 
        : role === 'mentor' 
        ? 'Scrum Master' 
        : role ? role : 'Unknown Role';  // เพิ่มการตรวจสอบค่า role

    // กำหนดการแสดงผลเมื่อกำลังโหลด
    if (isLoading) {
        return <div>Loading...</div>; // แสดงข้อความ Loading ระหว่างที่ข้อมูลกำลังถูกดึง
    }

    return (
        <>
            <div className='banner-container'>
                <img 
                    src="/src/img/nav2.jpg" 
                    alt="Banner Image" 
                    style={{flex:'1',display:'flex',justifyContent:'center',alignItems:'center',backgroundSize:'cover'}} 
                />
            </div>
            <div className="navbar flex justify-between items-center h-21 bg-gray-800">
                <div className="flex items-center ml-5">
                    <img 
                        src="/src/img/Siam_Cement_Group_Logo.svg.png" 
                        alt="Logo" 
                        className="h-16 m-4" 
                    />
                </div>
                <div className="flex items-center ml-8">
                    <div className="mr-5 text-white text-right">
                        <p className='text-left' style={{ height: '30px' }}>
                            {role ? roleDisplay : 'Loading Role...'} {/* แสดง Loading ระหว่างรอข้อมูล role */}
                        </p>
                        <p style={{color:'#c0c0c0'}}>{username || 'Loading Username...'}</p> {/* แสดง Loading ระหว่างรอข้อมูล username */}
                    </div>
                    <div className="bg-white w-px h-16 mx-4"></div>
                    <button onClick={handleLogout} className="text-white mr-12">Logout</button>
                </div>
            </div>
        </>
    );
};

export default NavbarIntern;
