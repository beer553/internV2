import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/footer';
import NavbarMentor from '../component/navbar_mentor';
import ImageModal from '../component/ImageModal';

const Profile = () => {
  const navigate = useNavigate();
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const [checkboxState, setCheckboxState] = useState({
    frontend: true,
    backend: false,
    fullstack: false,
    dataAnalysis: false,
    dataManagement: false,
    other: false,
    figma: true,
    react: true,
    php: false,
    vsCode: true,
    sqlServer: false,
    docker: false,
  });

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  const closeModal = () => {
    setModalImageUrl(null);
  };

  const handleCheckboxChange = (id) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderCheckbox = (id, label, checked, disabled) => (
    <div className="flex items-center ml-1">
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        disabled={disabled}
        onChange={() => handleCheckboxChange(id)}
        className={`w-6 h-6 rounded border-2 ${checked ? 'bg-green-500 border-green-500' : 'bg-white border-gray-500'}`}
      />
      {checked && (
        <span className="absolute w-2 h-3 border-white border-r-2 border-b-2 transform rotate-45 top-1 left-1"></span>
      )}
      <label htmlFor={id} className="ml-2 text-[20px] text-gray-800">
        {label}
      </label>
    </div>
  );

  return (
    <>
      <div>
        <header>
          <NavbarMentor />
        </header>

        <main className="p-5">
          <section className="flex justify-center mb-5">
            <div className="flex p-5">
              <img
                src="/src/img/profile_teerapat.png"
                className="w-96 h-96 rounded-lg mt-12 mr-16 cursor-pointer"
                alt="Profile"
                onClick={() => openModal('/src/img/profile_teerapat.png')}
              />
              <div className="text-left text-black">
                <h2 className="bg-orange-500 text-white p-2 rounded-lg text-center mb-5">ข้อมูลส่วนตัว</h2>
                <p><strong>ID :</strong> 0001-123456</p>
                <p><strong>ชื่อ - นามสกุล :</strong> นายธีรภัทร์ วั่นเล่ง</p>
                <p><strong>ชื่อเล่น :</strong> แดนนี่</p>
                <p><strong>อายุ :</strong> 19 ปี</p>
                <p><strong>วันเกิด :</strong> 18 / 06 / 2548</p>
                <p><strong>สัญชาติ :</strong> ไทย</p>
                <p><strong>เบอร์มือถือ :</strong> 082-337-9677</p>
                <div className="flex gap-2 mt-5">
                  {Array.from({ length: 13 }).map((_, index) => (
                    <div key={index} className="w-4 h-11 bg-orange-500"></div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-between bg-white p-5 rounded-lg mb-5">
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-[25px] text-left text-gray-800">ตำแหน่งที่สมัคร</label>
              <input
                type="text"
                placeholder="Digital Information"
                className="rounded-lg bg-white border border-gray-300 text-[20px] p-3 w-64"
                readOnly
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-[25px] text-left text-gray-800">สถานศึกษาปัจจุบัน</label>
              <input
                type="text"
                placeholder="วิทยาลัยเทคนิคทุ่งสง"
                className="rounded-lg bg-white border border-gray-300 text-[20px] p-3 w-64"
                readOnly
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-[25px] text-left text-gray-800">วันเดือนปีเริ่มฝึกงาน</label>
              <input
                type="text"
                placeholder="13/5/2567"
                className="rounded-lg bg-white border border-gray-300 text-[20px] p-3 w-64"
                readOnly
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-[25px] text-left text-gray-800">วันเดือนปีฝึกงานวันสุดท้าย</label>
              <input
                type="text"
                placeholder="31/1/2568"
                className="rounded-lg bg-white border border-gray-300 text-[20px] p-3 w-64"
                readOnly
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-[25px] text-left text-gray-800">GPA รวม</label>
              <div className="border-2 border-green-600 rounded-lg p-2.5 text-[20px] text-green-600 w-64 text-center">
                4.00
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex-1 p-5 rounded-lg mx-2">
              <div className="flex items-center mb-11">
                <p className="text-[25px] text-black text-left">ดู Resume</p>
                <img
                  src="/src/img/img_icon/resume.png"
                  className="w-10 h-10 ml-[330px]"
                  alt="Resume"
                />
              </div>
              <div className="flex items-center mb-11">
                <p className="text-[25px] text-black text-left">ดู Transcript</p>
                <img
                  src="/src/img/img_icon/transcription.png"
                  className="w-10 h-10 ml-[308px]"
                  alt="Transcript"
                />
              </div>
              <div className="flex items-center mb-11">
                <p className="text-[25px] text-black text-left">ดูประวัติส่วนตัวเพิ่มเติม</p>
                <img
                  src="/src/img/img_icon/profile.png"
                  className="w-10 h-10 ml-[240px]"
                  alt="Profile"
                />
              </div>
              <div className="flex items-center mb-11">
                <p className="text-[25px] text-black text-left">
                  ตัวอย่าง Project ที่เคยทำมา (โปรดส่งเป็นไฟล์ PDF)
                </p>
                <img
                  src="/src/img/img_icon/project.png"
                  className="w-10 h-10 ml-[38px]"
                  alt="Project"
                />
              </div>
              <div className="flex items-center mb-11">
                <p className="text-[25px] text-black text-left">
                  ผลงาน link GitHub <span className="text-red-500">*ถ้ามี</span>
                </p>
                <img
                  src="/src/img/img_icon/github.png"
                  className="w-10 h-10 ml-[228px]"
                  alt="Github"
                />
              </div>
            </div>

            <div className="flex-1 p-5 rounded-lg mx-2">
              <div className="flex flex-col mb-4">
                <label className="mb-1 text-[25px] text-left text-gray-800">โปรดกรอกเป้าหมาย</label>
                <textarea
                  className="rounded-lg bg-white border border-gray-300 text-[20px] p-2 w-full h-28 resize-none"
                  readOnly
                >
                  อยากทำโปรเจคเกี่ยวกับการออกแบบอยากได้ ประสบการณ์ในการคุยกับลูกค้าจริงๆ
                </textarea>
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-1 text-[25px] text-left text-gray-800">โปรดเลือกงานสายงานที่ถนัด</label>
                <div className="grid grid-cols-3 gap-y-4 text-[20px]">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="frontend"
                      checked={checkboxState.frontend}
                      disabled={false}
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
                      name="full-stack"
                      checked={checkboxState.fullstack}
                      disabled={true}
                      className="mr-2 h-5 w-5 rounded-md"
                    />
                    Full Stack
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="data-analysis"
                      checked={checkboxState.dataAnalysis}
                      disabled={true}
                      className="mr-2 h-5 w-5 rounded-md"
                    />
                    Data Analysis
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="data-management"
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

              <div className="flex flex-col">
                <label className="mb-1 text-[25px] text-left text-gray-800">โปรแกรมหรืองานที่ถนัด (3 อย่างที่ถนัดที่สุด)</label>
                <div className="grid grid-cols-3 gap-y-4 text-[20px]">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="figma"
                      checked={checkboxState.figma}
                      disabled={false}
                      className="mr-2 h-5 w-5 rounded-md"
                    />
                    Figma
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="react"
                      checked={checkboxState.react}
                      disabled={false}
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
                      name="vs-code"
                      checked={checkboxState.vsCode}
                      disabled={false}
                      className="mr-2 h-5 w-5 rounded-md"
                    />
                    VS Code
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="sql-server"
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
