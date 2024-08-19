import React, { useState } from 'react';

const NavbarManpower = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full bg-white shadow-sm">
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <div className="mr-4">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png"
              alt="Menu"
              className="h-8"
            />
          </div>
          <img
            className="h-10"
            style={{ width: '165px', height: '60px' }}
            src="https://www.watsadupedia.com/images/2/2c/Scg.png"
            alt="SCG Logo"
          />
        </div>
        <div className="flex items-center text-right">
          <span className="mr-2 leading-tight text-[1.5rem]">
            <span style={{ display: 'block', marginBottom: '-9px', color:'black' }}>Mentor</span>
            <span style={{ display: 'block', color:'black' }}>Star</span>
          </span>
          
          <img
            src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
            alt="Mentor"
            className="h-10 w-10 rounded-full" style={{ width: '60px', height: '60px' }}
          />
        </div>
      </header>
    </div>
  );
};

export default NavbarManpower;
