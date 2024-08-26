import React from 'react';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทางไปยังหน้าต่างๆ
import Footer from '../component/footer';
import NavbarMentor from '../component/navbar_mentor';

function Project() {
    const navigate = useNavigate(); // สร้างตัวแปร navigate เพื่อใช้ในการเปลี่ยนหน้า

    // ฟังก์ชันสำหรับนำทางกลับไปยังหน้า Homepage (เมื่อคลิกที่ปุ่มย้อนกลับ)
    const gotoHomepage = () => {
        navigate('/Homepage');
    };

    const gotoAssignPJ = () => {
        navigate('/AssignPJ');
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <header className="shadow">
                <NavbarMentor />
            </header>

            {/* เนื้อหาหลักของหน้าเว็บ */}
            <main className="flex-grow p-8">

                {/* ปุ่มย้อนกลับไปหน้า Homepage */}
                <div className='flex justify-end mr-6 ' onClick={gotoHomepage} >
                    <img src="/src/img/img_icon/left-arrow.png" className="w-7 cursor-pointer " alt="Back" />
                </div>
                <div className="flex justify-between items-center mb-7">
                    <div className="flex items-center">
                        <img src="/src/img/img_icon/project.png" alt="Project" className="h-36 w-30 ml-7 " />
                        <h2 className="text-6xl ml-6 text-[#5C5A5A] mb-3">Project</h2> {/* หัวข้อของส่วนโปรเจค */}
                    </div>

                    {/* ปุ่มสำหรับเพิ่มโปรเจคใหม่ */}
                    <button className="flex items-center space-x-3 text-3xl text-black px-4 py-2 mt-2">
                        <span>Add Project</span>
                        <img src="/src/img/img_icon/plus.png" alt="Add Project" className="w-9 " />
                    </button>
                </div>

                {/* ตารางแสดงโปรเจค */}
                <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead>
                        <tr className='linetable'>
                            {/* หัวข้อคอลัมน์ต่างๆ ในตาราง */}
                            <th className="text-center p-4 text-[25px]">ลำดับ</th>
                            <th className="text-center p-4 text-[25px]">วันที่เริ่ม</th>
                            <th className="text-center p-4 text-[25px]">กำหนดส่ง</th>
                            <th className="text-center p-4 text-[25px]">ชื่อโปรเจค</th>
                            <th className="text-center p-4 text-[25px]">ผู้ดูแล</th>
                            <th className="text-center p-4 text-[25px]">สถานะ</th>
                            <th className="text-center p-4 text-[25px]">แผนงาน</th>
                            <th className="text-center p-4 text-[25px]">แผนกของผู้รับผิดชอบ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* แถวแสดงข้อมูลโปรเจคที่ 1 */}
                            <td className="text-center p-4 text-[20px]">1</td> {/* ลำดับโปรเจค */}
                            <td className="text-center p-4 text-[20px]">01/01/2024</td> {/* วันที่เริ่มโปรเจค */}
                            <td className="text-center p-4 text-[20px]">31/03/2024</td> {/* กำหนดส่งโปรเจค */}
                            <td className="text-center p-4 text-[20px]">KM Selg-Learning</td> {/* ชื่อโปรเจค */}
                            <td className="text-center p-4 text-[20px]">สุพรรษา มูลศิริ</td> {/* ผู้ดูแลโปรเจค */}
                            <td className="text-center p-4 text-[20px]">
                                <span className="bg-[#4CAF50] text-white px-3 py-1 rounded-full">กำลังดำเนินการ</span> {/* สถานะโปรเจค */}
                            </td>
                            <td className="text-center p-4 text-[20px]">...</td> {/* แผนงาน */}
                            <td className="text-center p-4 flex justify-center items-center cursor-pointer">
                                <img src="/src/img/img_icon/assigned.png" alt="Department" className="h-10 w-10" onClick={gotoAssignPJ}/> 
                            </td>
                        </tr>
                        <tr>
                            {/* แถวแสดงข้อมูลโปรเจคที่ 2 */}
                            <td className="text-center p-4 text-[20px]">2</td> {/* ลำดับโปรเจค */}
                            <td className="text-center p-4 text-[20px]">01/01/2024</td> {/* วันที่เริ่มโปรเจค */}
                            <td className="text-center p-4 text-[20px]">31/03/2024</td> {/* กำหนดส่งโปรเจค */}
                            <td className="text-center p-4 text-[20px]">OT</td> {/* ชื่อโปรเจค */}
                            <td className="text-center p-4 text-[20px]">สุพรรษา มูลศิริ</td> {/* ผู้ดูแลโปรเจค */}
                            <td className="text-center p-4 text-[20px]">
                                <span className="bg-[#4CAF50] text-white px-3 py-1 rounded-full">กำลังดำเนินการ</span> {/* สถานะโปรเจค */}
                            </td>
                            <td className="text-center p-4 text-[20px]">...</td> {/* แผนงาน */}
                            <td className="text-center p-4 flex justify-center items-center cursor-pointer">
                                <img src="/src/img/img_icon/assigned.png" alt="Department" className="h-10 w-10" onClick={gotoAssignPJ}/> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>
            <Footer /> {/* แสดง Footer ของหน้าเว็บ */}
        </div>
    );
};


export default Project;
