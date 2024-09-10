import React from 'react';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทางไปยังหน้าต่างๆ
import Footer from '../component/footer'; // นำเข้า Footer component
import NavbarMentor from '../component/navbar_mentor'; // นำเข้า NavbarIntern component

function AssignPJ() {
  const navigate = useNavigate(); // สร้างตัวแปร navigate เพื่อใช้ในการเปลี่ยนหน้า

  // ฟังก์ชันสำหรับนำทางกลับไปยังหน้า Project (เมื่อคลิกที่ปุ่มย้อนกลับ)
  const gotoProject = () => {
    navigate('/Project');
  };

  return (
    <div>
      <header>
        <NavbarMentor /> 
      </header>
      
      {/* หัวข้อและปุ่มย้อนกลับ */}
      <div className="flex justify-between items-center mt-10 mb-4 bg-[#FFE177]">
        <h1 className="text-[34px] font-bold text-center flex-1 text-black ml-[100px]">มอบหมายผู้รับผิดชอบ</h1>
        <img src="/src/img/img_icon/left-arrow.png" className="w-7 cursor-pointer mr-[50px]" alt="Back" onClick={gotoProject} />
      </div>
      
      <div className="px-8">
        {/* รายการผู้รับผิดชอบ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Person 1 */}
          <div className="flex items-center bg-white p-4">
            <img
              src="/src/img/profile_teerapat.png"
              alt="น้องแดนนี่"
              className="h-[200px] w-[200px] rounded-lg object-cover"
            />
            <div className="ml-4 flex-1 text-left">
              <span className="bg-[#FF9B2C] text-white px-5 py-2 rounded">น้องแดนนี่</span>
              <p className="text-black">ชื่อ-นามสกุล: นายธีรภัทร์ วั่นเล่ง</p>
              <p className="text-black">สถานศึกษา: วิทยาลัยเทคนิคทุ่งสง</p>
            </div>
            <div className="flex items-center space-x-2">
              {/* <img src="/src/img/img_icon/folder.png" alt="Folder Icon" className="h-10 w-10" /> */}
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* Person 2 */}
          <div className="flex items-center bg-white p-4">
            <img
              src="/src/img/profile-tanaphat.png"
              alt="น้องกาฟิวส์"
              className="h-[200px] w-[200px] rounded-lg object-cover"
            />
            <div className="ml-4 flex-1 text-left">
              <span className="bg-[#FF9B2C] text-white px-4 py-2 rounded">น้องกาฟิวส์</span>
              <p className="text-black">ชื่อ-นามสกุล: นายธนภัทร รัตนสุคนธ์</p>
              <p className="text-black">สถานศึกษา: วิทยาลัยเทคนิคทุ่งสง</p>
            </div>
            <div className="flex items-center space-x-2">
              {/* <img src="/src/img/img_icon/folder.png" alt="Folder Icon" className="h-10 w-10" /> */}
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* Person 3 */}
          <div className="flex items-center bg-white p-4">
            <img
              src="/src/img/profile-phurin.jpg"
              alt="น้องซัน"
              className="h-[200px] w-[200px] rounded-lg object-cover"
            />
            <div className="ml-4 flex-1 text-left">
              <span className="bg-[#FF9B2C] text-white px-8 py-2 rounded">น้องซัน</span>
              <p className="text-black">ชื่อ-นามสกุล: นายภูรินทร์ ชัยฤกษ์</p>
              <p className="text-black">สถานศึกษา: วิทยาลัยเทคนิคทุ่งสง</p>
            </div>
            <div className="flex items-center space-x-2">
              {/* <img src="/src/img/img_icon/folder.png" alt="Folder Icon" className="h-10 w-10" /> */}
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* (Duplicate of Person 1) */}
          <div className="flex items-center bg-white p-4">
            <img
              src="/src/img/profile-peerapat.jpg"
              alt="น้องแดนนี่"
              className="h-[200px] w-[200px] rounded-lg object-cover"
            />
            <div className="ml-4 flex-1 text-left">
              <span className="bg-[#FF9B2C] text-white px-5 py-2 rounded">น้องฟิวส์</span>
              <p className="text-black">ชื่อ-นามสกุล: นายพีรพัฒน์ ฤทธิศักดิ์</p>
              <p className="text-black">สถานศึกษา: วิทยาลัยเทคนิคทุ่งสง</p>
            </div>
            <div className="flex items-center space-x-2">
              {/* <img src="/src/img/img_icon/folder.png" alt="Folder Icon" className="h-10 w-10" /> */}
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* (Duplicate of Person 2) */}
          <div className="flex items-center bg-white p-4">
            <img
              src="/src/img/profile-wuttichai.jpg"
              alt="น้องกาฟิวส์"
              className="h-[200px] w-[200px] rounded-lg object-cover"
            />
            <div className="ml-4 flex-1 text-left">
              <span className="bg-[#FF9B2C] text-white px-4 py-2 rounded">น้องฟิวส์</span>
              <p className="text-black">ชื่อ-นามสกุล: นายวุฒิชัย เนาว์สุวรรณ</p>
              <p className="text-black">สถานศึกษา: วิทยาลัยเทคนิคทุ่งสง</p>
            </div>
            <div className="flex items-center space-x-2">
              {/* <img src="/src/img/img_icon/folder.png" alt="Folder Icon" className="h-10 w-10" /> */}
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* (Duplicate of Person 3) */}
          <div className="flex items-center bg-white p-4">
            <img
              src="/src/img/profile-chawanrat.jpg"
              alt="น้องซัน"
              className="h-[200px] w-[200px] rounded-lg object-cover"
            />
            <div className="ml-4 flex-1 text-left">
              <span className="bg-[#FF9B2C] text-white px-8 py-2 rounded">น้องเบียร์</span>
              <p className="text-black">ชื่อ-นามสกุล: นายชวัลรัตน์ บุญญา</p>
              <p className="text-black">สถานศึกษา: วิทยาลัยเทคนิคทุ่งสง</p>
            </div>
            <div className="flex items-center space-x-2">
              {/* <img src="/src/img/img_icon/folder.png" alt="Folder Icon" className="h-10 w-10" /> */}
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* ปุ่มยืนยัน */}
        <div className="mt-8 mb-8 flex justify-end">
          <button className="bg-green-500 text-white px-10  rounded-lg hover:bg-green-600">
            ยืนยัน
          </button>
        </div>
      </div>
      <Footer /> {/* แสดง Footer */}
    </div>
  );
}

export default AssignPJ;
