import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // ใช้ useLocation แทน useParams
import Footer from '../component/footer';
import NavbarMentor from '../component/navbar_intern';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function AssignPJ() {
  const navigate = useNavigate();
  const location = useLocation(); // ใช้ useLocation เพื่อดึง query parameters

  // ดึง project_id จาก query string
  const queryParams = new URLSearchParams(location.search);
  const project_id = queryParams.get('project_id'); // ดึงค่า project_id จาก URL
  console.log("Project ID:", project_id); // ตรวจสอบว่าได้ project_id ถูกต้องหรือไม่

  // ดึงข้อมูล user จาก AuthContext
  const { user } = useAuth();
  const user_id = user?.user_id || null;
  console.log("User ID:", user_id);

  // State สำหรับเก็บข้อมูล intern ที่จะดึงมาจาก backend
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State สำหรับเก็บ user_id ของผู้ที่ถูกเลือก
  const [selectedUsers, setSelectedUsers] = useState([]);

  const gotoProject = () => {
    navigate('/Project');
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const fetchInterns = async () => {
    try {
      setLoading(true);
      console.log("Fetching interns for user_id:", user_id);

      if (user_id && project_id) {
        const response = await axios.post('http://localhost:8080/mentor/assignPJ.php', {
          user_id: user_id,
          project_id: project_id
        });

        console.log("Response from backend:", response.data);

        if (Array.isArray(response.data)) {
          setInterns(response.data);
        } else {
          console.error('Response data is not an array:', response.data);
          setInterns([]);
        }
      } else {
        console.error('Missing user_id or project_id parameter');
        setInterns([]);
      }
      setLoading(false);
    } catch (error) {
      setError('Error fetching intern data');
      setLoading(false);
      console.error('Error fetching intern data:', error);
    }
  };

  useEffect(() => {
    if (user_id && project_id) {
      fetchInterns();
    }
  }, [user_id, project_id]);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost/internV2/backend/mentor/assignintern.php', {
        selectedUsers,
        project_id
      });
      alert('มอบหมายผู้รับผิดชอบสำเร็จ');
    } catch (error) {
      console.error('Error submitting assigned users:', error);
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
    }
  };

  return (
    <div>
      <header>
        <NavbarMentor />
      </header>

      <div className="flex justify-between items-center h-[55px] mt-7 mb-7 bg-[#FFE177] max-w-[96%] mx-auto rounded-lg">
        <h1 className="text-[25px] font-bold text-center flex-1 text-black ml-[100px]">มอบหมายผู้รับผิดชอบ</h1>
        <img
          src="/src/img/img_icon/left-arrow.png"
          className="w-7 cursor-pointer mr-[50px]"
          alt="Back"
          onClick={gotoProject}
        />
      </div>

      <div className="px-8">
        {loading ? (
          <p>กำลังโหลดข้อมูล...</p>
        ) : error ? (
          <p>{error}</p>
        ) : interns.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {interns.map((intern) => (
              <div key={intern.user_id} className="flex items-center bg-white p-4 rounded-lg">
                <img
                  src={`/backend/intern/uploads/profile/${intern?.profile}`}
                  alt={intern.name}
                  className="h-[200px] w-[200px] rounded-lg object-cover"
                />
                <div className="ml-4 flex-1 text-left space-y-3">
                  <span className="bg-[#FF9B2C] text-white px-5 py-2 rounded">
                    {intern.nickname}
                  </span>
                  <p className="text-black">ชื่อ-นามสกุล : {intern.firstName} {intern.lastName}</p>
                  <p className="text-black">สถานศึกษา : {intern.currentEducation}</p>
                </div>
                <div className="flex items-center space-x-2"><mt-10></mt-10>
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    onChange={() => handleCheckboxChange(intern.user_id)}
                    checked={selectedUsers.includes(intern.user_id)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>ไม่มีข้อมูล interns ที่จะแสดง</p>
        )}

        <div className="mt-8 mb-8 flex justify-end">
          <button onClick={handleSubmit} className="bg-green-500 text-white px-10 rounded-lg hover:bg-green-600">
            ยืนยัน
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AssignPJ;