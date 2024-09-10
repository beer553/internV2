import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import NavbarIntern from '../component/navbar_intern';
import Footer from '../component/footer';

function WorkFromHome() {
    const navigate = useNavigate();
    const [isOtherChecked, setIsOtherChecked] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        prefix: "",
        firstName: "",
        lastName: "",
        nickname: "",
        studentID: "",
        leaveType: "",
        setdate: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        email: "",
        reason: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === "leaveType" && value === "อื่นๆ") {
            setIsOtherChecked(true);
        } else if (name === "leaveType") {
            setIsOtherChecked(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                newErrors[key] = "กรุณากรอกข้อมูลให้ครบถ้วน";
            }
        });
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            // ส่งข้อมูลหรือดำเนินการตามที่ต้องการเมื่อกรอกครบถ้วน
            console.log("Form submitted successfully!");
        }
    };

    return (
        <div>
            <header>
                <NavbarIntern />
            </header>
            <div className="p-6 text-black text-left">
                <h2 className="text-[45px] text-left ml-10 font-extrabold mb-6">แจ้งลา / Work From Home</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
                        <div className="flex-1">
                            <label className="block mb-2 text-[26px]">คำนำหน้าชื่อ</label>
                            <select
                                name="prefix"
                                value={formData.prefix}
                                onChange={handleChange}
                                className={`w-full h-[50px] p-2 border ${errors.prefix ? 'border-red-500' : 'border-gray-300'} rounded bg-white text-[20px]`}>
                                <option value="" disabled hidden>เลือกคำนำหน้า</option>
                                <option value="นาย">นาย</option>
                                <option value="นาง">นาง</option>
                                <option value="นางสาว">นางสาว</option>
                            </select>
                            {errors.prefix && <p className="text-red-500 text-sm">{errors.prefix}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2 text-[26px]">ชื่อ</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`w-full p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded bg-white text-[20px]`}
                                placeholder="โปรดระบุ" />
                            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2 text-[26px]">นามสกุล</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`w-full p-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded bg-white text-[20px]`}
                                placeholder="โปรดระบุ" />
                            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2 text-[26px]">ชื่อเล่น</label>
                            <input
                                type="text"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleChange}
                                className={`w-full p-2 border ${errors.nickname ? 'border-red-500' : 'border-gray-300'} rounded bg-white text-[20px]`}
                                placeholder="โปรดระบุ" />
                            {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2 text-[26px]">เลขประจำตัวนักศึกษา</label>
                            <input
                                type="text"
                                name="studentID"
                                value={formData.studentID}
                                onChange={handleChange}
                                className={`w-full p-2 border ${errors.studentID ? 'border-red-500' : 'border-gray-300'} rounded bg-white text-[20px]`}
                                placeholder="โปรดระบุ" />
                            {errors.studentID && <p className="text-red-500 text-sm">{errors.studentID}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
                        <div className="flex-1">
                            <label className="block mb-2 text-[26px]">ประเภทการลา / WFH</label>
                            <div className="flex items-center flex-wrap">
                                <label className="flex items-center text-[20px] mr-4">
                                    <input
                                        type="checkbox"
                                        name="leaveType"
                                        value="ลากิจ"
                                        checked={formData.leaveType === "ลากิจ"}
                                        onChange={handleChange}
                                        className="mr-2"
                                    /> ลากิจ
                                </label>
                                <label className="flex items-center text-[20px] mr-4">
                                    <input
                                        type="checkbox"
                                        name="leaveType"
                                        value="ลาป่วย"
                                        checked={formData.leaveType === "ลาป่วย"}
                                        onChange={handleChange}
                                        className="mr-2"
                                    /> ลาป่วย
                                </label>
                                <label className="flex items-center text-[20px] mr-4">
                                    <input
                                        type="checkbox"
                                        name="leaveType"
                                        value="WFH"
                                        checked={formData.leaveType === "WFH"}
                                        onChange={handleChange}
                                        className="mr-2"
                                    /> WFH
                                </label>
                                <label className="flex items-center text-[20px] mr-4">
                                    <input
                                        type="checkbox"
                                        name="leaveType"
                                        value="อื่นๆ"
                                        checked={formData.leaveType === "อื่นๆ"}
                                        onChange={handleChange}
                                        className="mr-2"
                                    /> อื่นๆ ระบุ
                                </label>
                                {isOtherChecked && (
                                    <div className="w-full mt-2">
                                        <input
                                            type="text"
                                            name="leaveTypeDetail"
                                            value={formData.leaveTypeDetail}
                                            onChange={handleChange}
                                            className={`w-[95%] p-2 border ${errors.leaveTypeDetail ? 'border-red-500' : 'border-gray-300'} rounded bg-white text-[25px]`}
                                            placeholder="โปรดระบุ" />
                                    </div>
                                )}
                            </div>
                            {errors.leaveType && <p className="text-red-500 text-sm">{errors.leaveType}</p>}
                        </div>

                        <div className="flex-1">
                            <label className="block mb-2 text-[26px]">กำหนดวันลากี่วัน</label>
                            <input
                                type="number"
                                name="setdate"
                                value={formData.setdate}
                                onChange={handleChange}
                                className={`w-full p-2 border ${errors.setdate ? 'border-red-500' : 'border-gray-300'} rounded bg-white text-[20px]`}
                                min="1"
                                placeholder="ระบุจำนวนวัน"
                            />
                            {errors.setdate && <p className="text-red-500 text-sm">{errors.setdate}</p>}
                        </div>

                        <div className="flex-1">
                            <label className="block mb-2 text-[26px] ">ลงวันที่เริ่มต้น</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className={`w-full p-2 border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded bg-white text-[20px]`} />
                            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2 text-[26px]">ลงวันที่สิ้นสุด</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className={`w-full p-2 border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} rounded bg-white text-[20px]`} />
                            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        <div className="mb-6">
                            <label className="block mb-2 text-[26px]">ระบุเวลา</label>
                            <ul className="mb-2 text-[20px] list-disc ml-5">
                                <li>กรณีลาไม่เต็มวัน ให้ระบุเป็นจำนวนชั่วโมง Ex.รูปแบบเวลา 07.30-10.00 น.</li>
                                <li>กรณีลาเต็มวัน ให้ระบุเวลาเต็มวัน Ex.รูปแบบเวลา 07.30-16.30 น.</li>
                                <li>WFH ให้ลงเวลาทำงาน Ex.รูปแบบเวลา 07.30-16.30 น.</li>
                            </ul>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    className={`w-[40%] p-2 border ${errors.startTime ? 'border-red-500' : 'border-gray-300'} rounded bg-white text-[25px]`}
                                    placeholder="เวลาเริ่มต้น" />
                                <span className="text-[25px]">-</span>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    className={`w-[40%] p-2 border ${errors.endTime ? 'border-red-500' : 'border-gray-300'} rounded bg-white text-[25px]`}
                                    placeholder="เวลาสิ้นสุด" />
                            </div>
                            {errors.startTime && <p className="text-red-500 text-sm">กรุณาระบุเวลาเริ่มต้นและเวลาสิ้นสุด</p>}
                        </div>


                        <div className="mb-6">
                            <label className="block mb-2 text-[26px]">
                                โปรดเลือก E-mail ผู้แจ้งถึงพี่บัญชา/พี่เลี้ยง เพื่อแจ้งให้รับทราบรายชื่อผู้ปกป้องบัญชา/พี่เลี้ยง
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded bg-white text-[20px]`}
                                placeholder="Test@gmail.com" />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-[26px]">การลาให้ระบุเหตุผล / WFH ให้ระบุเป็นงานที่ทำ</label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                className={`w-full p-2 border ${errors.reason ? 'border-red-500' : 'border-gray-300'} rounded bg-white text-[20px] resize-none overflow-auto`}
                                placeholder="โปรดระบุ"
                                rows="4"></textarea>
                            {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
                        </div>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="w-[8%] py-0.5 bg-green-500 text-white text-[20px] font-bold rounded-[8px] hover:bg-green-600">ยืนยัน</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default WorkFromHome;
