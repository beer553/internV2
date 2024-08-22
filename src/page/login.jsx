import React, { useState } from "react";
import Footer from "./component/footer";
import Swal from "sweetalert2";

function Login() {
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const [username, setUsername] = useState("");

  const handleSetPassword = () => {
    setIsSettingPassword(true);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome back!",
    });
  };

  return (
    <>
      <div
        className="flex justify-center items-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/src/img/temasis_cover.jpg')` }}
      >
        {!isSettingPassword ? (
          <div
            className="bg-white p-5 rounded-lg bg-opacity-75 shadow-md"
            style={{ width: "460px", height: "450px" }}  // กำหนดขนาดฟอร์ม
          >
            <div className="flex justify-center mb-4">
              <img
                src="src\img\Siam_Cement_Group_Logo.svg.png"
                alt="SCG Logo"
                style={{ width: "200px" }}  
              />
            </div>
            <form onSubmit={handleLogin}>
              <div >
                <label htmlFor="username" className="block text-black font-bold  text-left">
                  Username :
                </label>
                <input
                  type="text"
                  style={{height:'37.6px'}}
                  id="username"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div >
                <label htmlFor="password" className="block text-black font-bold text-left">
                  Password :
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  style={{height:'37.6px'}}
                  required
                />
              </div>
              <div className="mb-4 flex justify-between items-center">
                <label className="flex items-center text-black">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                style={{height: '36px' ,lineHeight: '36px'}}
              >Login
              </button>
              <a
                href="#"
                onClick={handleSetPassword}
                className="block text-center text-blue-500 text-sm mt-4"
              >
                Forgot password?
              </a>
            </form>
          </div>
        ) : (
          <div
            className="bg-white bg-opacity-75 p-4 rounded-lg shadow-md"
            style={{ width: "460px", height: "406px" }}  // กำหนดขนาดฟอร์ม
          >
            <div className="flex justify-center mb-4">
              <img
                src="src\img\Siam_Cement_Group_Logo.svg.png"
                alt="SCG Logo"
                style={{ width: "150px" }}  // ขนาดโลโก้
              />
            </div>
            <form>
              <div className="mb-4">
                <label htmlFor="new_password" className="block text-black font-bold mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="new_password"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Set Password
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Login;
