import React, { useState } from "react";
import Footer from "./component/footer";
import Swal from "sweetalert2";
import axios from "axios";

function Login() {
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSetPassword = () => {
    setIsSettingPassword(true);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post('http://localhost/internV2/backend/login.php', {
            username: username,
            password: password,
        });

        // แยกข้อมูลที่ส่งกลับมา
        const rawData = response.data;
        console.log('Raw Data:', rawData);

        // พยายามแยก JSON ออกมา
        const parts = rawData.split('}{').join('},{');
        const jsonData = JSON.parse(`[${parts}]`);

        // ใช้เฉพาะข้อมูลส่วนที่สอง
        const data = jsonData[1];
        console.log('Parsed Data:', data);

        if (data.status === 'success' && data.role) {
            // เก็บข้อมูลใน localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('role', data.role);

            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                showConfirmButton: false,
            });

            setTimeout(() => {
                if (data.role === 'intern') {
                    window.location.href = "/input_data_intern";
                } else if (data.role === 'mentor') {
                    window.location.href = "/Homepage";
                }
            }, 2000);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: data.message || 'Unexpected error occurred.',
            });
        }
    } catch (error) {
        console.log('Error during login:', error);
        Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: 'An error occurred while trying to login.',
        });
    }
};





const handleRegister = async (event) => {
  event.preventDefault();

  if (!username) {
      Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Username is required',
      });
      return;
  }

  if (!userId) {
      Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'User ID is required',
      });
      return;
  }

  if (!password) {
      Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Password is required',
      });
      return;
  }

  try {
      const response = await axios.post('http://localhost/internV2/backend/register.php', {
          username: username,
          user_id: userId,
          password: password,
      });

      // แยกข้อมูลที่ส่งกลับมา
      const rawData = response.data;
      console.log('Raw Data:', rawData);

      // พยายามแยก JSON ออกมา
      const parts = rawData.split('}{').join('},{');
      const jsonData = JSON.parse(`[${parts}]`);

      // ใช้เฉพาะข้อมูลส่วนที่สอง
      const data = jsonData[1];
      console.log('Parsed Data:', data);

      if (data.status === 'success') {
          Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: `Welcome, ${username}! Your role is ${data.role}.`,
              confirmButtonText: 'OK'
            }).then(() => {
                // เมื่อผู้ใช้กด OK จะกลับไปที่ฟอร์มล็อกอิน
                setIsRegistering(false);
            });

          // คุณสามารถนำ role ไปใช้เพื่อจัดการสิทธิ์ใน frontend ได้ตามต้องการ
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
              text: data.message,
          });
      }
  } catch (error) {
      console.log('Error during registration:', error);
      Swal.fire({
          icon: 'error',
          title: 'Registration Error',
          text: 'An error occurred while trying to register.',
      });
  }
};


  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/src/img/temasis_cover.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md space-y-8 p-10 bg-white bg-opacity-75 rounded-xl shadow-lg z-10">
          <div className="text-center">
            <img
              src="src\\img\\Siam_Cement_Group_Logo.svg.png"
              alt="SCG Logo"
              className="mx-auto mb-5"
              style={{ width: '200px' }}
            />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {isRegistering
                ? "Create your account"
                : isSettingPassword
                  ? "Set New Password"
                  : "Sign in to your account"}
            </h2>
          </div>

          {!isSettingPassword && !isRegistering ? (
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-xl"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-xl"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-xl text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-xl">
                  <a
                    href="#"
                    onClick={handleSetPassword}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign In
                </button>
              </div>

              <div className="text-center mt-6">
                <a
                  href="#"
                  onClick={() => setIsRegistering(true)}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Don't have an account? Register
                </a>
              </div>
            </form>
          ) : isRegistering ? (
            <form className="mt-8 space-y-6" onSubmit={handleRegister}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="username" className="sr-only">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-xl"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="userId" className="sr-only">Intern Student ID</label>
                  <input
                    id="userId"
                    name="user_id"  // Ensure this matches what the PHP script expects
                    type="text"
                    autoComplete="user-id"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-xl"
                    placeholder="Intern Student ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"  // Ensure this matches what the PHP script expects
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-xl"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="confirm_password" className="sr-only">Confirm Password</label>
                  <input
                    id="confirm_password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-xl"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Register
                </button>
              </div>
              {/* <div className="text-center mt-2 text-2xl">
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}  // ฟังก์ชันสำหรับกลับไปหน้าล็อกอิน
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Already have an account? Back to Sign In
                </button>
              </div> */}
            </form>

          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSetPassword}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="new_password" className="sr-only">
                    New Password
                  </label>
                  <input
                    id="new_password"
                    name="new-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-xl"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Set Password
                </button>
              </div>

              <div className="text-center mt-6">
                <a
                  href="#"
                  onClick={() => setIsSettingPassword(false)}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Back to Sign In
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
