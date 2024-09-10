import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/footer';
import NavbarMentor from '../component/navbar_mentor';

function Homepage() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [manpowerData, setManpowerData] = useState([
    { id: 1, name: '0001-123456 Phurin Chairoek', status: 'รอฝึกงาน', timeline: '01/01/2024 - 31/12/2024', project: 'OT Dashboard' },
    { id: 2, name: '0001-123456 Teerapat Wanleng', status: 'กำลังฝึกงาน', timeline: '01/01/2024 - 31/12/2024', project: 'Internship' },
    { id: 3, name: '0001-123456 Teerapat Wanleng', status: 'กำลังฝึกงาน', timeline: '01/01/2024 - 31/12/2024', project: 'OT Dashboard' },
    { id: 4, name: '0001-123456 Teerapat Wanleng', status: 'กำลังฝึกงาน', timeline: '01/01/2024 - 31/12/2024', project: 'Internship' },
    { id: 5, name: '0001-123456 Teerapat Wanleng', status: 'ฝึกงานเสร็จสิ้น', timeline: '01/01/2024 - 31/12/2024', project: 'OT Dashboard' },
    { id: 6, name: '0001-123456 Teerapat Wanleng', status: 'ฝึกงานเสร็จสิ้น', timeline: '01/01/2024 - 31/12/2024', project: 'OT Dashboard' },
  ]);
  const [newManpower, setNewManpower] = useState({ id: '', name: '', startDate: '', endDate: '' });

  const goToProfilePage = () => {
    navigate('/IDP');
  };

  const gotoProductBacklog = () => {
    navigate('/PDBacklog');
  };

  const gotoProject = () => {
    navigate('/Project');
  };

  const gotoDailyscrum = () => {
    navigate('/Dailyscrum');
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'startDate' || name === 'endDate') {
      setNewManpower({ ...newManpower, [name]: value });
    } else if (name === 'id') {
      const formattedId = formatId(value);
      setNewManpower({ ...newManpower, id: formattedId });
    } else {
      setNewManpower({ ...newManpower, [name]: value });
    }
  };

  const formatId = (value) => {
    const digits = value.replace(/\D/g, '');
    const formattedId = digits.slice(0, 4) + (digits.length > 4 ? '-' + digits.slice(4, 10) : '');
    return formattedId;
  };

  const handleSubmit = () => {
    if (new Date(newManpower.endDate) < new Date(newManpower.startDate)) {
      alert('End Date cannot be earlier than Start Date');
      return;
    }

    const formattedName = newManpower.name.replace(/\s+/g, ' ').trim();
    const combinedIdName = `${newManpower.id} ${formattedName}`; // Combine ID and Name

    const newEntry = {
      id: manpowerData.length + 1,
      name: combinedIdName, // Use the combined value
      status: 'รอฝึกงาน',
      timeline: `${formatDate(newManpower.startDate)} - ${formatDate(newManpower.endDate)}`,
      project: 'Project Name',
    };

    setManpowerData([...manpowerData, newEntry]);
    togglePopup();
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <header>
        <NavbarMentor />
      </header>

      <div className="bg-white">
        <div className="flex justify-center items-center mt-3 mb-3">
          <img src="/src/img/star.png" className="w-24 h-24 rounded-full mt-6" alt="Profile" />
          <div className="ml-4 mt-4">
            <h2 className='text-4xl text-black'>DX Manpower Management</h2>
            <p className='text-3xl mt-2 text-black'>Hello, Scrum Master STAR 👋</p>
          </div>
        </div>

        <div className="flex justify-around items-center w-full">
          <div className="relative w-72 h-48 shadow-lg m-6 rounded-lg flex flex-col items-center justify-center bg-white">
            <div className="text-[90px] font-bold text-black">6</div>
            <div className="text-[25px] text-black mt-2">Developer Team (TTL)</div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-blue-300"></div>
          </div>

          <div className="relative w-72 h-48 shadow-lg m-6 rounded-lg flex flex-col items-center justify-center bg-white">
            <div className="text-[90px] font-bold text-black">3</div>
            <div className="text-[25px] text-black mt-2">Developer This Year</div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-orange-400"></div>
          </div>

          <div className="relative w-72 h-48 shadow-lg m-6 rounded-lg bg-white">
            <div className="flex items-center justify-center">
              <div className="text-[90px] font-bold text-black mr-10 mt-2">2</div>
              <div className="space-y-2 mt-4">
                <div className="flex items-center bg-white p-3 rounded-lg shadow cursor-pointer mb-2" onClick={gotoProject}>
                  <span className="text-[20px] text-black">Project</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow cursor-pointer" onClick={gotoDailyscrum}>
                  <span className="text-[20px] text-black">Daily Scrum</span>
                </div>
              </div>
            </div>
            <div className="mt-3 text-center text-black text-[25px]">Project This Year (Items)</div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-cyan-400"></div>
          </div>

          <div className="relative w-72 h-48 shadow-lg m-6 rounded-lg">
            <div className="flex items-center">
              <div className="text-[80px] font-bold mt-[-1px] ml-10 text-black">3</div>
              <div className="text-[50px] text-black ml-3">Sprint</div>
            </div>
            <div className="flex items-center mt-[-40px]">
              <div className="text-[90px] font-bold mt-[-30px] ml-6 text-black">10</div>
              <div className="text-[20px] bg-white p-3 rounded-lg shadow w-36 ml-3 cursor-pointer mt-[-20px]" onClick={gotoProductBacklog}>
                <div className="text-black">Product Backlog</div>
              </div>
            </div>
            <div className="mt-[-30px] ml-2 text-black text-[25px]">Product Increment (Items)</div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-green-400"></div>
          </div>
        </div>

        <div className="m-12">
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-[50px] ml-5 text-gray-600'>Manpower</h3>
            <div>
              <img
                src="/src/img/img_icon/plus.png"
                alt="Add"
                className='w-10 cursor-pointer mr-10'
                onClick={togglePopup} />
            </div>
          </div>

          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg text-left shadow-lg w-full max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-2xl ml-1 font-medium text-black">ID</label>
                    <input
                      type="text"
                      name="id"
                      value={newManpower.id}
                      onChange={handleInputChange}
                      placeholder="โปรดระบุ"
                      className="block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-[20px] bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-2xl ml-1 font-medium text-black">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newManpower.name}
                      onChange={handleInputChange}
                      placeholder="โปรดระบุ"
                      className="block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-[20px] bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-2xl ml-1 font-medium text-black">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newManpower.startDate}
                      onChange={handleInputChange}
                      placeholder="โปรดระบุ"
                      className="block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-[20px] bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-2xl ml-1 font-medium text-black">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newManpower.endDate}
                      onChange={handleInputChange}
                      placeholder="โปรดระบุ"
                      className="block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-[20px] bg-white text-black"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6 text-[20px]">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-[#4CAF50] mr-2" onClick={handleSubmit}>
                    บันทึก
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600" onClick={togglePopup}>
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          )}

          <table className="w-full border-collapse border-none">
            <thead>
              <tr>
                <th className="text-[25px] text-center text-black border-none">NO</th>
                <th className="text-[25px] text-center text-black border-none">ID Name</th>
                <th className="text-[25px] text-center text-black border-none">Status</th>
                <th className="text-[25px] text-center text-black border-none">Time Line</th>
                <th className="text-[25px] text-center text-black border-none">Project</th>
                <th className="text-[25px] text-center text-black border-none">Profile</th>
                <th className="text-[25px] text-center text-black border-none">Sprint Review</th>
                <th className="text-[25px] text-center text-black border-none">Evaluate</th>
              </tr>
            </thead>
            <tbody>
              {manpowerData.map((row, index) => (
                <tr key={index}>
                  <td className="text-[20px] text-center text-black">{row.id}</td>
                  <td className="text-[20px] text-left pl-8 text-black">{row.name}</td>
                  <td className={`text-[20px] text-black px-1 py-1 mt-3 rounded-full ${row.status === 'ฝึกงานเสร็จสิ้น' ? 'bg-[#4CAF50]' : row.status === 'รอฝึกงาน' ? 'bg-orange-400' : 'bg-yellow-300'} flex justify-center items-center`}>{row.status}</td>
                  <td className="text-[20px] text-center text-black">{row.timeline}</td>
                  <td className="text-[20px] text-left pl-8 text-black">{row.project}</td>
                  <td className="text-center">
                    <button>
                      <img className='w-12 h-12 mx-auto cursor-pointer' src="/src//img/img_icon/resume.png" alt="Profile" onClick={goToProfilePage} />
                    </button>
                  </td>
                  <td className="text-center">
                    <img className='w-12 h-12 mx-auto cursor-pointer' src="/src/img/img_icon/review.png" alt="Sprint Review" />
                  </td>
                  <td className="text-center">
                    <img className='w-12 h-12 mx-auto cursor-pointer' src="/src/img/img_icon/check-list.png" alt="Evaluate" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
