import React, { useState } from 'react';
import axios from 'axios';
import NavbarIntern from '../component/navbar_intern';
import Footer from '../component/footer';

function input_data_intern() {
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nickname, setNickname] = useState('');
    const [titleEng, setTitleEng] = useState('');
    const [firstNameEng, setFirstNameEng] = useState('');
    const [lastNameEng, setLastNameEng] = useState('');
    const [nicknameEng, setNicknameEng] = useState('');
    const [age, setAge] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [idCard, setIdCard] = useState('');
    const [nationality, setNationality] = useState('');
    const [religion, setReligion] = useState('');
    const [phone, setPhone] = useState('');
    const [facebook, setFacebook] = useState('');
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
            alert('กรุณาเลือกโปรแกรมที่ถนัดให้ครบ 3 ข้อ หรือเลือก "อื่นๆ"');
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
        formData.append('age', age);
        formData.append('birthDate', birthDate);
        formData.append('idCard', idCard);
        formData.append('nationality', nationality);
        formData.append('religion', religion);
        formData.append('phone', phone);
        formData.append('facebook', facebook);
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
    
        axios.post('http://localhost/internV2/backend/intern/insert_data_intern.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then((response) => {
            if (response.data && response.data.status === 'success') {
                alert(response.data.message || 'ข้อมูลบันทึกสำเร็จ!');
            } else {
                alert(response.data.message || 'ข้อมูลบันทึกสำเร็จ');
            }
        })
        .catch((error) => {
            console.error('เกิดข้อผิดพลาด!', error);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
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
    
    return (
        <>
            <NavbarIntern/>
            <div className="max-w-[95%] mx-auto mt-12 mb-5  p-2 bg-white shadow-lg rounded-lg text-left " style={{ fontSize: '40px' }}>
                <h3 className='ml-5'>
                    กรอกข้อมูลส่วนตัว
                </h3>
            </div>
            <div className="max-w-[95%] mx-auto my-6 p-8 bg-white shadow-lg rounded-lg">
                <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6" style={{gridRowGap:'20px'}}>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">คำนำหน้าชื่อ<span style={{ color: 'red' }}>*</span></label>
                            <select className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" style={{ height: '49.6px' }} value={title} onChange={(e) => setTitle(e.target.value)} required>
                                <option value="">เลือกคำนำหน้าชื่อ</option>
                                <option value="นาย">นาย</option>
                                <option value="นาง">นาง</option>
                                <option value="นางสาว">นางสาว</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">ชื่อ<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="ชื่อจริง" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">นามสกุล<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="นามสกุล" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">ชื่อเล่น<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="ชื่อเล่น" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">Prefix<span style={{ color: 'red' }}>*</span></label>
                            <select className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" style={{ height: '49.6px' }} value={titleEng} onChange={(e) => setTitleEng(e.target.value)} required>
                                <option value="">Select Prefix</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Ms.">Ms.</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">Name<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={firstNameEng} onChange={(e) => setFirstNameEng(e.target.value)} placeholder="First Name" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">Last Name<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={lastNameEng} onChange={(e) => setLastNameEng(e.target.value)} placeholder="Last Name" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">Nickname<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={nicknameEng} onChange={(e) => setNicknameEng(e.target.value)} placeholder="Nickname" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">อายุ<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">วันเกิด<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="date" style={{height:'49.6px'}} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">เลขบัตรประชาชน<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={idCard} onChange={(e) => setIdCard(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">สัญชาติ<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">ศาสนา<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={religion} onChange={(e) => setReligion(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">เบอร์โทรศัพท์<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">Facebook<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">ID Line<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={lineId} onChange={(e) => setLineId(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">Email (สำหรับสื่อสารโครงการ)<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="email" value={email2} onChange={(e) => setEmail2(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">Email (ใช้สำหรับ Microsoft Teams)<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="email" value={email3} onChange={(e) => setEmail3(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">เพศ<span style={{ color: 'red' }}>*</span></label>
                            <select className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" style={{ height: '49.6px' }} value={gender} onChange={(e) => setGender(e.target.value)} required>
                                <option value="">เลือกเพศ</option>
                                <option value="ชาย">ชาย</option>
                                <option value="หญิง">หญิง</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">พี่เลี้ยง<span style={{ color: 'red' }}>*</span></label>
                            <select className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" style={{ height: '49.6px' }} value={mentor} onChange={(e) => setMentor(e.target.value)} required>
                                <option value="">เลือกพี่เลี้ยง</option>
                                <option value="สุพรรษา มูลศิริ">สุพรรษา มูลศิริ</option>
                                <option value="เอกพงษ์ มีสุข">เอกพงษ์ มีสุข</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-2xl font-medium text-gray-700">ที่อยู่ตามบัตรประชาชน<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-2xl font-medium text-gray-700">ที่อยู่ปัจจุบัน<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-2xl font-medium text-gray-700">สถานศึกษาปัจจุบัน<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={currentEducation} onChange={(e) => setCurrentEducation(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-2xl font-medium text-gray-700">คณะ<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={faculty} onChange={(e) => setFaculty(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-2xl font-medium text-gray-700">สาขา<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-2xl font-medium text-gray-700">วุฒิการศึกษา<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-2xl font-medium text-gray-700">ระดับการศึกษา<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={educationLevell} onChange={(e) => setEducationLevell(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">เกรดเฉลี่ยรวม<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={gpa} onChange={(e) => setGpa(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">งานอดิเรก<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={hobbies} onChange={(e) => setHobbies(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">ความสามารถพิเศษ<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={specialSkills} onChange={(e) => setSpecialSkills(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-2xl font-medium text-gray-700">ตำแหน่งที่สมัคร<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-4">
                            <label className="block text-2xl font-medium text-gray-700">โปรดเลือกสายงานที่ถนัด<span style={{ color: 'red' }}>*</span></label>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-radio"
                                        value="Frontend"
                                        checked={goodjob === 'Frontend'}
                                        onChange={() => setGoodjob('Frontend')}
                                    />
                                    <span className="ml-2 text-2xl">Frontend</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-radio"
                                        value="Backend"
                                        checked={goodjob === 'Backend'}
                                        onChange={() => setGoodjob('Backend')}
                                    />
                                    <span className="ml-2 text-2xl">Backend</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-radio"
                                        value="Data Analysis"
                                        checked={goodjob === 'Data Analysis'}
                                        onChange={() => setGoodjob('Data Analysis')}
                                    />
                                    <span className="ml-2 text-2xl">Data Analysis</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-radio"
                                        value="Data Management"
                                        checked={goodjob === 'Data Management'}
                                        onChange={() => setGoodjob('Data Management')}
                                    />
                                    <span className="ml-2 text-2xl">Data Management</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-radio"
                                        value="Full stack"
                                        checked={goodjob === 'Full stack'}
                                        onChange={() => setGoodjob('Full stack')}
                                    />
                                    <span className="ml-2 text-2xl">Full stack</span>
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
                                    <span className="ml-2 text-2xl">อื่นๆ</span>
                                </label>
                                {goodjob === 'Other' && (
                                    <input
                                        className=" block w-full p-2 border  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl"
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
                            <label className="block text-2xl font-medium text-gray-700">โปรแกรมหรืองานที่ถนัด (เลือก 3 ข้อ)<span style={{ color: 'red' }}>*</span></label>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        value="Figma"
                                        checked={program.includes('Figma')}
                                        onChange={handleProgramChange}
                                    />
                                    <span className="ml-2 text-2xl">Figma</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        value="React"
                                        checked={program.includes('React')}
                                        onChange={handleProgramChange}
                                    />
                                    <span className="ml-2 text-2xl">React</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        value="PHP"
                                        checked={program.includes('PHP')}
                                        onChange={handleProgramChange}
                                    />
                                    <span className="ml-2 text-2xl">PHP</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        value="VS code"
                                        checked={program.includes('VS code')}
                                        onChange={handleProgramChange}
                                    />
                                    <span className="ml-2 text-2xl">VS Code</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        value="SQL Server"
                                        checked={program.includes('SQL Server')}
                                        onChange={handleProgramChange}
                                    />
                                    <span className="ml-2 text-2xl">SQL Server</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        value="Docker"
                                        checked={program.includes('Docker')}
                                        onChange={handleProgramChange}
                                    />
                                    <span className="ml-2 text-2xl">Docker</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        value="Other"
                                        checked={program.includes('Other')}
                                        onChange={handleProgramChange}
                                    />
                                    <span className="ml-2 text-2xl">อื่นๆ</span>
                                </label>
                                {program.includes('Other') && (
                                    <input
                                        className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl"
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
                            <label className="block text-2xl font-medium text-gray-700">วัน/เดือน/ปี ที่เริ่มฝึกงาน<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="date" value={datestart} onChange={(e) => setDatestart(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-2xl font-medium text-gray-700">วัน/เดือน/ปี ที่ฝึกงานวันสุดท้าย<span style={{ color: 'red' }}>*</span></label>
                            <input className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl" type="date" value={dateend} onChange={(e) => setDateend(e.target.value)} required />
                        </div>
                        <div className="col-span-4">
                            <label className="block text-2xl font-medium text-gray-700">แนบไฟล์ใหม่ (เฉพาะ pdf)</label>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-2xl font-medium text-gray-700">Resume<span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        className="file-input file-input-bordered w-full max-w-xs"type="file"
                                        accept="application/pdf"
                                        onChange={(e) => setResume(e.target.files[0])}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-2xl font-medium text-gray-700">Transcript<span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        className="file-input file-input-bordered w-full max-w-xs"type="file"
                                        accept="application/pdf"
                                        onChange={(e) => setTranscript(e.target.files[0])}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-2xl font-medium text-gray-700">ผลงานอื่น ๆ (ถ้ามี)</label>
                                    <input
                                        className="file-input file-input-bordered w-full max-w-xs"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(e) => setOtherFiles(e.target.files[0])}
                                    />
                                </div>
                        <div >
                            <label className="block text-2xl font-medium text-gray-700">ภาพโปรไฟล์<span style={{ color: 'red' }}>*</span></label>
                            <input
                                className="file-input file-input-bordered w-full max-w-xs col-span-4"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfile(e.target.files[0])}
                                required
                            />
                        </div>
                            </div>
                        </div>
                        {profile && (
                            <div className="mt-4 col-span-4">
                                <p className="text-2xl font-medium text-gray-700">ตัวอย่างรูปภาพ</p>
                                <img src={URL.createObjectURL(profile)} alt="Preview" className="mt-2 rounded-md shadow-md" style={{maxWidth:'150px', maxHeight:'250px', }} />
                            </div>
                        )}
                        
                        <button className="mt-8 col-span-4  text-white py-3 px-6 rounded-md shadow-sm " type="submit" style={{ backgroundColor: 'rgb(104, 172, 1)' }}>
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
