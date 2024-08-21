import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavbarIntern = ({ currentPage, username }) => {
    const navigate = useNavigate(); // สร้างตัวแปร navigate สำหรับการเปลี่ยนหน้า

    const goToHome = () => {
        navigate('/'); // เส้นทางหน้าหลักที่คุณต้องการ
    };

    return (
        <>
            <div className='banner-container'>
                <img src="/src/img/nav2.jpg" alt="Banner Image" className="w-full h-auto" />
            </div>
            <div className="navbar flex justify-between items-center h-21 bg-gray-800">
                <div className="flex items-center ml-5">
                    {/* ห่อโลโก้ด้วยแท็ก <a> และเพิ่ม onClick เพื่อเปลี่ยนหน้า */}
                    <a onClick={goToHome} className="cursor-pointer">
                        <img src="/src/img/Siam_Cement_Group_Logo.svg.png" alt="Logo" className="h-16 m-4" />
                    </a>
                </div>
                <div className="flex items-center ml-8">
                    <div className="mr-5 text-white text-right ">
                        <p className='text-left' style={{ height: '30px' }}>Team Development</p>
                        <p style={{color:'	#c0c0c0	'}}>Phurin Chairoek</p>
                    </div>
                    <div className="bg-white w-px h-16 mx-4"></div>
                    <img src="/src/img/img_icon/exit.png" alt="Log out" style={{height:'25px'}}/>
                    <a href="logout.php" className="text-white mr-12 pb-1" style={{margin:'12px'}}>Logout</a>
                </div>
            </div>
        </>
    );
};

export default NavbarIntern;
