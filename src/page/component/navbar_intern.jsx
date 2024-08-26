import React, { useEffect, useState } from 'react';

const NavbarIntern = () => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        // ดึงข้อมูลจาก localStorage
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('role');

        // ตรวจสอบและตั้งค่า username และ role
        if (storedUsername && storedRole) {
            setUsername(storedUsername);
            setRole(storedRole);
        } else {
            console.log('No username or role found in localStorage.');
        }
    }, []);

    // ฟังก์ชันสำหรับทำการ Logout
    const handleLogout = () => {
        // ล้างข้อมูลใน localStorage
        localStorage.removeItem('username');
        localStorage.removeItem('role');

        // นำผู้ใช้กลับไปที่หน้า login
        window.location.href = '/';
    };

    // ตรวจสอบ role และกำหนดข้อความที่จะแสดง
    const roleDisplay = role === 'intern' ? 'Team Development' : role === 'mentor' ? 'Scrum Master' : 'Unknown Role';

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
                        <p className='text-left' style={{ height: '30px' }}>{roleDisplay}</p>
                        <p style={{color:'#c0c0c0'}}>{username}</p>
                    </div>
                    <div className="bg-white w-px h-16 mx-4"></div>
                    <button onClick={handleLogout} className="text-white mr-12">Logout</button>
                </div>
            </div>
        </>
    );
};

export default NavbarIntern;
