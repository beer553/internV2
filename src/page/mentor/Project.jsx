import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../component/footer';
import NavbarMentor from '../component/navbar_intern';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function Project() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth(); // ดึง user จาก AuthContext

    // State สำหรับเก็บข้อมูล project
    const [projects, setProjects] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editProjectId, setEditProjectId] = useState(null);
    const [newProject, setNewProject] = useState({
        startDate: '',
        endDate: '',
        projectName: '',
        manager: user?.username || '', // ดึง username จาก AuthContext
        status: '',
    });

    // ฟังก์ชันแปลงวันที่
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('th-TH', options);
    };

    // ฟังก์ชันแปลงสถานะให้เป็นคลาสสี
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

    // ฟังก์ชันเพื่อดึงข้อมูลโปรเจคจาก backend
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

    const handleAddProject = () => {
        setNewProject({
            startDate: '',
            endDate: '',
            projectName: '',
            manager: user?.username || '', // ใช้ username จาก AuthContext
            status: '',
        });
        setEditProjectId(null);
        setShowForm(true);
    };

    const handleEditProject = (projectId) => {
        const projectToEdit = projects.find(project => project.project_id === projectId);

        if (projectToEdit) {
            setNewProject({
                startDate: projectToEdit.startdate || '',
                endDate: projectToEdit.enddate || '',
                projectName: projectToEdit.projectname || '',
                manager: projectToEdit.scrummaster || user?.username || '', // ใช้ username จาก AuthContext หรือ scrummaster จากโปรเจค
                status: projectToEdit.status || '',
            });

            setEditProjectId(projectId);
            setShowForm(true); // เปิดฟอร์มเพื่อแก้ไขโปรเจค
        } else {
            console.error('Project not found for editing');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject({ ...newProject, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectData = {
            projectName: newProject.projectName,
            startDate: newProject.startDate,
            endDate: newProject.endDate,
            manager: user?.username || '', // ใช้ username จาก AuthContext
            status: newProject.status,
            user_id: user.user_id, // ดึง user_id จาก AuthContext
        };

        try {
            if (editProjectId) {
                await axios.put(`http://localhost/internV2/backend/mentor/project.php`, {
                    ...projectData,
                    project_id: editProjectId, // ส่ง project_id ที่ต้องการแก้ไขไปด้วย
                });

                const updatedProjects = projects.map((project) =>
                    project.project_id === editProjectId ? { ...project, ...newProject } : project
                );
                setProjects(updatedProjects);
                setSearchResults(updatedProjects);

            } else {
                const response = await axios.post('http://localhost/internV2/backend/mentor/project.php', projectData);
                const newProjectId = response.data.project_id;

                const updatedProjects = [...projects, { ...newProject, project_id: newProjectId, manager: user?.username || '' }];
                setProjects(updatedProjects);
                setSearchResults(updatedProjects);
            }

            setNewProject({
                startDate: '',
                endDate: '',
                projectName: '',
                manager: user?.username || '',
                status: '',
            });
            setShowForm(false);
            setEditProjectId(null); // รีเซ็ต editProjectId หลังจากบันทึกเสร็จ

        } catch (error) {
            console.error('Error submitting project data:', error);
            alert('An error occurred while submitting the project. Please try again.');
        }
    };

    const handleCancel = () => {
        setNewProject({
            startDate: '',
            endDate: '',
            projectName: '',
            manager: user?.username || '',
            status: '',
        });
        setEditProjectId(null);
        setShowForm(false);
    };

    const gotoAssignPJ = (projectId) => {
        navigate(`/AssignPJ?project_id=${projectId}`);
    };

    return (
        <div>
            <header className="shadow">
                <NavbarMentor />
            </header>
            <main className="flex-grow p-8">
                <div className='flex justify-end mr-6' onClick={() => navigate('/Homepage')}>
                    <img src="/src/img/img_icon/left-arrow.png" className="w-7 cursor-pointer" alt="Back" />
                </div>
                <div className="flex justify-between items-center mb-7">
                    <div className="flex items-center">
                        <h2 className="text-[70px] ml-6 text-[#5C5A5A] mb-3">Project</h2>
                    </div>

                    <button onClick={handleAddProject} className="flex items-center space-x-3 text-3xl text-black px-4 py-2 mt-2">
                        <span>Add Project</span>
                        <img src="/src/img/img_icon/plus.png" alt="Add Project" className="w-9" />
                    </button>
                </div>

                {showForm && (
                    <div className='bg-white mb-10 p-6 border rounded-lg shadow-lg'>
                        <form onSubmit={handleSubmit} className='grid grid-cols-5 gap-4'>
                            <label className='col-span-1 text-left'>
                                Start Date
                                <input
                                    type="date"
                                    name="startDate"
                                    value={newProject.startDate}
                                    onChange={handleInputChange}
                                    required
                                    className='border rounded-lg h-12 w-full p-2 text-[16px]'
                                />
                            </label>
                            <label className='col-span-1 text-left'>
                                End Date
                                <input
                                    type="date"
                                    name="endDate"
                                    value={newProject.endDate}
                                    onChange={handleInputChange}
                                    required
                                    className='border rounded-lg h-12 w-full p-2 text-[16px]'
                                />
                            </label>
                            <label className='col-span-1 text-left'>
                                Project Name
                                <input
                                    type="text"
                                    name="projectName"
                                    value={newProject.projectName}
                                    onChange={handleInputChange}
                                    required
                                    className='border rounded-lg h-12 w-full p-2 text-[16px] '
                                />
                            </label>
                            <label className='col-span-1 text-left'>
                                Scrum Master
                                <input
                                    type="text"
                                    name="manager"
                                    value={newProject.manager}
                                    disabled
                                    className='border rounded-lg h-12 w-full p-2 text-[16px] bg-gray-100'
                                />
                            </label>
                            <label className='col-span-1 text-left'>
                                Status
                                <select
                                    name="status"
                                    value={newProject.status}
                                    onChange={handleInputChange}
                                    required
                                    className='border rounded-lg h-12 w-full p-2 text-[16px]'
                                >
                                    <option value="">โปรดเลือก</option>
                                    <option value="เริ่มต้น">เริ่มต้น</option>
                                    <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                                    <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                                    <option value="ยกเลิก">ยกเลิก</option>
                                </select>
                            </label>
                        </form>
                        <div className='flex justify-center mt-6 space-x-4'>
                            <button
                                type="submit"
                                className='bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600'
                                onClick={handleSubmit}>
                                {editProjectId !== null ? 'Save Changes' : 'Add Project'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className='bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-600'>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden text-black">
                    <thead>
                        <tr className='linetable'>
                            <th className="text-center p-4 text-[25px]">No.</th>
                            <th className="text-center p-4 text-[25px]">Edit</th>
                            <th className="text-center p-4 text-[25px]">Start Date</th>
                            <th className="text-center p-4 text-[25px]">End Date</th>
                            <th className="text-center p-4 text-[25px]">Project Name</th>
                            <th className="text-center p-4 text-[25px]">Scrum Master</th>
                            <th className="text-center p-4 text-[25px]">Status</th>
                            <th className="text-center p-4 text-[25px]">Team Develop</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((project, index) => (
                            <tr key={project.project_id}>
                                <td className="text-center p-4 text-[18px]">{index + 1}</td>
                                <td className="text-center p-4 flex justify-center items-center cursor-pointer">
                                    <img src="/src/img/img_icon/Edit.png" alt="edit" className="h-10 w-10" onClick={() => handleEditProject(project.project_id)} />
                                </td>
                                <td className="text-center p-4 text-[18px]">{formatDate(project.startdate)}</td>
                                <td className="text-center p-4 text-[18px]">{formatDate(project.enddate)}</td>
                                <td className="text-left p-4 text-[18px]">{project.projectname}</td>
                                <td className="text-center p-4 text-[18px]">{project.scrummaster}</td>
                                <td className="flex justify-center text-[18px] ">
                                    <div className={`w-[150px] px-3 py-1 justify-center flex rounded-full ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </div>
                                </td>
                                <td className="text-center p-4">
                                    <div className='flex justify-center'>
                                        {project.team_members ? (
                                            // แสดงสมาชิกทีมพัฒนาหลายคน
                                            <span className="text-[18px] text-left ">
                                                {project.team_members}
                                            </span>
                                        ) : (
                                            <img src="/src/img/img_icon/development.png" alt="Team Develop" className="h-10 w-10 cursor-pointer" onClick={() => gotoAssignPJ(project.project_id)} />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <Footer />
        </div>
    );
}

export default Project;
