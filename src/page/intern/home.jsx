import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarIntern from '../component/navbar_intern';
import Footer from '../component/footer';

const Home = () => {
  const [internData, setInternData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [goal, setGoal] = useState(''); // State for the goal field
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      fetchData(userId);
    } else {
      handleError("User ID not found in localStorage or Context");
    }
  }, []);

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

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleGoalSave = async () => {
    try {
      const response = await axios.post('http://localhost/internV2/backend/intern/home.php', {
        user_id: internData.user_id,
        goal,
      });
      setInternData({ ...internData, goal });
      setIsEditing(false);
    } catch (err) {
      handleError("Error saving goal: " + err.message);
    }
  };

  const openEditModal = () => setIsEditing(true);
  const closeModal = () => setIsEditing(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const calculateWorkDays = (startDate) => {
    return calculateDaysBetween(new Date(startDate), new Date());
  };

  const calculateRemainingWorkDays = (endDate) => {
    return calculateDaysBetween(new Date(), new Date(endDate));
  };

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
      <div className="max-w-[95%] mx-auto mt-12 mb-5 p-2 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center w-[95%] ml-16 p-6">
          <div className="flex mt-2">
            <div className="mt-5">
              <img
                src={`/backend/intern/uploads/profile/${internData?.profile}`}
                alt="Profile"
                className="w-[200px] h-[200px] rounded ml-1"
              />
            </div>
            <div className="ml-20">
              <h1 className="text-5xl font-bold text-black text-left">
                Hello, Intern {internData?.firstNameEng}
              </h1>
              <div className="bg-gray-100 p-2 rounded-lg mt-2 w-[70%] h-[150px] relative">
                <p className="text-gray-600 text-[20px] text-left">
                  {internData?.goal}
                </p>
                <button
                  onClick={openEditModal}
                  className="absolute bottom-2 right-2"
                >
                  <img
                    src="/src/img/img_icon/editing.png"
                    alt="Edit"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className=" text-black mr-16">
            <h2 className="text-[25px] font-semibold">TOP 3 เครื่องมือที่ถนัด</h2>
            <div className="mt-2 ">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center mt-2 text-[20px] ">
                  <img
                    src={skillIcons[skill.trim()]}
                    alt={skill.trim()}
                    className="w-8"
                  />
                  <p className="ml-2">
                    {skill.trim() === "Other"
                      ? internData?.otherprogram
                      : skill.trim()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Additional fetched data section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 ml-10 mr-10">
          <DataCard
            iconSrc="/src/img/img_icon/14641229.png"
            label="ฝึกงานไปแล้วกี่วัน"
            value={`${calculateWorkDays(internData?.datestart)} Days`}
          />
          <DataCard
            iconSrc="/src/img/img_icon/1329799.png"
            label="จำนวนวันเหลือในการฝึกงาน"
            value={`${calculateRemainingWorkDays(internData?.dateend)} Days`}
          />
          <DataCard
            iconSrc="/src/img/img_icon/10822463.png"
            label="จำนวนเงินที่ทำได้ในเดือนนี้"
            value={`${internData?.days_worked_this_month} Days / ${internData?.amount_earned_this_month} Baht`}
          />
        </div>
        {/* Personal information section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
          <div className="md:col-span-2">
            <PersonalInfo internData={internData} formatDate={formatDate} />
          </div>

          {/* ActionLinks div content */}
          <div className="grid grid-cols-2 gap-4 max-h-[50%] mr-16 my-24 md:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <img src="/src/img/img_icon/5084621.png" alt="ดู Back log" className="w-12 h-12" />
              <p className="ml-4 text-lg font-semibold">ดู Back log</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <img src="/src/img/img_icon/scrum(1).png" alt="SCRUM" className="w-12 h-12" />
              <p className="ml-4 text-lg font-semibold">SCRUM</p>
            </div>
            <a href="src\page\intern\uploads\ใบรับเงิน.pdf" download>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <img src="/src/img/img_icon/1358533.png" alt="เบิกงบเบี้ยเลี้ยง" className="w-12 h-12" />
                <p className="ml-4 text-lg font-semibold">เบิกงบเบี้ยเลี้ยง</p>
              </div>
            </a>
            <a href="https://forms.office.com/pages/responsepage.aspx?id=Dr-4XZKF0E6CsqbU13kz1HWtqYCabT1PkbKI66xW345UMTBTWDBPMk4zUENSOVQyNlBNRDVJSkk3OC4u&route=shorturl" target="_blank" rel="noopener noreferrer">
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <img src="/src/img/img_icon/684831.png" alt="แจ้งลา / Work For Home" className="w-12 h-12" />
                <p className="ml-4 text-lg font-semibold">แจ้งลา / Work For Home</p>
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* Modal */}
      {isEditing && (
        <Modal onClose={closeModal} onSave={handleGoalSave}>
          <textarea
            className="w-full text-2xl p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
            value={goal}
            onChange={handleGoalChange}
            rows={5}
          />
        </Modal>
      )}

      <Footer />
    </>
  );
};

const DataCard = ({ iconSrc, label, value }) => (
  <div className="p-6 bg-white text-center rounded-lg shadow-md border-b-4 border-[#635c5c]">
    <img src={iconSrc} alt={label} className="w-16 h-16 mx-auto" />
    <p className="mt-4 text-lg font-semibold text-gray-700">{label}</p>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const PersonalInfo = ({ internData, formatDate }) => (
  <div className="p-4">
    <h2 className="font-bold">ข้อมูลส่วนตัว</h2>
    <div className="mt-4 space-y-2 text-left ml-16" style={{ fontSize: '25px' }}>
      {[
        { label: 'ชื่อ - นามสกุล', value: `${internData?.firstName} ${internData?.lastName}` },
        { label: 'รหัสนักศึกษาฝึกงาน', value: internData?.user_id },
        { label: 'ชื่อเล่น', value: internData?.nickname },
        { label: 'อายุ', value: `${internData?.age} ปี` },
        { label: 'วันเกิด', value: internData?.birthDate ? formatDate(internData.birthDate) : '' },
        { label: 'สัญชาติ', value: internData?.nationality },
        { label: 'เบอร์มือถือ', value: internData?.phone },
        { label: 'งานที่ถนัด', value: internData?.goodjob },
        { label: 'หน่วยงาน', value: internData?.section },
      ].map(({ label, value }, index) => (
        <div className="flex" key={index}>
          <p style={{ width: '160px' }}>{label}</p>
          <p style={{ width: '210px' }}>{value}</p>
        </div>
      ))}
    </div>
  </div>
);

const Modal = ({ children, onClose, onSave }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 className="text-2xl font-bold mb-4">งานที่อยากทำ</h2>
      {children}
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600"
          onClick={onSave}
        >
          Save
        </button>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default Home;
