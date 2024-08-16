import React from 'react';

const NavbarManpower = () => {
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
            src="https://www.watsadupedia.com/images/2/2c/Scg.png" 
            alt="SCG Logo" 
          />
        </div>
        <div className="flex-grow flex justify-center">
          <div className="relative w-64">
          <form className="form">
      <button type="button">
        <svg
          width="17"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="search"
        >
          <path
            d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
            stroke="currentColor"
            strokeWidth="1.333"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <input
        className="input"
        placeholder="Type your text"
        required
        type="text"
      />
      <button className="reset" type="reset">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </form>
          </div>
        </div>
        <div className="flex items-center text-right">
          <span className="mr-3 text-sm leading-tight">
            Mentor<br />Star
          </span>
          <img 
            src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" 
            alt="Mentor" 
            className="h-10 w-10 rounded-full"
          />
        </div>
      </header>
    </div>
  );
}

export default NavbarManpower;
