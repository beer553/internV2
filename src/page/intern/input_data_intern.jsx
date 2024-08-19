import React, { useState } from 'react';
import axios from 'axios';
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
    const [program, setprogram] = useState('');
    const [otherprogram, setOtherprogram] = useState('');
    const [datestart, setDatestart] = useState('');
    const [dateend, setDateend] = useState('');
    const [profile, setProfile] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

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
        formData.append('program', program);
        formData.append('otherprogram', otherprogram);
        formData.append('datestart', datestart);
        formData.append('dateend', dateend);
        formData.append('profile', profile);

        axios.post('http://localhost/your_project_name/insert_data.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            alert(response.data.message || 'Data inserted successfully!');
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
    };
    return (
        <>
            <div className='banner-container'>
                <img src="/src/img/banner1.jpg" alt="Banner Image" className="w-full h-auto" />
            </div>
            <div className="navbar flex justify-between items-center h-21 bg-gray-800">
                <div className="flex items-center ml-5">
                    <img src="/src/img/Siam_Cement_Group_Logo.svg.png" alt="Logo" className="h-16 m-4 " />
                </div>
                <div className="flex items-center ml-8">
                    <div className="mr-5 text-white text-right ">
                        <p className='text-left' style={{ height: '30px' }}>Intern</p>
                        <p>Chawanrat Boonya</p>
                    </div>
                    <div className="bg-white w-px h-16 mx-4"></div>
                    <a href="logout.php" className="text-white mr-12 ">Logout</a>
                </div>
            </div>
            <div className="max-w-[95%] mx-auto mt-12 mb-5  p-3 bg-white shadow-lg rounded-lg text-left " style={{ fontSize: '40px' }}>
                <h3 className='ml-5'>
                    กรอกข้อมูลส่วนตัว
                </h3>
            </div>
            <div className="max-w-[95%] mx-auto my-6 p-8 bg-white shadow-lg rounded-lg">
                <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-xl font-medium text-gray-700">คำนำหน้าชื่อ</label>
                            <select className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" style={{ height: '62px' }} value={title} onChange={(e) => setTitle(e.target.value)} required>
                                <option value="">เลือกคำนำหน้าชื่อ</option>
                                <option value="นาย">นาย</option>
                                <option value="นาง">นาง</option>
                                <option value="นางสาว">นางสาว</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">ชื่อ</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="ชื่อจริง" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">นามสกุล</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="นามสกุล" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">ชื่อเล่น</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="ชื่อเล่น" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Prefix</label>
                            <select className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" style={{ height: '62px' }} value={titleEng} onChange={(e) => setTitleEng(e.target.value)} required>
                                <option value="">Select Prefix</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Ms.">Ms.</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Name</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={firstNameEng} onChange={(e) => setFirstNameEng(e.target.value)} placeholder="First Name" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Last Name</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={lastNameEng} onChange={(e) => setLastNameEng(e.target.value)} placeholder="Last Name" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Nickname</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={nicknameEng} onChange={(e) => setNicknameEng(e.target.value)} placeholder="Nickname" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">อายุ</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">วันเกิด</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">เลขบัตรประชาชน</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={idCard} onChange={(e) => setIdCard(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">สัญชาติ</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">ศาสนา</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={religion} onChange={(e) => setReligion(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">เบอร์โทรศัพท์</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Facebook</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">ID Line</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={lineId} onChange={(e) => setLineId(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Email (สำหรับสื่อสารโครงการ)</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="email" value={email2} onChange={(e) => setEmail2(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Email (ใช้สำหรับ Microsoft Teams)</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="email" value={email3} onChange={(e) => setEmail3(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">เพศ</label>
                            <select className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" style={{ height: '62px' }} value={titleEng} onChange={(e) => setTitleEng(e.target.value)} required>
                                <option value="">เลือกเพศ</option>
                                <option value="Mr.">ชาย</option>
                                <option value="Mrs.">หญิง</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">ที่อยู่ตามบัตรประชาชน</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">ที่อยู่ปัจจุบัน</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">สถานศึกษาปัจจุบัน</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={currentEducation} onChange={(e) => setCurrentEducation(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">คณะ</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={faculty} onChange={(e) => setFaculty(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">สาขา</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">วุฒิการศึกษา</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">ระดับการศึกษา</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={educationLevell} onChange={(e) => setEducationLevell(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">เกรดเฉลี่ยรวม</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={gpa} onChange={(e) => setGpa(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">งานอดิเรก</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={hobbies} onChange={(e) => setHobbies(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">ความสามารถพิเศษ</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={specialSkills} onChange={(e) => setSpecialSkills(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xl font-medium text-gray-700">ตำแหน่งที่สมัคร</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="โปรดระบุ" required />
                        </div>
                        <div className="col-span-4">
                            <label className="block text-xl font-medium text-gray-700">โปรดเลือกสายงานที่ถนัด</label>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        value="Frontend"
                                        checked={goodjob === 'Frontend'}
                                        onChange={() => setGoodjob('Frontend')}
                                    />
                                    <span className="ml-2 text-xl">Frontend</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        value="Backend"
                                        checked={goodjob === 'Backend'}
                                        onChange={() => setGoodjob('Backend')}
                                    />
                                    <span className="ml-2 text-xl">Backend</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        value="Data Analysis"
                                        checked={goodjob === 'Data Analysis'}
                                        onChange={() => setGoodjob('Data Analysis')}
                                    />
                                    <span className="ml-2 text-xl">Data Analysis</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        value="Data Management"
                                        checked={goodjob === 'Data Management'}
                                        onChange={() => setGoodjob('Data Management')}
                                    />
                                    <span className="ml-2 text-xl">Data Management</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        value="Full stack"
                                        checked={goodjob === 'Full stack'}
                                        onChange={() => setGoodjob('Full stack')}
                                    />
                                    <span className="ml-2 text-xl">Full stack</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
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
                                        className=" block w-full p-4 border  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
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
                            <label className="block text-xl font-medium text-gray-700">โปรแกรมหรืองานที่ถนัด (เลือก 3 ข้อ)</label>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        value="Figma"
                                        checked={program === 'Figma'}
                                        onChange={() => setprogram('Figma')}
                                    />
                                    <span className="ml-2 text-xl">Figma</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        value="React"
                                        checked={program === 'React'}
                                        onChange={() => setprogram('React')}
                                    />
                                    <span className="ml-2 text-xl">React</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        value="PHP"
                                        checked={program === 'PHP'}
                                        onChange={() => setprogram('PHP')}
                                    />
                                    <span className="ml-2 text-xl">PHP</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        value="VS code"
                                        checked={program === 'VS code'}
                                        onChange={() => setprogram('VS code')}
                                    />
                                    <span className="ml-2 text-xl">VS Code</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        value="SQL Server"
                                        checked={program === 'SQL Server'}
                                        onChange={() => setprogram('SQL Server')}
                                    />
                                    <span className="ml-2 text-xl">SQL Server</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        value="Docker"
                                        checked={program === 'Docker'}
                                        onChange={() => setprogram('Docker')}
                                    />
                                    <span className="ml-2 text-xl">Docker</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio"
                                        value="Other"
                                        checked={program === 'Other'}
                                        onChange={(e) => {
                                            setprogram('Other');
                                            setOtherprogram('');
                                        }}
                                    />
                                    <span className="ml-2 text-xl">อื่นๆ</span>
                                </label>
                                {program === 'Other' && (
                                    <input
                                        className="mt-2 block w-full p-4 border  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
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
                            <label className="block text-xl font-medium text-gray-700">วัน/เดือน/ปี ที่เริ่มฝึกงาน</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="date" value={datestart} onChange={(e) => setDatestart(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">วัน/เดือน/ปี ที่ฝึกงานวันสุดท้าย</label>
                            <input className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" type="date" value={dateend} onChange={(e) => setDateend(e.target.value)} required />
                        </div>
                        <div className="col-span-4">
                            <label className="block text-xl font-medium text-gray-700">ภาพโปรไฟล์</label>
                            <input
                                className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfile(e.target.files[0])}
                            />
                        </div>
                        {profile && (
                            <div className="mt-4 col-span-4">
                                <p className="text-xl font-medium text-gray-700">ตัวอย่างรูปภาพ</p>
                                <img src={URL.createObjectURL(profile)} alt="Preview" className="mt-2 rounded-md shadow-md" />
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
