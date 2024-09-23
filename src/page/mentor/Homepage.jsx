import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../component/footer';
import NavbarMentor from '../component/navbar_intern';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

function Homepage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // State สำหรับจัดการข้อมูล Intern Data
  const [internData, setInternData] = useState([]);

  // Manpower data
  const [showPopup, setShowPopup] = useState(false);
  const [manpowerData, setManpowerData] = useState([]);
  const [newManpower, setNewManpower] = useState({ id: '', name: '', startDate: '', endDate: '' });

  // User data
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [formData, setFormData] = useState({ title: '', fullName: '', profilePicture: null });
  const [userData, setUserData] = useState(null);

  // ดึงข้อมูล internData จาก backend โดยใช้ user_id
  useEffect(() => {
    if (isAuthenticated && user?.user_id) {
      axios.get(`http://localhost:8080/mentor/homepage.php?user_id=${user.user_id}`)
        .then(response => {
          setInternData(response.data);
        })
        .catch(error => {
          console.error('Error fetching intern data:', error);
        });
    }
  }, [isAuthenticated, user?.user_id]);

  // Load user status on component mount
  useEffect(() => {
    if (isAuthenticated && user?.user_id) {
      axios.get(`http://localhost:8080/mentor/insert_data_mentor.php?user_id=${user.user_id}`)
        .then(response => {
          if (!response.data.completed) {
            setShowFormPopup(true);
          } else {
            setUserData(response.data);
          }
        })
        .catch(error => {
          console.error("Error checking user status:", error);
        });
    }
  }, [isAuthenticated, user?.user_id]);

  // Handle form input change for user and manpower data
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      if (file.size < 2 * 1024 * 1024) {
        setFormData({ ...formData, [name]: file });
      } else {
        Swal.fire('Error', 'ไฟล์ต้องมีขนาดไม่เกิน 2MB', 'error');
      }
    } else if (name in newManpower) {
      setNewManpower({ ...newManpower, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Format ID with specific pattern
  const formatId = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.slice(0, 4) + (digits.length > 4 ? '-' + digits.slice(4, 10) : '');
  };

  // Submit manpower data
  const handleSubmitManpower = () => {
    if (new Date(newManpower.endDate) < new Date(newManpower.startDate)) {
      Swal.fire('Error', 'End Date cannot be earlier than Start Date', 'error');
      return;
    }

    const formattedName = newManpower.name.replace(/\s+/g, ' ').trim();
    const newEntry = {
      id: manpowerData.length + 1,
      name: `${newManpower.id} ${formattedName}`,
      status: 'รอฝึกงาน',
      timeline: `${formatDate(newManpower.startDate)} - ${formatDate(newManpower.endDate)}`,
      project: 'Project Name',
    };

    setManpowerData([...manpowerData, newEntry]);
    Swal.fire('Success', 'เพิ่มข้อมูล Manpower สำเร็จ', 'success');
    togglePopup();
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  // Submit user form data
  const handleFormSubmit = () => {
    if (!user?.user_id) {
      Swal.fire('Error', 'User ID is not available', 'error');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('profilePicture', formData.profilePicture);
    formDataToSend.append('userId', user?.user_id);

    axios.post('http://localhost:8080/mentor/insert_data_mentor.php', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        if (response.data.success) {
          Swal.fire('Success', 'บันทึกข้อมูลสำเร็จ', 'success');
          setShowFormPopup(false);
        } else {
          Swal.fire('Error', `เกิดข้อผิดพลาด: ${response.data.message}`, 'error');
        }
      })
      .catch(error => {
        Swal.fire('Error', 'มีบางอย่างผิดพลาด กรุณาลองอีกครั้ง', 'error');
      });
  };

  // Toggle manpower popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const goToProfilePage = (userId) => {
    navigate(`/IDP/${userId}`);
  };

  const gotoProductBacklog = () => {
    navigate('/PDBacklog');
  };

  const gotoProject = () => {
    navigate('/Project');
  };

  const gotoDailyscrum = () => {
    navigate('/Dailyscrum');
  };

  // ฟังก์ชันในการตรวจสอบสถานะการฝึกงาน
  const checkStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) {
      return 'รอฝึกงาน';
    } else if (today >= start && today <= end) {
      return 'กำลังฝึกงาน';
    } else {
      return 'ฝึกงานเสร็จสิ้น';
    }
  };

  // ฟังก์ชันในการนับจำนวนนักศึกษาฝึกงานทั้งหมด
  const countTotalInterns = () => {
    return internData.length;
  };

  // ฟังก์ชันในการนับจำนวนนักศึกษาฝึกงานในสถานะ "กำลังฝึกงาน"
  const countInternsInTraining = () => {
    return internData.filter(row => checkStatus(row.datestart, row.dateend) === 'กำลังฝึกงาน').length;
  };

  // Sort internData: First by status ('กำลังฝึกงาน', 'รอฝึกงาน', 'ฝึกงานเสร็จสิ้น'), then by start date
  const sortedInternData = internData.sort((a, b) => {
    const statusOrder = {
      'กำลังฝึกงาน': 1,
      'รอฝึกงาน': 2,
      'ฝึกงานเสร็จสิ้น': 3
    };

    const statusA = checkStatus(a.datestart, a.dateend);
    const statusB = checkStatus(b.datestart, b.dateend);

    // Sort by status first
    if (statusOrder[statusA] < statusOrder[statusB]) return -1;
    if (statusOrder[statusA] > statusOrder[statusB]) return 1;

    // If statuses are the same, sort by start date
    const dateA = new Date(a.datestart);
    const dateB = new Date(b.datestart);
    return dateA - dateB;
  });

  return (
    <div>
      <header>
        <NavbarMentor />
      </header>

      <div className="bg-white max-w-[95%] mx-auto mt-12 mb-5 p-2 shadow-lg rounded-lg items-center">
        <div className="flex justify-center items-center mt-5 mb-3">
          <img
            src={userData?.profile_picture ? `/backend/mentor/uploads/${userData.profile_picture}` : '/src/img/star.png'}
            className="w-24 h-24 rounded-full mt-6"
            alt="Profile"
          />
          <div className="ml-4 mt-4">
            <h2 className='text-[25px] text-black font-bold'>DX Manpower Management</h2>
            <p className='text-[20px] mt-2 text-black text-left'>
              {userData ? (userData.mentor ? `Hello, ${userData.mentor}` : 'Loading...') : 'Loading...'} 👋
            </p>
          </div>
        </div>

        <div className="flex justify-around items-center w-full">
          {/* ช่อง Developer Team (TTL) */}
          <div className="relative w-[25%] h-[170px] shadow-lg m-6 rounded-lg flex flex-col items-center justify-center bg-[#eaeaea]">
            <div className="text-[90px] h-28 font-bold text-black mt-5">{countTotalInterns()}</div> {/* จำนวนนักศึกษาฝึกงานทั้งหมด */}
            <div className="text-[20px] text-black mb-1">Developer Team (TTL)</div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-blue-300"></div>
          </div>
          {/* ช่อง Developer This Year */}
          <div className="relative w-[25%] h-[170px] shadow-lg m-6 rounded-lg flex flex-col items-center justify-center bg-[#eaeaea]">
            <div className="text-[90px] h-28 font-bold text-black mt-5">{countInternsInTraining()}</div>  {/* จำนวนนักศึกษาที่อยู่ในสถานะ "กำลังฝึกงาน" */}
            <div className="text-[20px] text-black mb-1">Developer This Year</div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-orange-400"></div>
          </div>
          <div className="relative w-[25%] h-[170px] shadow-lg m-6 rounded-lg bg-[#eaeaea]">
            <div className="flex items-center justify-center">
              <div className="text-[90px] h-28 font-bold text-black mr-10 mt-5">0</div>
              <div className="space-y-2 mt-4">
                <div className="flex items-center bg-white p-3 rounded-lg shadow cursor-pointer mb-2" onClick={() => navigate('/Project')}>
                  <span className="text-[18px] text-black">Project</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow cursor-pointer" onClick={() => navigate('/Dailyscrum')}>
                  <span className="text-[18px] text-black">Daily Scrum</span>
                </div>
              </div>
            </div>
            <div className="mb-1 text-center text-black text-[20px]">Project This Year (Items)</div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-cyan-400"></div>
          </div>
          <div className="relative w-[25%] h-[170px] shadow-lg m-6 rounded-lg bg-[#eaeaea]">
            <div className="flex items-center">
              <div className="text-[60px] h-24 font-bold mt-[-1px] ml-14 text-black">0</div>
              <div className="text-[40px] text-black font-bold ml-[70px]">Sprint</div>
            </div>
            <div className="flex items-center mt-[-40px]">
              <div className="text-[60px] h-16 font-bold ml-[53px] text-black">0</div>
              <div className="text-[18px] bg-white p-2 rounded-lg shadow w-36 ml-[70px] cursor-pointer mt-[40px]" onClick={() => navigate('/PDBacklog')}>
                <div className="text-black">Product Backlog</div>
              </div>
            </div>
            <div className="mt-[-5px] ml-2 text-black text-[20px] ">Product Increment (Items)</div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-green-400"></div>
          </div>
        </div>
      </div>

      {/* Manpower Section */}
      <div className='bg-white max-w-[95%] mx-auto mt-12 mb-5 p-2 shadow-lg rounded-lg items-center'>
        <div className="m-5">
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-[40px] ml-5 text-gray-600'>Manpower</h3>
          </div>

          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg text-left shadow-lg w-full max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-2xl ml-1 font-medium text-black">ID</label>
                    <input
                      type="text"
                      name="id"
                      value={newManpower.id}
                      onChange={handleInputChange}
                      placeholder="โปรดระบุ"
                      className="block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-[20px] bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-2xl ml-1 font-medium text-black">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newManpower.name}
                      onChange={handleInputChange}
                      placeholder="โปรดระบุ"
                      className="block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-[20px] bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-2xl ml-1 font-medium text-black">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newManpower.startDate}
                      onChange={handleInputChange}
                      placeholder="โปรดระบุ"
                      className="block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-[20px] bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-2xl ml-1 font-medium text-black">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newManpower.endDate}
                      onChange={handleInputChange}
                      placeholder="โปรดระบุ"
                      className="block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-[20px] bg-white text-black"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6 text-[20px]">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-[#4CAF50] mr-2" onClick={handleSubmitManpower}>
                    บันทึก
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600" onClick={togglePopup}>
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table rendering manpowerData */}
          <table className="w-full border-collapse border-none">
            <thead>
              <tr>
                <th className="text-[20px] text-center text-black border-none">NO</th>
                <th className="text-[20px] text-left   text-black border-none w-[300px]">ID Name</th>
                <th className="text-[20px] text-center text-black border-none">Status</th>
                <th className="text-[20px] text-center text-black border-none">Time Line</th>
                <th className="text-[20px] text-center text-black border-none">Project</th>
                <th className="text-[20px] text-center text-black border-none">Profile</th>
                <th className="text-[20px] text-center text-black border-none">Sprint Review</th>
                <th className="text-[20px] text-center text-black border-none">Evaluate</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(sortedInternData) && sortedInternData.length > 0 ? (
                sortedInternData.map((row, index) => (
                  <tr key={index}>
                    <td className="text-[16px] text-center text-black">{index + 1}</td>
                    <td className="text-[16px] text-left   text-black">{row.user_id}  {row.nickname} : {row.firstName} {row.lastName}</td>
                    <td className={`text-[16px] text-center text-black px-1 py-1 mt-3 rounded-full ${checkStatus(row.datestart, row.dateend) === 'ฝึกงานเสร็จสิ้น' ? 'bg-[#dfdfdf]' : checkStatus(row.datestart, row.dateend) === 'รอฝึกงาน' ? 'bg-yellow-300' : 'bg-[#4CAF50]'} flex justify-center items-center`}>
                      {checkStatus(row.datestart, row.dateend)}
                    </td>
                    <td className="text-[16px] text-center text-black">{formatDate(row.datestart)} - {formatDate(row.dateend)}</td>
                    <td className="text-[16px] text-center text-black">{row.project ? row.project : 'ยังไม่มอบหมายโปรเจค'}</td>
                    <td className="text-center">
                      <button onClick={() => goToProfilePage(row.user_id)}>
                        <img className='w-12 h-12 mx-auto cursor-pointer' src="/src//img/img_icon/9746243.png" alt="Profile" />
                      </button>
                    </td>
                    <td className="text-center">
                      <img className='w-12 h-12 mx-auto cursor-pointer' src="/src/img/img_icon/4062008.png" alt="Sprint Review" />
                    </td>
                    <td className="text-center">
                      <img className='w-12 h-12 mx-auto cursor-pointer' src="/src/img/img_icon/2666505.png" alt="Evaluate" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">ไม่มีข้อมูล</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Form Popup */}
      {showFormPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg text-left shadow-lg w-full max-w-2xl">
            <h3 className='text-3xl text-center mb-6'>กรอกข้อมูลผู้ใช้</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xl font-medium text-gray-700">คำนำหน้าชื่อ<span style={{ color: 'red' }}>*</span></label>
                <select
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                  style={{ height: '46px' }}
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">เลือกคำนำหน้าชื่อ</option>
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
                </select>
              </div>
              <div>
                <label className="block text-2xl ml-1 font-medium text-black">ชื่อและนามสกุล</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-[20px] bg-white text-black"
                />
              </div>
              <div>
                <label className="block text-2xl ml-1 font-medium text-black">รูปโปรไฟล์</label>
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleInputChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-[20px] bg-white text-black"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 text-[20px]">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-[#4CAF50] mr-2" onClick={handleFormSubmit}>
                บันทึกข้อมูล
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600" onClick={() => setShowFormPopup(false)}>
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Homepage;
