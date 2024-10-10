import React, { useState } from 'react';
import axios from 'axios';
import NavbarIntern from '../component/navbar_intern';
import Footer from '../component/footer';
import Swal from 'sweetalert2';

function input_data_intern() {
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nickname, setNickname] = useState('');
    const [titleEng, setTitleEng] = useState('');
    const [firstNameEng, setFirstNameEng] = useState('');
    const [lastNameEng, setLastNameEng] = useState('');
    const [nicknameEng, setNicknameEng] = useState('');
    const [internId, setInternId] = useState('');
    const [age, setAge] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [idCard, setIdCard] = useState('');
    const [nationality, setNationality] = useState('');
    const [religion, setReligion] = useState('');
    const [phone, setPhone] = useState('');
    const [lineId, setLineId] = useState('');
    const [email2, setEmail2] = useState('');
    const [email3, setEmail3] = useState('');
    const [gender, setGender] = useState('');
    const [mentor, setMentor] = useState('');
    const [address, setAddress] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [currentEducation, setCurrentEducation] = useState('');
    const [faculty, setFaculty] = useState('');
    const [major, setMajor] = useState('');
    const [educationLevel, setEducationLevel] = useState('');
    const [educationLevell, setEducationLevell] = useState('');
    const [gpa, setGpa] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [specialSkills, setSpecialSkills] = useState('');
    const [position, setPosition] = useState('');
    const [section, setSection] = useState('');
    const [goodjob, setGoodjob] = useState('');
    const [otherJob, setOtherJob] = useState('');
    const [program, setprogram] = useState([]);
    const [otherprogram, setOtherprogram] = useState('');
    const [datestart, setDatestart] = useState('');
    const [dateend, setDateend] = useState('');
    const [profile, setProfile] = useState(null);
    const [resume, setResume] = useState(null);
    const [transcript, setTranscript] = useState(null);
    const [otherFiles, setOtherFiles] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        // ตรวจสอบจำนวนการเลือกโปรแกรม
        if (program.length < 3 && !program.includes('Other')) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'กรุณาเลือกโปรแกรมที่ถนัดให้ครบ 3 ข้อ หรือเลือก "อื่นๆ"',
            });
            return; // ไม่อนุญาตให้บันทึกข้อมูล
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('nickname', nickname);
        formData.append('titleEng', titleEng);
        formData.append('firstNameEng', firstNameEng);
        formData.append('lastNameEng', lastNameEng);
        formData.append('nicknameEng', nicknameEng);
        formData.append('internid', internId);
        formData.append('age', age);
        formData.append('birthDate', birthDate);
        formData.append('idCard', idCard);
        formData.append('nationality', nationality);
        formData.append('religion', religion);
        formData.append('phone', phone);
        formData.append('lineId', lineId);
        formData.append('email2', email2);
        formData.append('email3', email3);
        formData.append('gender', gender);
        formData.append('mentor', mentor);
        formData.append('address', address);
        formData.append('currentAddress', currentAddress);
        formData.append('currentEducation', currentEducation);
        formData.append('faculty', faculty);
        formData.append('major', major);
        formData.append('educationLevel', educationLevel);
        formData.append('educationLevell', educationLevell);
        formData.append('gpa', gpa);
        formData.append('hobbies', hobbies);
        formData.append('specialSkills', specialSkills);
        formData.append('position', position);
        formData.append('section', section);
        formData.append('goodjob', goodjob);
        formData.append('otherJob', otherJob);
        formData.append('program', program.join(', '));
        formData.append('otherprogram', otherprogram);
        formData.append('datestart', datestart);
        formData.append('dateend', dateend);
        if (profile) formData.append('profile', profile);
        if (resume) formData.append('resume', resume);
        if (transcript) formData.append('transcript', transcript);
        if (otherFiles) formData.append('otherFiles', otherFiles);

        axios.post('http://localhost:8080/intern/insert_data_intern.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((response) => {
                console.log(response.data); // ตรวจสอบข้อมูลที่ได้รับ

                if (response.data && response.data.status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response.data.message || 'ข้อมูลบันทึกสำเร็จ!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/home'; // เปลี่ยนเส้นทางไปยังหน้า home
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.data.message || 'ข้อมูลบันทึกไม่สำเร็จ',
                    });
                }
            })
            .catch((error) => {
                console.error('เกิดข้อผิดพลาด!', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
                });
            });
    };

    const handleProgramChange = (event) => {
        const value = event.target.value;
        if (program.includes(value)) {
            setprogram(program.filter(item => item !== value));
        } else if (program.length < 3) {
            setprogram([...program, value]);
        }
    };

    const handleInternIdChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        if (value.length > 4) {
            value = value.slice(0, 4) + '-' + value.slice(4, 10); // Insert dash after 4th character
        }
        setInternId(value); // Update state
    };

    const handleAgeChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // ลบตัวอักษรที่ไม่ใช่ตัวเลข
        if (value.length > 2) {
            value = value.slice(0, 2); // จำกัดความยาวแค่ 2 ตัวอักษร
        }
        setAge(value); // อัปเดตค่าใน state
    };

    const handleIdCardChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // ลบตัวอักษรที่ไม่ใช่ตัวเลข
        if (value.length > 1) {
            value = value.slice(0, 1) + '-' + value.slice(1); // ขีดหลังตัวแรก
        }
        if (value.length > 6) {
            value = value.slice(0, 6) + '-' + value.slice(6); // ขีดหลังตัวที่ 5
        }
        if (value.length > 12) {
            value = value.slice(0, 12) + '-' + value.slice(12); // ขีดหลังตัวที่ 11
        }
        if (value.length > 15) {
            value = value.slice(0, 15) + '-' + value.slice(15, 16); // ขีดหลังตัวที่ 13
        }
        setIdCard(value.slice(0, 17)); // จำกัดความยาวที่ 17 ตัวอักษรรวมขีด
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // ลบตัวอักษรที่ไม่ใช่ตัวเลข
        if (value.length > 3) {
            value = value.slice(0, 3) + '-' + value.slice(3); // เพิ่มขีดหลังตัวที่ 3
        }
        if (value.length > 7) {
            value = value.slice(0, 7) + '-' + value.slice(7); // เพิ่มขีดหลังตัวที่ 6
        }
        setPhone(value.slice(0, 12)); // จำกัดความยาวไม่เกิน 12 ตัวอักษรรวมขีด
    };

    const [useSameAddress, setUseSameAddress] = useState(false);

    const handleAddressCopy = (e) => {
        if (e.target.checked) {
            setCurrentAddress(address); // คัดลอกที่อยู่ตามบัตรประชาชนไปยังที่อยู่ปัจจุบัน
            setUseSameAddress(true); // ปิดการแก้ไขที่อยู่ปัจจุบัน
        } else {
            setCurrentAddress(''); // ล้างฟิลด์ที่อยู่ปัจจุบันเมื่อยกเลิกการติ๊ก
            setUseSameAddress(false); // เปิดการแก้ไขฟิลด์ที่อยู่ปัจจุบัน
        }
    };

    const handleGpaChange = (e) => {
        let value = e.target.value;

        // ใช้ RegEx เพื่ออนุญาตเฉพาะตัวเลขและจุดทศนิยม สูงสุด 3 หลัก
        const regex = /^(?:\d{0,3}(?:\.\d{0,2})?)?$/; // อนุญาต 0-3 หลักและจุดทศนิยมสูงสุด 2 หลัก

        // ตรวจสอบว่า value ตรงตาม regex หรือไม่
        if (regex.test(value)) {
            setGpa(value); // อัปเดตค่าใน state ถ้าเป็นไปตามเงื่อนไข
        }
    };

    return (
        <>
            <NavbarIntern />
            <div className="max-w-[95%] mx-auto mt-8 p-3 bg-black shadow-lg rounded-lg text-left " style={{ fontSize: '30px' }}>
                <h3 className='ml-5 font-bold text-white'>
                    กรอกข้อมูลส่วนตัว
                </h3>
            </div>
            <div className="max-w-[95%] mx-auto mb-5 mt-5 p-8 bg-white shadow-lg rounded-lg">
                <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6" style={{ gridRowGap: '20px' }}>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">คำนำหน้าชื่อ<span style={{ color: 'red' }}>*</span></label>
                            <select className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" style={{ height: '46px' }} value={title} onChange={(e) => setTitle(e.target.value)} required>
                                <option value=""disabled hidden>เลือกคำนำหน้าชื่อ</option>
                                <option value="นาย">นาย</option>
                                <option value="นาง">นาง</option>
                                <option value="นางสาว">นางสาว</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">ชื่อ<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="ชื่อจริง" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">นามสกุล<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="นามสกุล" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">ชื่อเล่น<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="ชื่อเล่น" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Prefix<span style={{ color: 'red' }}>*</span></label>
                            <select className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" style={{ height: '46px' }} value={titleEng} onChange={(e) => setTitleEng(e.target.value)} required>
                                <option value=""disabled hidden>Select Prefix</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Miss</option>
                                {/* <option value="Ms.">Mrs.</option> */}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Name<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={firstNameEng} onChange={(e) => setFirstNameEng(e.target.value)} placeholder="First Name" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Last Name<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={lastNameEng} onChange={(e) => setLastNameEng(e.target.value)} placeholder="Last Name" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Nickname<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={nicknameEng} onChange={(e) => setNicknameEng(e.target.value)} placeholder="Nickname" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">
                                รหัสนักศึกษาฝึกงาน
                                <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                                type="text"
                                value={internId}
                                onChange={(e) => handleInternIdChange(e)}
                                placeholder="โปรดระบุ"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">
                                อายุ<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                                type="text"
                                value={age}
                                onChange={(e) => handleAgeChange(e)}
                                placeholder="โปรดระบุ"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">วันเกิด<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="date" style={{ height: '46px' }} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">
                                เลขบัตรประชาชน<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                                type="text"
                                value={idCard}
                                onChange={(e) => handleIdCardChange(e)}
                                placeholder="โปรดระบุ"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">สัญชาติ<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">ศาสนา<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={religion} onChange={(e) => setReligion(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">
                                เบอร์โทรศัพท์<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                                type="text"
                                value={phone}
                                onChange={(e) => handlePhoneChange(e)}
                                placeholder="โปรดระบุ"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">ID Line<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={lineId} onChange={(e) => setLineId(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">
                                Email (สำหรับสื่อสารโครงการ)<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                                type="email"
                                value={email2}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // ตรวจสอบว่าเป็นภาษาไทย
                                    const thaiRegex = /[\u0E00-\u0E7F]/; // รหัส Unicode สำหรับภาษาไทย
                                    if (thaiRegex.test(value)) {
                                        alert("คุณต้องเปลี่ยนภาษา เป็นภาษาอังกฤษ");
                                        return; // ไม่อัปเดตค่า
                                    }

                                    // ตรวจสอบว่าเป็นตัวเลข, ตัวอักษรภาษาอังกฤษ, หรือมีเครื่องหมาย @
                                    const regex = /^[a-zA-Z0-9@.]*$/;
                                    if (regex.test(value) || value === "") {
                                        setEmail2(value);
                                    }
                                }}
                                placeholder="โปรดระบุ"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">
                                Email (ใช้สำหรับ Microsoft Teams)<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                                type="email"
                                value={email3}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // ตรวจสอบว่าเป็นภาษาไทย
                                    const thaiRegex = /[\u0E00-\u0E7F]/; // รหัส Unicode สำหรับภาษาไทย
                                    if (thaiRegex.test(value)) {
                                        alert("คุณต้องเปลี่ยนภาษา เป็นภาษาอังกฤษ");
                                        return; // ไม่อัปเดตค่า
                                    }

                                    // ตรวจสอบว่าเป็นตัวเลข, ตัวอักษรภาษาอังกฤษ, หรือมีเครื่องหมาย @
                                    const regex = /^[a-zA-Z0-9@.]*$/;
                                    if (regex.test(value) || value === "") {
                                        setEmail3(value);
                                    }
                                }}
                                placeholder="โปรดระบุ"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">เพศ<span style={{ color: 'red' }}>*</span></label>
                            <select className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" style={{ height: '46px' }} value={gender} onChange={(e) => setGender(e.target.value)} required>
                                <option value=""disabled hidden>เลือกเพศ</option>
                                <option value="ชาย">ชาย</option>
                                <option value="หญิง">หญิง</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">พี่เลี้ยง<span style={{ color: 'red' }}>*</span></label>
                            <select className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" style={{ height: '46px' }} value={mentor} onChange={(e) => setMentor(e.target.value)} required>
                                <option value=""disabled hidden>เลือกพี่เลี้ยง</option>
                                <option value="สุพรรษา มูลศิริ">สุพรรษา มูลศิริ</option>
                                <option value="เอกพงษ์ มีสุข">เอกพงษ์ มีสุข</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">
                                ที่อยู่ตามบัตรประชาชน<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="โปรดระบุ"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">
                                ที่อยู่ปัจจุบัน<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                                type="text"
                                value={currentAddress}
                                onChange={(e) => setCurrentAddress(e.target.value)}
                                placeholder="โปรดระบุ"
                                required
                                disabled={useSameAddress} // ปิดการแก้ไขเมื่อใช้ที่อยู่ตามบัตรประชาชน
                            />
                            <div className="mt-2">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        onChange={(e) => handleAddressCopy(e)}
                                    />
                                    <span className="ml-2 text-gray-700">ใช้ที่อยู่ตามบัตรประชาชน</span>
                                </label>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">สถานศึกษาปัจจุบัน<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={currentEducation} onChange={(e) => setCurrentEducation(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">คณะ<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={faculty} onChange={(e) => setFaculty(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">สาขา<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">
                                วุฒิการศึกษา<span style={{ color: 'red' }}>*</span>
                            </label>
                            <select
                                className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                                value={educationLevel}
                                onChange={(e) => setEducationLevel(e.target.value)}
                                required
                            >
                                <option value="" disabled hidden>โปรดเลือก</option> {/* แสดงเฉพาะคำนี้เมื่อยังไม่เลือก */}
                                <option value="ประกาศนียบัตรวิชาชีพ">ประกาศนียบัตรวิชาชีพ</option>
                                <option value="ประกาศนียบัตรวิชาชีพชั้นสูง">ประกาศนียบัตรวิชาชีพชั้นสูง</option>
                                <option value="ปริญญาตรี">ปริญญาตรี</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">ระดับการศึกษา<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={educationLevell} onChange={(e) => setEducationLevell(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">
                                เกรดเฉลี่ยรวม<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                                type="text"
                                value={gpa}
                                onChange={handleGpaChange}
                                placeholder="โปรดระบุ"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">งานอดิเรก<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={hobbies} onChange={(e) => setHobbies(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">ความสามารถพิเศษ<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={specialSkills} onChange={(e) => setSpecialSkills(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div >
                            <label className="block text-xl font-medium text-gray-700">ตำแหน่งที่สมัคร<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">หน่วยงานที่ฝึก<span style={{ color: 'red' }}>*</span></label>
                            <select className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" style={{ height: '46px' }} value={section} onChange={(e) => setSection(e.target.value)} required>
                                <option value=""disabled hidden>เลือกหน่วยงาน</option>
                                <option value="Digital Transformation">Digital Transformation</option>
                            </select>
                        </div>
                        <div className="col-span-4">
                            <label className="block text-xl font-medium text-gray-700 mb-3">โปรดเลือกสายงานที่ถนัดที่สุด<span style={{ color: 'red' }}>*</span></label>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-radio"
                                        value="Frontend"
                                        checked={goodjob === 'Frontend'}
                                        onChange={() => setGoodjob('Frontend')}
                                    />
                                    <span className="ml-2 text-xl">Frontend</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-radio"
                                        value="Backend"
                                        checked={goodjob === 'Backend'}
                                        onChange={() => setGoodjob('Backend')}
                                    />
                                    <span className="ml-2 text-xl">Backend</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-radio"
                                        value="Data Analysis"
                                        checked={goodjob === 'Data Analysis'}
                                        onChange={() => setGoodjob('Data Analysis')}
                                    />
                                    <span className="ml-2 text-xl">Data Analysis</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-radio"
                                        value="Data Management"
                                        checked={goodjob === 'Data Management'}
                                        onChange={() => setGoodjob('Data Management')}
                                    />
                                    <span className="ml-2 text-xl">Data Management</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-radio"
                                        value="Full stack"
                                        checked={goodjob === 'Full stack'}
                                        onChange={() => setGoodjob('Full stack')}
                                    />
                                    <span className="ml-2 text-xl">Full stack</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-radio"
                                        value="Other"
                                        checked={goodjob === 'Other'}
                                        onChange={(e) => {
                                            setGoodjob('Other');
                                            setOtherJob('');
                                        }}
                                    />
                                    <span className="ml-2 text-xl">อื่นๆ</span>
                                </label>
                                {goodjob === 'Other' && (
                                    <input
                                        className=" block w-full p-2 border  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                                        type="text"
                                        value={otherJob}
                                        onChange={(e) => setOtherJob(e.target.value)}
                                        placeholder="โปรดระบุ"
                                        required
                                    />
                                )}
                            </div>
                        </div>
                        <div className="col-span-4">
                            <label className="block text-xl font-medium text-gray-700 mb-3">โปรแกรมหรืองานที่ถนัด (เลือก 3 ข้อ)<span style={{ color: 'red' }}>*</span></label>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        value="Figma"
                                        checked={program.includes('Figma')}
                                        onChange={handleProgramChange}
                                    />
                                    <span className="ml-2 text-xl">Figma</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        value="React"
                                        checked={program.includes('React')}
                                        onChange={handleProgramChange}
                                    />
                                    <span className="ml-2 text-xl">React</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        value="PHP"
                                        checked={program.includes('PHP')}
                                        onChange={handleProgramChange}
                                    />
                                    <span className="ml-2 text-xl">PHP</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        value="VS code"
                                        checked={program.includes('VS code')}
                                        onChange={handleProgramChange}
                                    />
                                    <span className="ml-2 text-xl">VS Code</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        value="SQL Server"
                                        checked={program.includes('SQL Server')}
                                        onChange={handleProgramChange}
                                    />
                                    <span className="ml-2 text-xl">SQL Server</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        value="Docker"
                                        checked={program.includes('Docker')}
                                        onChange={handleProgramChange}
                                    />
                                    <span className="ml-2 text-xl">Docker</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        value="Other"
                                        checked={program.includes('Other')}
                                        onChange={handleProgramChange}
                                    />
                                    <span className="ml-2 text-xl">อื่นๆ</span>
                                </label>
                                {program.includes('Other') && (
                                    <input
                                        className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                                        type="text"
                                        value={otherprogram}
                                        onChange={(e) => setOtherprogram(e.target.value)}
                                        placeholder="โปรดระบุ"
                                        required
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">วัน/เดือน/ปี ที่เริ่มฝึกงาน<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="date" value={datestart} onChange={(e) => setDatestart(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">วัน/เดือน/ปี ที่ฝึกงานวันสุดท้าย<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="date" value={dateend} onChange={(e) => setDateend(e.target.value)} required />
                        </div>
                        <div className="col-span-4">
                            <label className="block text-xl font-medium text-gray-700 mb-2">แนบไฟล์ใหม่ (เฉพาะ pdf)</label>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-xl font-medium text-gray-700">Resume<span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        className="file-input file-input-bordered w-full max-w-xs"
                                        type="file"
                                        accept=".pdf" // จำกัดการเลือกไฟล์เป็นไฟล์ PDF
                                        onChange={(e) => setResume(e.target.files[0])}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xl font-medium text-gray-700">Transcript<span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        className="file-input file-input-bordered w-full max-w-xs"
                                        type="file"
                                        accept=".pdf" // จำกัดการเลือกไฟล์เป็นไฟล์ PDF
                                        onChange={(e) => setTranscript(e.target.files[0])}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xl font-medium text-gray-700">ผลงานอื่น ๆ (ถ้ามี)</label>
                                    <input
                                        className="file-input file-input-bordered w-full max-w-xs"
                                        type="file"
                                        onChange={(e) => setOtherFiles(e.target.files[0])}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xl font-medium text-gray-700">ภาพโปรไฟล์<span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        className="file-input file-input-bordered w-full max-w-xs col-span-4"
                                        type="file"
                                        accept=".jpg, .jpeg, .png" // จำกัดการเลือกไฟล์เป็น JPG และ PNG
                                        onChange={(e) => setProfile(e.target.files[0])}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {profile && (
                            <div className="mt-4 col-span-4">
                                <p className="text-xl font-medium text-gray-700">ตัวอย่างรูปภาพ</p>
                                <img src={URL.createObjectURL(profile)} alt="Preview" className="mt-2 rounded-md shadow-md" style={{ maxWidth: '150px', maxHeight: '250px', }} />
                            </div>
                        )}
                        <button className="mt-8 col-span-4  text-white py-1 px-4 rounded-md shadow-sm " type="submit" style={{ backgroundColor: 'rgb(104, 172, 1)', height: '50px' }}>
                            บันทึกข้อมูล
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default input_data_intern;