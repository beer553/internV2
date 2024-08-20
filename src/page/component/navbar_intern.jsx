import React from 'react';

const NavbarIntern = ({ currentPage, username }) => {
    return (
        <>
            <div className='banner-container'>
                <img src="/src/img/nav2.jpg" alt="Banner Image" className="w-full h-auto" />
            </div>
            <div className="navbar flex justify-between items-center h-21 bg-gray-800">
                <div className="flex items-center ml-5">
                    <img src="/src/img/Siam_Cement_Group_Logo.svg.png" alt="Logo" className="h-16 m-4 " />
                </div>
                <div className="flex items-center ml-8">
                    <div className="mr-5 text-white text-right ">
                        <p className='text-left' style={{ height: '30px' }}>Team Development</p>
                        <p style={{color:'	#c0c0c0	'}}>Chawanrat Boonya</p>
                    </div>
                    <div className="bg-white w-px h-16 mx-4"></div>
                    <a href="logout.php" className="text-white mr-12 ">Logout</a>
                </div>
            </div>
        </>
    );
};

export default NavbarIntern;
