import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarIntern from '../component/navbar_intern';
import Footer from '../component/footer';
import { useAuth } from '../../context/AuthContext';  // Import AuthContext

const Home = () => {
  const { user } = useAuth();  // ดึงข้อมูลจาก Context
  const [internData, setInternData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [goal, setGoal] = useState(''); // State for the goal field
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  useEffect(() => {
    const userId = user?.user_id || localStorage.getItem('user_id');
    if (userId) {
      fetchData(userId); // เรียกใช้ฟังก์ชัน fetchData พร้อม user_id
    } else {
      handleError("User ID not found in localStorage or Context");
    }
  }, [user]);

  const fetchData = async (userId) => {
    try {
      const response = await axios.get('http://localhost/internV2/backend/intern/home.php', {
        params: { user_id: userId },
      });
      setInternData(response.data);
      setGoal(response.data.goal); // Initialize the goal field for editing
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (errorMessage) => {
    console.error("Error:", errorMessage);
    setError(errorMessage);
    setLoading(false);
  };

  const handleGoalChange = (e) => setGoal(e.target.value);

  const handleGoalSave = async () => {
    try {
      const response = await axios.post('http://localhost/internV2/backend/intern/home.php', {
        user_id: internData.user_id,
        goal,
      });
      setInternData({ ...internData, goal }); // อัปเดตข้อมูลใน state
      setIsEditing(false); // ปิดโหมดการแก้ไข
    } catch (err) {
      handleError("Error saving goal: " + err.message);
    }
  };

  const openEditModal = () => setIsEditing(true);
  const closeModal = () => setIsEditing(false);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const calculateWorkDays = (startDate) => calculateDaysBetween(new Date(startDate), new Date());

  const calculateRemainingWorkDays = (endDate) => calculateDaysBetween(new Date(), new Date(endDate));

  const calculateDaysBetween = (start, end) => {
    let count = 0;
    while (start <= end) {
      const day = start.getDay();
      if (day !== 0 && day !== 6) count++; // Exclude weekends
      start.setDate(start.getDate() + 1);
    }
    return count;
  };

  const skillIcons = {
    Figma: "/src/img/img_icon/figma.png",
    React: "/src/img/img_icon/React.png",
    "VS code": "/src/img/img_icon/vscode.png",
    PHP: "/src/img/img_icon/PHP.png",
    "SQL Server": "/src/img/img_icon/SQL.png",
    Docker: "/src/img/img_icon/docker.png",
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message || error}</p>;

  const skills = internData?.program ? internData.program.split(',') : [];

  return (
    <>
      <NavbarIntern />
      {/* ข้อมูลเพิ่มเติม */}
      <div className="max-w-[95%] mx-auto mt-12 mb-5 p-2 bg-white shadow-lg rounded-lg items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5 ml-5 mr-5 mb-5">
          <DataCard
            label="ฝึกงานไปแล้วกี่วัน"
            value={`${calculateWorkDays(internData?.datestart)}`}
            unit={"Day"}
            className="bg-[#259EBB]"
          />
          <DataCard
            label="จำนวนวันเหลือในการฝึกงาน"
            value={`${calculateRemainingWorkDays(internData?.dateend)}`}
            unit={"Day"}
            className="bg-[#042F46]"
          />
          <DataCard
            label="สร้างมูลค่าเพิ่ม"
            value={`${(calculateWorkDays(internData?.datestart) * 500).toLocaleString()}`}
            unit={"Baht"}
            className="bg-[#BB6C26]"
          />
        </div>
      </div>

      <div className="max-w-[95%] mx-auto mt-12 mb-5 p-2 bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-[48%_20%_32%] p-6">
          <div className="flex">
            <div>
              <img src={`/backend/intern/uploads/profile/${internData?.profile}`} alt="Profile" className="w-[200px] h-[200px] rounded ml-1" />
            </div>
            <div className="ml-10 w-[400px] mr-10">
              <h1 className="text-2xl font-bold text-black text-left"> {internData?.nickname} : {internData?.firstName}  {internData?.lastName}</h1>
              <div className="bg-gray-100 p-2 rounded-lg mt-2 h-[150px] relative">
                <p className="text-gray-600 text-[20px] text-left">{internData?.goal}</p>
                <button onClick={openEditModal} className="absolute bottom-2 right-2">
                  <img src="/src/img/img_icon/editing.png" alt="Edit" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-black">
            <h2 className="text-[20px] font-semibold">TOP 3 เครื่องมือที่ถนัด</h2>
            <div className="mt-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center mt-2 text-[20px]">
                  <img src={skillIcons[skill.trim()]} alt={skill.trim()} className="w-8" />
                  <p className="ml-2">{skill.trim() === "Other" ? internData?.otherprogram : skill.trim()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ActionLinks */}
          <div>
            <div className="grid grid-cols-2 gap-4 md:col-span-3">
              <ActionLink label="Back log" colorClass="bg-[#8DB9CA]" />
              <ActionLink label="SCRUM" colorClass="bg-[#A2CDCD]" />
              <ActionLink href="src\page\intern\uploads\ใบรับเงิน.pdf" label="เบิกงบเบี้ยเลี้ยง" colorClass="bg-[#CEE5D0]" />
              <ActionLink href="https://forms.office.com/pages/responsepage.aspx?id=Dr-4XZKF0E6CsqbU13kz1HWtqYCabT1PkbKI66xW345UMTBTWDBPMk4zUENSOVQyNlBNRDVJSkk3OC4u&route=shorturl" label="แจ้งลา / WFH" colorClass="bg-[#CACCD1]" />
            </div>
          </div>
        </div>
      </div>
      {isEditing && (
        <Modal onClose={closeModal} onSave={handleGoalSave}>
          <textarea className="w-full text-2xl p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 resize-none" value={goal} onChange={handleGoalChange} rows={5} />
        </Modal>
      )}
      <Footer />
    </>
  );
};

// DataCard Component
const DataCard = ({ label, value, unit, className }) => (
  <div className={`p-6 h-[150px] text-center rounded-lg shadow-md border-b-4 border-[#635c5c] ${className} relative flex flex-col justify-center`}>
    {/* Label ที่มุมซ้ายบน */}
    <p className="absolute top-2 left-2 text-lg  text-white">{label}</p>
    {/* Value ใหญ่อยู่ตรงกลาง */}
    <div className="flex justify-center items-baseline">
      <p className="text-[60px] font-bold text-white">{value}</p>
      {/* หน่วยเล็กข้างๆตัวเลข */}
      <span className="text-xl font-semibold ml-2 text-white">{unit}</span>
    </div>
  </div>
);

// ActionLink Component
const ActionLink = ({ label, href, colorClass }) => (
  <a href={href} className={`p-4 rounded-lg shadow-md flex items-center justify-center text-black ${colorClass}`}>
    <p className="text-lg text-center">{label}</p>
  </a>
);

// Modal Component
const Modal = ({ children, onClose, onSave }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 className="text-2xl font-bold mb-4">งานที่อยากทำ</h2>
      {children}
      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600" onClick={onSave}>Save</button>
        <button className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400" onClick={onClose}>Cancel</button>
      </div>
    </div>
  </div>
);

export default Home;
