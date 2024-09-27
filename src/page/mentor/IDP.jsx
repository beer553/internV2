import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../component/footer';
import NavbarIntern from '../component/navbar_intern';
import ImageModal from '../component/ImageModal';
import ImageModal from '../component/ImageModal';

const Profile = () => {
  const { user_id } = useParams(); // Get user_id from URL
  const { user_id } = useParams(); // Get user_id from URL
  const navigate = useNavigate();
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const [profileData, setProfileData] = useState(null); // State to store profile data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [profileData, setProfileData] = useState(null); // State to store profile data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [checkboxState, setCheckboxState] = useState({
    frontend: false,
    frontend: false,
    backend: false,
    fullstack: false,
    dataAnalysis: false,
    dataManagement: false,
    other: false,
    figma: false,
    react: false,
    figma: false,
    react: false,
    php: false,
    vsCode: false,
    vsCode: false,
    sqlServer: false,
    docker: false,
  });

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  const closeModal = () => {
    setModalImageUrl(null);
  };

  // Fetch profile data from backend using user_id
  useEffect(() => {
    if (user_id) {
      fetchProfileData(user_id);
    }
    console.log(profileData); // เช็คข้อมูลที่ได้รับ
  }, [user_id]);


  const fetchProfileData = async (user_id) => {
    try {
      setLoading(true); // Set loading state before fetching
      const response = await fetch(`http://localhost:8080/intern/profile.php?user_id=${user_id}`);
      const data = await response.json();

      if (data.status === 'success' && data.data) {
        const profile = data.data;

        // แปลงสตริง goodjob และ program ให้เป็นอาร์เรย์
        const goodJobsArray = profile.goodjob ? profile.goodjob.split(", ") : [];
        const programsArray = profile.program ? profile.program.split(", ") : [];

        // ตั้งค่า checkbox state ตามข้อมูลที่ได้รับ
        setCheckboxState({
          frontend: goodJobsArray.includes('Frontend'),
          backend: goodJobsArray.includes('Backend'),
          fullstack: goodJobsArray.includes('Full Stack'),
          dataAnalysis: goodJobsArray.includes('Data Analysis'),
          dataManagement: goodJobsArray.includes('Data Management'),
          other: goodJobsArray.includes('อื่นๆ'),
          figma: programsArray.includes('Figma'),
          react: programsArray.includes('React'),
          php: programsArray.includes('PHP'),
          vsCode: programsArray.includes('VS Code'),
          sqlServer: programsArray.includes('SQL Server'),
          docker: programsArray.includes('Docker'),
        });

        setProfileData(profile); // Set profile data from backend
      } else {
        throw new Error('Profile data not found');
      }
    } catch (error) {
      setError('Error fetching profile data: ' + error.message); // Set error state if fetch fails
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an issue
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);

    // ดึงวัน, เดือน, ปี จากวันที่
    const day = String(date.getDate()).padStart(2, '0'); // เติม 0 ข้างหน้าให้เป็นสองหลัก
    const month = String(date.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มจาก 0 จึงต้อง +1
    const year = date.getFullYear() + 543; // แปลงจาก ค.ศ. เป็น พ.ศ.

    return `${day}/${month}/${year}`; // รูปแบบ วัน/เดือน/ปี
  };

  return (
    <>
      <div>
        <header>
          <NavbarIntern />
        </header>

        <main className="p-5">
          <section className="flex justify-center bg-white border rounded-lg mb-5">
            <div className="flex p-5">
              <img
                src={profileData?.profile ? `/backend/intern/uploads/profile/${profileData.profile}` : '/src/img/default_profile.png'}
                src={profileData?.profile ? `/backend/intern/uploads/profile/${profileData.profile}` : '/src/img/default_profile.png'}
                className="w-96 h-96 rounded-lg mt-5 mb-5 mr-16 cursor-pointer"
                alt="Profile"
                onClick={() => openModal(profileData?.profile ? `/backend/intern/uploads/profile/${profileData.profile}` : '/src/img/default_profile.png')}
                onClick={() => openModal(profileData?.profile ? `/backend/intern/uploads/profile/${profileData.profile}` : '/src/img/default_profile.png')}
              />
              <div className="text-left text-black mt-3">
                <h2 className="bg-orange-500 text-white p-2 rounded-lg text-center mb-5 text-[25px]">ข้อมูลส่วนตัว</h2>
                <div className="text-[20px] ml-2 mb-2">ID : {profileData?.user_id || 'Loading...'}</div>
                <div className="text-[20px] ml-2 mb-2">ชื่อ - นามสกุล : {profileData?.firstName} {profileData?.lastName || 'Loading...'}</div>
                <div className="text-[20px] ml-2 mb-2">ชื่อเล่น : {profileData?.nickname || 'Loading...'}</div>
                <div className="text-[20px] ml-2 mb-2">อายุ : {profileData?.age || 'Loading...'}</div>
                <div className="text-[20px] ml-2 mb-2">วันเกิด : {formatDate(profileData?.birthDate) || 'N/A'}</div>
                <div className="text-[20px] ml-2 mb-2">สัญชาติ : {profileData?.nationality || 'Loading...'}</div>
                <div className="text-[20px] ml-2 mb-2">เบอร์มือถือ : {profileData?.phone || 'Loading...'}</div>
                <div className="flex gap-2 mt-5">
                  {Array.from({ length: 13 }).map((_, index) => (
                    <div key={index} className="w-4 h-11 bg-orange-500"></div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <div className='bg-white p-8 rounded-lg'>
            <div className="flex justify-between max-w-[97%] mx-auto">
              <div className="flex flex-col mb-2">
                <label className="mb-1 text-[20px] text-left text-gray-800">ตำแหน่งที่สมัคร</label>
                <input
                  type="text"
                  value={profileData?.position || 'N/A'}
                  className="rounded-lg bg-white border border-gray-300 text-[20px] p-3 w-64"
                  disabled
                />
              </div>
              <div className="flex flex-col mb-2">
                <label className="mb-1 text-[20px] text-left text-gray-800">สถานศึกษาปัจจุบัน</label>
                <input
                  type="text"
                  value={profileData?.currentEducation || 'N/A'}
                  className="rounded-lg bg-white border border-gray-300 text-[20px] p-3 w-64"
                  disabled
                />
              </div>
              <div className="flex flex-col mb-2">
                <label className="mb-1 text-[20px] text-left text-gray-800">วันเดือนปีเริ่มฝึกงาน</label>
                <input
                  type="text"
                  value={formatDate(profileData?.datestart)}
                  className="rounded-lg bg-white border border-gray-300 text-[20px] p-3 w-64"
                  disabled
                />
              </div>
              <div className="flex flex-col mb-2">
                <label className="mb-1 text-[20px] text-left text-gray-800">วันเดือนปีฝึกงานวันสุดท้าย</label>
                <input
                  type="text"
                  value={formatDate(profileData?.dateend)}
                  className="rounded-lg bg-white border border-gray-300 text-[20px] p-3 w-64"
                  disabled
                />
              </div>
              <div className="flex flex-col mb-2">
                <label className="mb-1 text-[20px] text-left text-gray-800">GPA รวม</label>
                <div className="border-2 border-green-600 rounded-lg p-2.5 text-[20px] text-green-600 w-64 text-center">
                  {profileData?.gpa || 'N/A'}
                </div>
              </div>
            </div>

            {/* ฝั่งซ้าย */}
            <div className="flex justify-between">
              {/* ฝั่งซ้าย */}
              <div className="flex-1 p-5 rounded-lg mx-2">
                <div className="flex items-center mb-11">
                  <p className="text-[20px] text-black text-left">ดู Resume</p>
                  <a
                    href={profileData?.resume ? `/backend/intern/uploads/resume/${profileData.resume}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center w-10 h-10 ml-[330px] text-blue-500 underline"
                  >
                    <img
                      src="/src/img/img_icon/resume.png"
                      className="w-10 h-10 ml-[-5px]"
                      alt="Resume Icon"
                    />
                  </a>
                </div>


                <div className="flex items-center mb-11">
                  <p className="text-[20px] text-black text-left">ดู Transcript</p>
                  <a
                    href={profileData?.transcript ? `/backend/intern/uploads/transcript/${profileData.transcript}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center w-10 h-10 ml-[308px] text-blue-500 underline"
                  >
                    <img
                      src="/src/img/img_icon/transcription.png"
                      className="w-10 h-10"
                      alt="Transcript Icon"
                    />
                  </a>
                  <a
                    href={profileData?.transcript ? `/backend/intern/uploads/transcript/${profileData.transcript}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center w-10 h-10 ml-[308px] text-blue-500 underline"
                  >
                    <img
                      src="/src/img/img_icon/transcription.png"
                      className="w-10 h-10"
                      alt="Transcript Icon"
                    />
                  </a>
                </div>


                <div className="flex items-center mb-11">
                  <p className="text-[20px] text-black text-left">ตัวอย่าง Project ที่เคยทำ</p>
                  <a
                    href={profileData?.otherFiles ? `/backend/intern/uploads/otherFiles/${profileData.otherFiles}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center w-10 h-10 ml-[38px] text-blue-500 underline"
                  >
                    <img
                      src="/src/img/img_icon/project.png"
                      className="w-10 h-10 ml-[172px]"
                      alt="Project Icon"
                    />
                  </a>
                </div>
              </div>

              {/* ฝั่งขวา */}
              {/* ฝั่งขวา */}
              <div className="flex-1 p-5 rounded-lg mx-2">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-[20px] text-left text-gray-800">โปรดกรอกเป้าหมาย</label>
                  <p className="rounded-lg bg-gray-100 border border-gray-300 text-[18px] p-2 w-full h-28 text-left">
                    {profileData?.goal || "อยากทำโปรเจคเกี่ยวกับการออกแบบอยากได้ ประสบการณ์ในการคุยกับลูกค้าจริงๆ"}
                  </p>
                  <p className="rounded-lg bg-gray-100 border border-gray-300 text-[18px] p-2 w-full h-28 text-left">
                    {profileData?.goal || "อยากทำโปรเจคเกี่ยวกับการออกแบบอยากได้ ประสบการณ์ในการคุยกับลูกค้าจริงๆ"}
                  </p>
                </div>

                <div className="flex flex-col mb-11">

                <div className="flex flex-col mb-11">
                  <label className="mb-1 text-[20px] text-left text-gray-800">โปรดเลือกงานสายงานที่ถนัด</label>
                  <div className="grid grid-cols-3 gap-y-4 text-[18px]">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="frontend"
                        checked={checkboxState.frontend}
                        disabled={true} // ไม่สามารถแก้ไขได้
                        disabled={true} // ไม่สามารถแก้ไขได้
                        className="mr-2 h-5 w-5 rounded-md"
                      />
                      Frontend
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="backend"
                        checked={checkboxState.backend}
                        disabled={true}
                        className="mr-2 h-5 w-5 rounded-md"
                      />
                      Backend
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="fullstack"
                        name="fullstack"
                        checked={checkboxState.fullstack}
                        disabled={true}
                        className="mr-2 h-5 w-5 rounded-md"
                      />
                      Full Stack
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="dataAnalysis"
                        name="dataAnalysis"
                        checked={checkboxState.dataAnalysis}
                        disabled={true}
                        className="mr-2 h-5 w-5 rounded-md"
                      />
                      Data Analysis
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="dataManagement"
                        name="dataManagement"
                        checked={checkboxState.dataManagement}
                        disabled={true}
                        className="mr-2 h-5 w-5 rounded-md"
                      />
                      Data Management
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="other"
                        checked={checkboxState.other}
                        disabled={true}
                        className="mr-2 h-5 w-5 rounded-md"
                      />
                      อื่นๆ
                    </label>
                  </div>
                </div>

                {checkboxState.other && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-[18px] font-bold">ข้อมูลเพิ่มเติม</h3>
                    <p className="text-[16px] mt-2">
                      รายละเอียดเพิ่มเติม: {profileData?.otherDetails || 'N/A'}
                    </p>
                  </div>
                )}

                <div className="flex flex-col ">
                  <label className="mb-1 text-[20px] text-left text-gray-800">
                    โปรแกรมหรืองานที่ถนัด (3 อย่างที่ถนัดที่สุด)
                  </label>
                  <div className="grid grid-cols-3 gap-y-4 text-[18px]">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="figma"
                        checked={checkboxState.figma}
                        disabled={true}
                        disabled={true}
                        className="mr-2 h-5 w-5 rounded-md"
                      />
                      Figma
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="react"
                        checked={checkboxState.react}
                        disabled={true}
                        disabled={true}
                        className="mr-2 h-5 w-5 rounded-md"
                      />
                      React
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="php"
                        checked={checkboxState.php}
                        disabled={true}
                        className="mr-2 h-5 w-5 rounded-md"
                      />
                      PHP
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="vsCode"
                        name="vsCode"
                        checked={checkboxState.vsCode}
                        disabled={true}
                        disabled={true}
                        className="mr-2 h-5 w-5 rounded-md"
                      />
                      VS Code
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="sqlServer"
                        name="sqlServer"
                        checked={checkboxState.sqlServer}
                        disabled={true}
                        className="mr-2 h-5 w-5 rounded-md"
                      />
                      SQL Server
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="docker"
                        checked={checkboxState.docker}
                        disabled={true}
                        className="mr-2 h-5 w-5 rounded-md"
                      />
                      Docker
                    </label>
                  </div>
                </div>

                {checkboxState.otherProgram && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-[18px] font-bold">ข้อมูลโปรแกรมเพิ่มเติม</h3>
                    <p className="text-[16px] mt-2">
                      รายละเอียดเพิ่มเติม: {profileData?.otherProgramDetails || 'N/A'}
                    </p>
                  </div>
                )}

                {checkboxState.otherProgram && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-[18px] font-bold">ข้อมูลโปรแกรมเพิ่มเติม</h3>
                    <p className="text-[16px] mt-2">
                      รายละเอียดเพิ่มเติม: {profileData?.otherProgramDetails || 'N/A'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <ImageModal show={modalImageUrl !== null} imageUrl={modalImageUrl} onClose={closeModal} />
    </>
  );
};

export default Profile;