import React from 'react';

const NavbarIntern = ({ currentPage, username }) => {
    return (
        <>
            <div className="banner-container w-full">
                <img src="/src/img/intern.jpeg" alt="Banner Image" className="w-full h-auto" />
            </div>
            <div className="navbar flex justify-between items-center bg-black h-30">
                <div className="logo-container flex items-center">
                    <img src="/src/img/Siam_Cement_Group_Logo.svg.png" alt="Logo" className="h-16 " style={{  margin:'10px' }} />
                </div>
                <div className="left flex space-x-8 ml-auto mr-20">
                    <a href="index.php" className={currentPage === 'index.php' ? 'active font-bold text-white' : 'text-white '}>Home</a>
                    <a href="TestInputData.php" className={currentPage === 'TestInputData.php' ? 'active font-bold text-white' : 'text-white'}>Scrum</a>
                    <a href="InputData_Plan.php" className={currentPage === 'InputData_Plan.php' ? 'active font-bold text-white' : 'text-white'}>Back Log</a>
                    <a href="actual.php" className={currentPage === 'actual.php' ? 'active font-bold text-white' : 'text-white'}>Project</a>
                    <a href="logout.php" className="logout text-white ">Log out</a>
                </div>
                      <div style={{backgroundColor:'white', width:'3px', height:'60px', }}></div>
                <div className="right flex items-center ml-8">
                    <div className="username-container mr-10 text-white text-left">
                        <p>Intern<br />Chawanrat Boonya</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarIntern;
