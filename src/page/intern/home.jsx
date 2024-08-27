import React from 'react';
import { FaEdit } from 'react-icons/fa'; // Using FontAwesome for the edit icon
import NavbarIntern from '../component/navbar_intern';
import Footer from '../component/footer';

const Home = () => {
  return (
    <div>
      <header>
        <NavbarIntern />
      </header>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-5xl bg-white p-6 flex justify-between items-center">
          {/* Profile Section */}
          <div className="flex items-center ml-[50px] mt-2">
            <div className='mt-5'>
              <img src="/src/img/profile_teerapat.png" alt="Profile" className="w-[150px] h-[150px] rounded-full ml-1" />
            </div>
            <div className="ml-20">
              <h1 className="flex items-start text-5xl font-bold text-black">Hello, Intern Teerapat</h1>
              <div className="bg-gray-100 p-2 rounded-lg mt-2 flex items-start w-[70%] h-[150px]">
                <p className="text-left text-gray-600 text-[20px]">
                  อยากทำโปรเจคเกี่ยวกับการออกแบบ อยากได้ประสบการณ์ในการคุยกับลูกค้าจริง ๆ
                </p>
                <FaEdit className="ml-2 text-gray-500 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="text-right text-black">
            <div className="flex justify-end items-center">
              <h2 className="text-xl font-semibold">ความสามารถด้านถนัด</h2>
              <FaEdit className="ml-2 text-gray-500 cursor-pointer h-5" />
            </div>
            <div className="mt-2">
              <p className="font-bold flex items-center justify-start text-[20px]">Frontend</p>
              <div className="flex items-center justify-start text-[20px]">
                <p className="mr-2 font-bold">1</p>
                <img src="/src/img/img_icon/figma.png" alt="Figma" className="w-6 h-6" />
                <p className="ml-2">Figma</p>
              </div>
              <div className="flex items-center justify-start mt-2 text-[20px]">
                <p className="mr-2 font-bold">2</p>
                <img src="/src/img/img_icon/react.png" alt="React" className="w-6 h-6" />
                <p className="ml-2">React</p>
              </div>
              <div className="flex items-center justify-start mt-2 text-[20px]">
                <p className="mr-2 font-bold">3</p>
                <img src="/src/img/img_icon/visual-studio.png" alt="VS Code" className="w-6 h-6" />
                <p className="ml-2">VS Code</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Section */}
      <div className="flex justify-center mt-3 mb-10">
        <div className="w-full max-w-5xl grid grid-cols-3 gap-6 text-black">
          <div className="bg-gray-50 p-4 text-center rounded-lg">
            <img src="/src/img/img_icon/intern.png" alt="Internship" className="w-16 h-16 mx-auto mt-3" />
            <p className="mt-4 text-lg font-semibold">ฝึกงานไปแล้วกี่วัน</p>
            <p className="text-2xl font-bold">0 / 0 บาท</p>
            <div className="h-1.5 bg-yellow-400 mt-2"></div>
          </div>
          <div className="bg-gray-50 p-4 text-center rounded-lg">
            <img src="/src/img/img_icon/goal.png" alt="Goal" className="w-16 h-16 mx-auto mt-3" />
            <p className="mt-4 text-lg font-semibold">จำนวนวันเหลือในการฝึกงาน</p>
            <p className="text-2xl font-bold">40 วัน / 20,000 บาท</p>
            <div className="h-1.5 bg-orange-400 mt-2 "></div>
          </div>
          <div className="bg-gray-50 p-4 text-center rounded-lg">
            <img src="/src/img/img_icon/money-bag.png" alt="Money" className="w-16 h-16 mx-auto mt-3" />
            <p className="mt-4 text-lg font-semibold">จำนวนเงินที่ทำในเดือนนี้</p>
            <p className="text-2xl font-bold">5 วัน / 2,500 บาท</p>
            <div className="h-1.5 bg-yellow-300 mt-2 "></div>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="flex justify-center mb-10 flex">
        <div className="w-full max-w-5xl p-2 ">
          <div className='bg-[#FAA51C] p-1 rounded-lg shadow-md w-[25%] h-[8%] mb-3 '>
            <h2 className="text-[35px] font-bold text-white">ข้อมูลส่วนตัว</h2>
          </div>
          <div className="text-left text-black ml-1 text-[25px]">
            <p className='my-1'>ID : G001-12345</p>
            <p className='my-1'>ชื่อ - นามสกุล : นายธีรภัทร์ วั่นเล่ง</p>
            <p className='my-1'>ชื่อเล่น : แดนนี่</p>
            <p className='my-1'>อายุ : 19 ปี</p>
            <p className='my-1'>วันเกิด : 18 / 06 / 2548</p>
            <p className='my-1'>สัญชาติ : ไทย</p>
            <p className='my-1'>เบอร์มือถือ : 082-337-9677</p>
            <p className='my-1'>หน่วยงาน : Digital Transformation</p>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <img src="/src/img/img_icon/backlog.png" alt="Backlog" className="w-12 h-12" />
              <p className="ml-4 text-xl font-semibold">ดู Back log</p>
              <div className="h-1.5 bg-yellow-300 mt-2 "></div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <img src="/src/img/img_icon/scrum.png" alt="Scrum" className="w-12 h-12" />
              <p className="ml-4 text-xl font-semibold">SCRUM</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <img src="/src/img/img_icon/money.png" alt="Money" className="w-12 h-12" />
              <p className="ml-4 text-xl font-semibold">เบิกงบเบี้ยเลี้ยง</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <img src="/src/img/img_icon/project.png" alt="Money" className="w-12 h-12" />
              <p className="ml-4 text-xl font-semibold">ดูโปรเจค</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <img src="/src/img/img_icon/sick.png" alt="Work From Home" className="w-12 h-12" />
              <p className="ml-4 text-xl font-semibold">แจ้งลา / Work For Home</p>
            </div>
          </div>
        </div>
        {/* <div className="pattern-container">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="pattern-bar"></div>
          ))}
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
