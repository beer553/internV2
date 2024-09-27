import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../component/footer';
import NavbarIntern from '../component/navbar_intern';
import ImageModal from '../component/ImageModal';

const Profile = () => {
  const { user_id } = useParams(); // รับ user_id จาก URL
  const navigate = useNavigate(); // ใช้สำหรับการนำทางภายในโปรแกรม
  const [modalImageUrl, setModalImageUrl] = useState(null); // สถานะเพื่อเก็บ URL ของรูปภาพที่จะแสดงใน modal
  const [profileData, setProfileData] = useState(null); // สถานะเพื่อเก็บข้อมูลโปรไฟล์
  const [loading, setLoading] = useState(true); // สถานะเพื่อระบุว่าอยู่ในระหว่างการโหลดข้อมูล
  const [error, setError] = useState(null); // สถานะเพื่อเก็บข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการดึงข้อมูลโปรไฟล์
  const [checkboxState, setCheckboxState] = useState({ // สถานะเพื่อเก็บค่าของ checkbox ในฟอร์มต่าง ๆ
    frontend: false,
    backend: false,
    fullstack: false,
    dataAnalysis: false,
    dataManagement: false,
    other: false,
    figma: false,
    react: false,
    php: false,
    vsCode: false,
    sqlServer: false,
    docker: false,
  });

  // ฟังก์ชันเพื่อเปิด modal และแสดงรูปภาพ
  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  // ฟังก์ชันเพื่อปิด modal
  const closeModal = () => {
    setModalImageUrl(null);
  };

  // ดึงข้อมูลโปรไฟล์จาก backend โดยใช้ user_id
  useEffect(() => {
    if (user_id) {
      fetchProfileData(user_id); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลโปรไฟล์
    }
  }, [user_id]); // ทำงานทุกครั้งที่ user_id เปลี่ยน

  // ฟังก์ชันเพื่อดึงข้อมูลโปรไฟล์จาก backend
  const fetchProfileData = async (user_id) => {
    try {
      setLoading(true); // ตั้งสถานะเป็นกำลังโหลด
      const response = await fetch(`http://localhost/internV2/backend/intern/profile.php?user_id=${user_id}`);
      const data = await response.json();

      // ตรวจสอบว่าการดึงข้อมูลสำเร็จและมีข้อมูลที่ถูกต้อง
      if (data.status === 'success' && data.data) {
        const profile = data.data;

        // แปลงค่าข้อมูลของ goodjob และ program ให้เป็น array
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

        setProfileData(profile); // ตั้งค่าข้อมูลโปรไฟล์ที่ดึงมาใน state
      } else {
        throw new Error('Profile data not found'); // กรณีข้อมูลไม่พบ
      }
    } catch (error) {
      setError('Error fetching profile data: ' + error.message); // แสดงข้อผิดพลาดหากมีปัญหาในการดึงข้อมูล
    } finally {
      setLoading(false); // ตั้งสถานะหยุดโหลดเมื่อเสร็จสิ้นการดึงข้อมูล
    }
  };

  // แสดงข้อความ Loading เมื่อกำลังโหลดข้อมูล
  if (loading) {
    return <div>Loading...</div>;
  }

  // แสดงข้อความข้อผิดพลาดเมื่อเกิดปัญหา
  if (error) {
    return <div>{error}</div>;
  }

  // ฟังก์ชันแปลงวันที่ให้เป็นรูปแบบ วัน/เดือน/ปี
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);

    // แปลงวันที่ เดือน ปี จาก ค.ศ. เป็น พ.ศ.
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear() + 543; // แปลงปีจาก ค.ศ. เป็น พ.ศ.

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <div>
        <header>
          <NavbarIntern /> {/* นำเข้าเมนู Navbar */}
        </header>
        <main className="p-5">
          {/* ปรับให้ใช้ flex-box สำหรับการตอบสนอง */}
          <section className="flex flex-col md:flex-row justify-center bg-white border rounded-lg mb-8">
            <div className="flex p-5">
              <div className="flex flex-col items-center ml-0 md:ml-[120px]">
                {/* แสดงรูปโปรไฟล์ */}
                <img
                  src={profileData?.profile ? `/backend/intern/uploads/profile/${profileData.profile}` : '/src/img/default_profile.png'}
                  className="max-w-[170px] rounded-lg mt-5 mb-5 cursor-pointer"
                  alt="Profile"
                  onClick={() => openModal(profileData?.profile ? `/backend/intern/uploads/profile/${profileData.profile}` : '/src/img/default_profile.png')}
                />

                {/* ส่วนของลิงก์ย้ายมาไว้ใต้รูปโปรไฟล์ */}
                <div className="flex flex-col space-y-5 mt-2 mr-14">
                  <a
                    href={profileData?.resume ? `/backend/intern/uploads/resume/${profileData.resume}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[18px] text-black no-underline bg-white border rounded-lg p-3 shadow-md text-left transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-black hover:text-white w-[137%]"
                  >
                    View Resume {/* ลิงก์ไปยังไฟล์ Resume */}
                  </a>
                  <a
                    href={profileData?.transcript ? `/backend/intern/uploads/transcript/${profileData.transcript}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[18px] text-black no-underline bg-white border rounded-lg p-3 shadow-md text-left transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-black hover:text-white w-[137%]"
                  >
                    View Transcript {/* ลิงก์ไปยังไฟล์ Transcript */}
                  </a>
                  <a
                    href={profileData?.otherFiles ? `/backend/intern/uploads/otherFiles/${profileData.otherFiles}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[18px] text-black no-underline bg-white border rounded-lg p-3 shadow-md text-left transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-black hover:text-white w-[137%]"
                  >
                    View Project {/* ลิงก์ไปยังไฟล์ Project */}
                  </a>
                </div>
              </div>

              {/* ส่วนข้อมูลส่วนตัว */}
              <div className="text-left text-black mt-5 ml-0 md:ml-16 space-y-4">
                <h2 className="bg-orange-500 text-white p-2 rounded-lg text-center mb-5 text-[25px]">ข้อมูลส่วนตัว</h2>
                <div className="text-[20px] ml-2 mb-2">ID : {profileData?.user_id || 'Loading...'}</div>
                <div className="text-[20px] ml-2 mb-2">ชื่อ - นามสกุล : {profileData?.firstName} {profileData?.lastName || 'Loading...'}</div>
                <div className="text-[20px] ml-2 mb-2">ชื่อเล่น : {profileData?.nickname || 'Loading...'}</div>
                <div className="text-[20px] ml-2 mb-2">อายุ : {profileData?.age || 'Loading...'}</div>
                <div className="text-[20px] ml-2 mb-2">วันเกิด : {formatDate(profileData?.birthDate)}</div>
                <div className="text-[20px] ml-2 mb-2">สัญชาติ : {profileData?.nationality || 'Loading...'}</div>
                <div className="text-[20px] ml-2 mb-2">เบอร์มือถือ : {profileData?.phone || 'Loading...'}</div>
                <div className="flex gap-2">
                  {Array.from({ length: 13 }).map((_, index) => (
                    <div key={index} className="w-4 h-11 bg-orange-500"></div>
                  ))}
                </div>
              </div>

              {/* ส่วนเป้าหมายและข้อมูลโปรแกรมที่ถนัด */}
              <div className="flex-1 p-5 rounded-lg mx-2 space-y-10 ml-0 md:ml-12">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-[20px] text-left text-gray-800">เป้าหมาย</label>
                  <p className="rounded-lg bg-gray-100 border border-gray-300 text-[18px] p-2 w-full md:w-[84%] h-28 text-left">
                    {profileData?.goal || "อยากทำโปรเจคเกี่ยวกับการออกแบบอยากได้ ประสบการณ์ในการคุยกับลูกค้าจริงๆ"}
                  </p>
                </div>
                <div className="flex flex-col mb-11">
                  <label className="mb-1 text-[20px] text-left text-gray-800">สายงานที่ถนัด</label>
                  <div className="grid grid-cols-3 gap-y-4 text-[18px]">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="frontend"
                        checked={checkboxState.frontend}
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

                {/* ข้อมูลเพิ่มเติมเมื่อเลือก "อื่นๆ" */}
                {checkboxState.other && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-[18px] font-bold">ข้อมูลเพิ่มเติม</h3>
                    <p className="text-[16px] mt-2">
                      รายละเอียดเพิ่มเติม: {profileData?.otherDetails || 'N/A'}
                    </p>
                  </div>
                )}

                {/* แสดงโปรแกรมหรือทักษะที่ถนัด */}
                <div className="flex flex-col">
                  <label className="mb-1 text-[20px] text-left text-gray-800">
                    เครื่องมือที่ถนัดที่สุด
                  </label>
                  <div className="grid grid-cols-3 gap-y-4 text-[18px]">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="figma"
                        checked={checkboxState.figma}
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
                        checked={checkboxState.vsCode}
                        disabled={true}
                        className="mr-2 h-5 w-5 rounded-md"
                      />
                      VS Code
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
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

                {/* ข้อมูลเพิ่มเติมสำหรับโปรแกรมที่เลือก */}
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
          </section>

          {/* ส่วนข้อมูลการศึกษา */}
          <div className='bg-white p-5 rounded-lg'>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col mb-4">
                <label className="mb-1 text-[20px] text-left text-gray-800">ตำแหน่งที่สมัคร</label>
                <input
                  type="text"
                  value={profileData?.position || 'N/A'}
                  className="rounded-lg bg-white border border-gray-300 text-[20px] p-3 w-full md:w-64"
                  disabled
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-1 text-[20px] text-left text-gray-800">สถานศึกษาปัจจุบัน</label>
                <input
                  type="text"
                  value={profileData?.currentEducation || 'N/A'}
                  className="rounded-lg bg-white border border-gray-300 text-[20px] p-3 w-full md:w-64"
                  disabled
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-1 text-[20px] text-left text-gray-800">วันเดือนปีเริ่มฝึกงาน</label>
                <input
                  type="text"
                  value={formatDate(profileData?.datestart)} // แปลงวันเริ่มฝึกงานเป็นวัน/เดือน/ปี
                  className="rounded-lg  bg-white border border-gray-300 text-[20px] p-3 w-full md:w-64"
                  disabled
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-1 text-[20px] text-left text-gray-800">วันเดือนปีสิ้นสุดฝึกงาน</label>
                <input
                  type="text"
                  value={formatDate(profileData?.dateend)} // แปลงวันสิ้นสุดฝึกงานเป็นวัน/เดือน/ปี
                  className="rounded-lg bg-white border border-gray-300 text-[20px] p-3 w-full md:w-64"
                  disabled
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-1 text-[20px] text-left text-gray-800">GPA รวม</label>
                <div className="border-2 border-green-600 rounded-lg p-2.5 text-[20px] text-green-600 w-full md:w-64 text-center">
                  {profileData?.gpa || 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer /> {/* นำเข้า Footer */}
      <ImageModal show={modalImageUrl !== null} imageUrl={modalImageUrl} onClose={closeModal} /> {/* แสดง modal รูปภาพ */}
    </>
  );
};

export default Profile;