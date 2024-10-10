import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';  // ดึงข้อมูลจาก AuthContext
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate แทน useHistory

const NavbarIntern = () => {
    const { user, logout } = useAuth();  // ใช้ข้อมูลจาก Context และดึงฟังก์ชัน logout
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(true); // ใช้เพื่อตรวจสอบการโหลดข้อมูล
    const navigate = useNavigate(); // สร้าง instance ของ useNavigate สำหรับการนำทาง

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

    // ฟังก์ชันสำหรับการนำทางเมื่อคลิกโลโก้
    const handleLogoClick = () => {
        if (role === 'intern') {
            navigate('/home');  // นำไปที่หน้า home สำหรับ intern
        } else if (role === 'mentor') {
            navigate('/homepage');  // นำไปที่หน้า homepage สำหรับ mentor
        } else {
            console.log('Unknown role, redirecting to default page');
            navigate('/'); // กรณี role ไม่ถูกต้องให้กลับไปที่หน้าหลัก
        }
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
                    style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundSize: 'cover' }}
                />
            </div>
            <div className="navbar flex justify-between items-center h-21 bg-gray-800">
                <div className="flex items-center ml-5">
                    <img
                        src="/src/img/Siam_Cement_Group_Logo.svg.png"
                        alt="Logo"
                        className="h-16 m-4 cursor-pointer"
                        onClick={handleLogoClick}  // เพิ่มฟังก์ชันให้คลิกโลโก้แล้วนำทาง
                    />
                </div>
                <div className="flex items-center ml-8">
                    <div className="mr-5 text-white text-right">
                        <p className='text-left' style={{ height: '30px' }}>
                            {role ? roleDisplay : 'Loading Role...'} {/* แสดง Loading ระหว่างรอข้อมูล role */}
                        </p>
                        <p style={{ color: '#c0c0c0' }}>{username || 'Loading Username...'}</p> {/* แสดง Loading ระหว่างรอข้อมูล username */}
                    </div>
                    <div className="bg-white w-px h-16 mx-4"></div>
                    <div onClick={handleLogout} className="flex items-center cursor-pointer">
                        <img src="/src/img/img_icon/exit.png" alt="Log out" className="h-[25px] mr-2" />
                        <button className="text-white mr-2">Logout</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarIntern;