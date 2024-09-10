import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarMentor from '../component/navbar_mentor';
import Footer from '../component/footer';

const ProductBacklog = () => {
  const navigate = useNavigate();

  const gotoHomepage = () => {
    navigate('/Homepage');
  };

  const gotoBLProject = () => {
    navigate('/BLProject');
  };

  return (
    <div className='bg-white'>
      <header>
        <NavbarMentor />
      </header>

      <main>
        <div className='flex mt-5 ml-5 text-gray-600'>
          <div className='text-[80px] ml-20 text-[#5C5A5A] mb-3'>Product Backlog</div>
          <div className='flex justify-end w-[60%]'>
            <img src="/src/img/img_icon/left-arrow.png" className="w-8 h-8 mt-16 cursor-pointer" onClick={gotoHomepage} />
          </div>
        </div>
        <table className='w-[90%] shadow-md rounded-lg mt-3 ml-[75px] text-black'>
          <thead>
            <tr className='linetable'>
              <th className='p-2 text-center text-[25px]'>ลำดับ</th>
              <th className='p-2 text-center text-[25px]'>วันที่เริ่ม</th>
              <th className='p-2 text-center text-[25px]'>กำหนดรับ</th>
              <th className='p-2 text-center text-[25px]'>ชื่อโปรเจค</th>
              <th className='p-2 text-center text-[25px]'>ผู้ดูแล</th>
              <th className='p-2 text-center text-[25px]'>สถานะ</th>
              <th className='p-2 text-center text-[25px]'>แผนงาน</th>
              <th className='p-2 text-center text-[25px]'>มอบหมายผู้รับผิดชอบ</th>
              <th className='p-2 text-center text-[25px]'>Backlog</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='p-2 text-center text-[20px]'>1</td>
              <td className='p-2 text-center text-[20px]'>01/01/2024</td>
              <td className='p-2 text-center text-[20px]'>31/03/2024</td>
              <td className='p-2 text-center text-[20px]'>KM Selg-Learning</td>
              <td className='p-2 text-center text-[20px]'>สุพรรษา มูลศิริ</td>
              <td className='p-2 text-center'>
                <span className="bg-[#4CAF50] text-white px-3 py-1 rounded-full text-[20px]">กำลังดำเนินงาน</span> {/* สถานะโปรเจค */}
              </td>
              <td className='p-2 text-center text-[20px]'>...</td>
              <td className='p-2 text-center text-[20px]'>น้องแดนนี่, น้องกาฟิวส์, น้องเบียร์</td>
              <td>
                <span className="block w-9 h-9 mt-2 ml-7 bg-cover cursor-pointer" style={{ backgroundImage: "url('/src/img/img_icon/backlog-white.png')" }} onClick={gotoBLProject}></span>
              </td>
            </tr>
            <tr>
              <td className='p-2 text-center text-[20px]'>2</td>
              <td className='p-2 text-center text-[20px]'>01/01/2024</td>
              <td className='p-2 text-center text-[20px]'>31/03/2024</td>
              <td className='p-2 text-center text-[20px]'>Dashboard License</td>
              <td className='p-2 text-center text-[20px]'>สุพรรษา มูลศิริ</td>
              <td className='p-2 text-center'>
                <span className="bg-[#4CAF50] text-white px-3 py-1 rounded-full text-[20px]">กำลังดำเนินงาน</span> {/* สถานะโปรเจค */}
              </td>
              <td className='p-2 text-center text-[20px]'>...</td>
              <td className='p-2 text-center text-[20px]'>น้องเจ, น้องณเดช, น้องไนท์</td>
              <td>
                <span className="block w-9 h-9 mt-2 ml-7 bg-cover cursor-pointer" style={{ backgroundImage: "url('/src/img/img_icon/backlog-white.png')" }} onClick={gotoBLProject}></span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='mb-10'></div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductBacklog;
