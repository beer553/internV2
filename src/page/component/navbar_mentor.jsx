import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavbarMentor = ({ currentPage, username }) => {
    const navigate = useNavigate(); // สร้างตัวแปร navigate สำหรับการเปลี่ยนหน้า
    const [menuOpen, setMenuOpen] = useState(false); // State to handle the menu toggle

    const goToHome = () => {
        navigate('/'); // เส้นทางหน้าหลักที่คุณต้องการ
    };

    return (
        <>
            <div className="banner-container">
                <img src="/src/img/nav2.jpg" alt="Banner Image" className="w-full h-auto" />
            </div>
            <div className="navbar flex justify-between items-center h-21 bg-gray-800">
                <div className="flex items-center ml-5">
                    <input
                        hidden
                        className="check-icon"
                        id="check-icon"
                        name="check-icon"
                        type="checkbox"
                        checked={menuOpen}
                        onChange={() => setMenuOpen(!menuOpen)}
                    />
                    <label
                        className="flex flex-col gap-[5px] cursor-pointer relative w-[25px]"
                        htmlFor="check-icon"
                    >
                        <div
                            className={`bar relative h-[3px] w-full rounded bg-[#ffffff] transition-all duration-300 ${menuOpen ? 'transform rotate-45 translate-y-[calc(5px)]' : 'rotate-0'
                                }`}
                        ></div>
                        <div
                            className={`bar relative h-[3px] w-full my-0.5 rounded bg-[#ffffff] transition-all duration-150 ${menuOpen ? 'transform scale-x-0' : 'scale-x-100'
                                }`}
                        ></div>
                        <div
                            className={`bar relative h-[3px] w-full rounded bg-[#ffffff] transition-all duration-300 ${menuOpen ? 'transform -rotate-45 -translate-y-[calc(15px)]' : 'rotate-0'
                                }`}
                        ></div>
                    </label>

                    <a onClick={goToHome} className="cursor-pointer">
                        <img src="/src/img/Siam_Cement_Group_Logo.svg.png" alt="Logo" className="h-16 m-4" />
                    </a>
                </div>
                <div className="flex items-center ml-8">
                    <div className="mr-5 text-white text-right">
                        <p className="text-left h-[30px]">Team Development</p>
                        <p style={{ color: '#c0c0c0' }}>Phurin Chairoek</p>
                    </div>
                    <div className="bg-white w-px h-16 mx-4"></div>
                    <img src="/src/img/img_icon/exit.png" alt="Log out" className="h-[25px]" />
                    <a href="logout.php" className="text-white mr-12 pb-1" style={{ margin: '12px' }}>
                        Logout
                    </a>
                </div>
            </div>
        </>
    );
};

export default NavbarMentor;
