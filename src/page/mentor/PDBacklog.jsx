import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ต้อง import axios
import NavbarMentor from '../component/navbar_intern';
import Footer from '../component/footer';
import { useAuth } from '../../context/AuthContext'; // ตัวอย่างสำหรับการดึง user จาก context

const ProductBacklog = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ดึง user จาก AuthContext
  const [projects, setProjects] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const gotoHomepage = () => {
    navigate('/Homepage');
  };

  const gotoBLProject = (project_id) => {
    navigate(`/BLProject/${project_id}`); // ส่ง project_id ไปด้วยใน URL
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('th-TH', options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'เริ่มต้น':
        return 'bg-blue-500 text-white'; // สีน้ำเงิน
      case 'กำลังดำเนินการ':
        return 'bg-green-500 text-white'; // สีเขียว
      case 'เสร็จสิ้น':
        return 'bg-gray-500 text-white'; // สีเทา
      case 'ยกเลิก':
        return 'bg-red-500 text-white'; // สีแดง
      default:
        return 'bg-gray-200 text-black'; // สีเริ่มต้น
    }
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost/internV2/backend/mentor/project.php?user_id=${user.user_id}`);
        setProjects(response.data);
        setSearchResults(response.data); // แสดงผลการค้นหาทั้งหมดโดยตั้งต้นให้เท่ากับ projects
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    if (user && user.user_id) {
      fetchProjects();
    }
  }, [user]);

  return (
    <div>
      <header>
        <NavbarMentor />
      </header>
      <main>
        <div className='flex mt-5 ml-5 text-gray-600'>
          <div className='text-[70px] ml-20 text-[#5C5A5A] mb-3'>Product Backlog</div>
          <div className='flex justify-end w-[60%]'>
            <img
              src="/src/img/img_icon/left-arrow.png"
              className="w-8 h-8 mt-14 cursor-pointer mr-20"
              onClick={gotoHomepage}
              alt="Back"
            />
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
              <th className='p-4 text-center text-[25px]'>Team Develop</th>
              <th className='p-4 text-center text-[25px]'>Backlog</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((project, index) => (
              <tr key={index}>
                <td className='p-4 text-center text-[18px]'>{index + 1}</td>
                <td className='p-4 text-center text-[18px]'>{formatDate(project.startdate)}</td>
                <td className='p-4 text-center text-[18px]'>{formatDate(project.enddate)}</td>
                <td className='p-4 text-left text-[18px]'>{project.projectname}</td>
                <td className='p-4 text-left text-[18px]'>{project.scrummaster}</td>
                <td className="flex justify-center items-center text-[18px] ">
                  <div className={`w-[150px] px-3 py-1 justify-center flex items-center rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </div>
                </td>
                <td className='p-4 text-left text-[18px]'>{project.team_members}</td>
                <td className='text-center'>
                  <span
                    className="block w-9 h-9 mt-2 ml-12 bg-cover cursor-pointer"
                    style={{ backgroundImage: "url('/src/img/img_icon/2666505.png')" }}
                    onClick={() => gotoBLProject(project.project_id)} // ส่ง project_id ไปด้วย
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mb-10'></div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductBacklog;
