import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarMentor from '../component/navbar_intern';
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
    <div>
      <header>
        <NavbarMentor />
      </header>
      <main>
        <div className='flex mt-5 ml-5 text-gray-600'>
          <div className='text-[70px] ml-20 text-[#5C5A5A] mb-3'>Product Backlog</div>
          <div className='flex justify-end w-[60%]'>
            <img src="/src/img/img_icon/left-arrow.png" className="w-8 h-8 mt-14 cursor-pointer mr-20" onClick={gotoHomepage} />
          </div>
        </div>
        <table className='w-[90%] bg-white shadow-lg rounded-lg mt-5 ml-[75px] text-black'>
          <thead>
            <tr className='linetable'>
              <th className='p-4 text-center text-[25px]'>No.</th>
              <th className='p-4 text-center text-[25px]'>Start Date</th>
              <th className='p-4 text-center text-[25px]'>End Date</th>
              <th className='p-4 text-center text-[25px]'>Project Name</th>
              <th className='p-4 text-center text-[25px]'>Scrum Master</th>
              <th className='p-4 text-center text-[25px]'>Status</th>
              <th className='p-4 text-center text-[25px]'>Team Deavelop</th>
              <th className='p-4 text-center text-[25px]'>Backlog</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='p-4 text-center text-[18px]'>1</td>
              <td className='p-4 text-center text-[18px]'>01/01/2024</td>
              <td className='p-4 text-center text-[18px]'>31/03/2024</td>
              <td className='p-4 text-left text-[18px]'>KM Selg-Learning</td>
              <td className='p-4 text-[18px]'>Supansa Moonsiri</td>
              <td className='p-4 text-center'>
                <span className="bg-[#4CAF50] text-white px-3 py-1 rounded-full text-[18px]">กำลังดำเนินงาน</span> {/* สถานะโปรเจค */}
              </td>
              <td className='p-4 text-left text-[18px]'>น้องแดนนี่, น้องกาฟิวส์, น้องเบียร์</td>
              <td className='text-center'>
                <span className="block w-9 h-9 mt-2 ml-12 bg-cover cursor-pointer" style={{ backgroundImage: "url('/src/img/img_icon/2666505.png')", justifyContent: 'center' }} onClick={gotoBLProject}></span>
              </td>
            </tr>
            <tr>
              <td className='p-4 text-center text-[18px]'>2</td>
              <td className='p-4 text-center text-[18px]'>01/01/2024</td>
              <td className='p-4 text-center text-[18px]'>31/03/2024</td>
              <td className='p-4 text-left text-[18px]'>Dashboard License</td>
              <td className='p-4 text-center text-[18px]'>Supansa Moonsiri</td>
              <td className='p-4 text-center'>
                <span className="bg-[#4CAF50] text-white px-3 py-1 rounded-full text-[18px]">กำลังดำเนินงาน</span> {/* สถานะโปรเจค */}
              </td>
              <td className='p-4 text-left text-[18px]'>น้องเจ, น้องณเดช, น้องไนท์</td>
              <td className='text-center'>
                <span className="block w-9 h-9 mt-2 ml-12 bg-cover cursor-pointer text-center" style={{ backgroundImage: "url('/src/img/img_icon/2666505.png')" }} onClick={gotoBLProject}></span>
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
