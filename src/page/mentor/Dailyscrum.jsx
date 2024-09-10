import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarMentor from '../component/navbar_mentor';
import Footer from '../component/footer';

function Dailyscrum() {
    const navigate = useNavigate(); // ใช้สำหรับนำทางไปยังหน้าต่างๆ ภายในแอปพลิเคชัน

    // ฟังก์ชันสำหรับนำทางกลับไปยังหน้า Homepage (เมื่อคลิกที่ปุ่มย้อนกลับ)
    const gotoHomepage = () => {
        navigate('/Homepage');
    };

    // ฟังก์ชันสำหรับนำทางไปยังหน้า BLProject (เมื่อคลิกที่ไอคอน Backlog)
    const gotoBLProject = () => {
        navigate('/BLProject');
    };

    // ฟังก์ชันสำหรับยืนยัน
    const handleConfirm = () => {
        // เพิ่มการทำงานตามที่คุณต้องการเมื่อคลิกปุ่มยืนยัน
        console.log("Confirmed!");
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <NavbarMentor />
            </header>
            <div className="flex justify-end mt-5 mb-5 px-20">
                {/* ปุ่มย้อนกลับไปยังหน้า Homepage โดยใช้ไอคอนลูกศร */}
                <img src="/src/img/img_icon/left-arrow.png" className="w-7 cursor-pointer" alt="Back" onClick={gotoHomepage} />
            </div>

            {/* ส่วนของตารางข้อมูลผู้ใช้และ Task */}
            <div className="flex justify-center">
                <div className="bg-gray-100 p-5 w-[90%] rounded-lg shadow-md grid grid-cols-7 gap-3">
                    {/* หัวตาราง */}
                    <div className="flex items-center justify-center text-center text-black text-[20px]">ลำดับ</div>
                    <div className="flex items-center justify-center text-center text-black text-[20px]">ชื่อ นามสกุล ID</div>
                    <div className="flex items-center justify-center text-center text-black text-[20px]">ตำแหน่งที่สมัคร</div>
                    <div className="flex items-center justify-center text-center text-black text-[20px]">Status</div>
                    <div className="flex items-center justify-center text-center text-black text-[20px]">ช่วงเวลาฝึก</div>
                    <div className="flex items-center justify-center text-center text-black text-[20px]">โปรเจคที่ได้รับมอบหมาย</div>
                    <div className="flex items-center justify-center text-center text-black text-[20px]">Backlog</div>

                    {/* แถวที่แสดงข้อมูลผู้ใช้ */}
                    <div className="flex items-center justify-center text-center text-[18px]">1</div>
                    <div className="flex items-center justify-center text-center">
                        <div className="flex items-center space-x-2">
                            {/* ไอคอนรูปภาพผู้ใช้ */}
                            <img src="/src/img/profile-phurin.jpg" alt="User" className="w-9 h-9 rounded-full" />
                            <div>
                                {/* ชื่อและรหัสผู้ใช้ */}
                                <div className='text-[18px]'>Phurin Chairoek</div>
                                <div className="text-[16px] text-gray-500">0001-123005</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center text-center text-[18px]">Full stack</div>
                    <div className="flex items-center justify-center text-center text-[18px]">กำลังฝึกงาน</div>
                    <div className="flex items-center justify-center text-center text-[18px]">01/01/2564 - 31/12/2564</div>
                    <div className="flex items-center justify-center text-center text-[18px]">OT Dashboard</div>
                    <div className="flex items-center justify-center text-center text-[18px]">
                        {/* ไอคอน Backlog สำหรับนำทางไปยังหน้า BLProject */}
                        <img src="/src/img/img_icon/backlog-white.png" alt="Backlog" className="w-8 h-8 cursor-pointer" onClick={gotoBLProject} />
                    </div>
                </div>
            </div>

            {/* ส่วนแสดง Task และตารางงาน */}
            <div className="container mx-auto mt-10 flex justify-center w-[90%]">
                <div className="grid grid-cols-5 gap-12">
                    {/* หัวข้อของแต่ละคอลัมน์ในตาราง */}
                    <div></div>
                    <div className="text-center font-bold text-[20px] text-black">
                        Doing <br />(เมื่อวานได้ตามเป้ามั๊ย/รายละเอียดที่ทำ)
                    </div>
                    <div className="text-center font-bold text-[20px] text-black">
                        Done <br />(เหตุผลที่เสร็จ-ไม่เสร็จ /จุดเรียนรู้)
                    </div>
                    <div className="text-center font-bold text-[20px] text-black">
                        Need Support <br />(ต้องการความช่วยเหลือ)
                    </div>
                    <div className="text-center font-bold text-[20px] text-black">
                        To do <br />(วันนี้ทำอะไร)
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-6 flex justify-center text-[20px] text-[black]">
                <div className="grid grid-cols-5 gap-5 w-[90%]">
                    {/* คอลัมน์แสดงวันที่และปุ่มแสดงอารมณ์ */}
                    <div className="space-y-4">
                        <div className="text-center border rounded-[16px] h-[282px] w-[240px] border-[black]">
                            <div className='mt-[120px]'>01/12/2023</div>
                        </div>
                        <div className="text-center border rounded-[16px] h-[282px] w-[240px] border-[#1679AB]">
                            <div className='mt-[120px]'>01/12/2023</div>
                        </div>
                        <div className="text-center border rounded-[16px] h-[165px] w-[240px] bg-[#9DC284]"></div>
                        <div className="text-center border rounded-[16px] h-[165px] w-[240px] bg-[#FFA63E]"></div>
                        <div className="text-center border rounded-[16px] h-[165px] w-[240px] bg-[#ED2324]"></div>
                    </div>

                    {/* คอลัมน์แสดง Task ที่ทำ (Doing) แถวที่1 แนวตั้ง*/}
                    <div className="space-y-4">
                        <div className="border rounded-[16px] p-4 h-[165px] border-[black]"></div>
                        <div className="border rounded-[16px] p-4 h-[100px] border-[red]"></div>
                        <div className="border rounded-[16px] p-4 h-[165px] border-[#1679AB]">
                            <div className="flex items-center justify-between mb-1">
                                <span>1. Dev Frontend 3 หน้า</span>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                                <span>2. ออกแบบหน้า Frontend</span>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                                <span>3. ส่งงานหน้า Frontend</span>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                                <span>4. อื่นๆ</span>
                            </div>
                        </div>
                        <div className="border rounded-[16px] p-4 h-[100px] border-[red]"></div>
                        <div className="border rounded-[16px] p-2 h-[165px] bg-[#9DC284] text-[90px] text-[white]">วันหยุด</div>
                        <div className="border rounded-[16px] p-2 h-[165px] bg-[#FFA63E] text-[90px] text-[white]">ลา</div>
                        <div className="border rounded-[16px] p-2 h-[165px] bg-[#ED2324] text-[90px] text-[white]">ขาด</div>
                    </div>

                    {/* คอลัมน์แสดง Task ที่เสร็จ (Done) แถวที่2 แนวตั้ง*/}
                    <div className="space-y-4">
                        <div className="border rounded-[16px] p-4 h-[165px] border-[black]"></div>
                        <div className="border rounded-[16px] p-4 h-[100px] border-[red]"></div>
                        <div className="border rounded-[16px] p-4 h-[165px] border-[#1679AB]">
                            <div className="flex items-center justify-between mb-1">
                                <span>1. ใช้ Chat GPT</span>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                                <span>2. ให้เพื่อนช่วย</span>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                                <span>3. ศึกษาจาก Youtube</span>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                                <span>4. อื่นๆ</span>
                            </div>
                        </div>
                        <div className="border rounded-[16px] p-4 h-[100px] border-[red]"></div>
                        <div className="border rounded-[16px] p-2 h-[165px] bg-[#9DC284] text-[90px] text-[white]">วันหยุด</div>
                        <div className="border rounded-[16px] p-2 h-[165px] bg-[#FFA63E] text-[90px] text-[white]">ลา</div>
                        <div className="border rounded-[16px] p-2 h-[165px] bg-[#ED2324] text-[90px] text-[white]">ขาด</div>
                    </div>

                    {/* คอลัมน์แสดง Task ที่ต้องการความช่วยเหลือ (Need Support) แถวที่3 แนวตั้ง*/}
                    <div className="space-y-4">
                        <div className="border rounded-[16px] p-4 h-[165px] border-[black]"></div>
                        <div className="border rounded-[16px] p-4 h-[100px] border-[red]"></div>
                        <div className="border rounded-[16px] p-4 h-[165px] border-[#1679AB]">
                            <div className="flex items-center justify-between mb-1">
                                <span>ไม่มีครับ</span>
                            </div>
                        </div>
                        <div className="border rounded-[16px] p-4 h-[100px] border-[red]"></div>
                        <div className="border rounded-[16px] p-2 h-[165px] bg-[#9DC284] text-[90px] text-[white]">วันหยุด</div>
                        <div className="border rounded-[16px] p-2 h-[165px] bg-[#FFA63E] text-[90px] text-[white]">ลา</div>
                        <div className="border rounded-[16px] p-2 h-[165px] bg-[#ED2324] text-[90px] text-[white]">ขาด</div>
                    </div>

                    {/* คอลัมน์แสดง Task ที่จะทำวันนี้ (To do) แถวที่4 แนวตั้ง*/}
                    <div className="space-y-4">
                        <div className="border rounded-[16px] p-2 h-[165px] border-[black]">
                            <div className="w-full border rounded-[16px] mt-3 bg-white border-[black]">
                                <span>1. Dev Frontend 3 หน้า</span>
                            </div>
                            <div className="w-full border rounded-[16px] mt-3 bg-white border-[black]">
                                <span>2. ออกแบบหน้า Frontend</span>
                            </div>
                            <div className="w-full border rounded-[16px] mt-3 bg-white border-[black]">
                                <span>3. ส่งงานหน้า Frontend </span>
                            </div>
                        </div>
                        <div className="border rounded-[16px] p-4 h-[100px] border-[red]"></div>
                        <div className="border rounded-[16px] p-2 h-[165px] border-[#1679AB]"></div>
                        <div className="border rounded-[16px] p-4 h-[100px] border-[red]"></div>
                        <div className="border rounded-[16px] p-2 h-[165px] bg-[#9DC284] text-[90px] text-[white]">วันหยุด</div>
                        <div className="border rounded-[16px] p-2 h-[165px] bg-[#FFA63E] text-[90px] text-[white]">ลา</div>
                        <div className="border rounded-[16px] p-2 h-[165px] bg-[#ED2324] text-[90px] text-[white]">ขาด</div>
                    </div>
                </div>
                {/* ปุ่มยืนยันที่มุมขวาล่าง */}
            </div>
            <div className="flex justify-end mr-[100px] mt-5 mb-5">
                <button onClick={handleConfirm} className="flex flex-col items-center">
                    <span className="text-black text-[20px]">บันทึก</span>
                    <div>
                        <img src="/src/img/img_icon/accept.png" alt="Confirm" className="w-10 h-10" />
                    </div>
                </button>
            </div>
            <Footer /> {/* เรียกใช้งาน Footer ซึ่งเป็นส่วนท้ายของหน้า */}
        </div>
    );
};

export default Dailyscrum;
