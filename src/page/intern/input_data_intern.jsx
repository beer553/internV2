import React, { useState } from 'react';
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
    const [showConfirmation, setShowConfirmation] = useState(false);
    // const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };
    const handleTitleEngChange = (event) => {
        setTitleEng(event.target.value);
    };
    const handleFirstNameEngChange = (event) => {
        setFirstNameEng(event.target.value);
    };
    const handleLastNameEngChange = (event) => {
        setLastNameEng(event.target.value);
    };
    const handleNicknameEngChange = (event) => {
        setNicknameEng(event.target.value);
    };
    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };
    const handleBirthDateChange = (event) => {
        setBirthDate(event.target.value);
    };
    const handleIdCardChange = (event) => {
        setIdCard(event.target.value);
    };
    const handleNationalityChange = (event) => {
        setNationality(event.target.value);
    };
    const handleReligionChange = (event) => {
        setReligion(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const handleFacebookChange = (event) => {
        setFacebook(event.target.value);
    };
    const handleLineIdChange = (event) => {
        setLineId(event.target.value);
    };
    const handleEmail2Change = (event) => {
        setEmail2(event.target.value);
    };
    const handleEmail3Change = (event) => {
        setEmail3(event.target.value);
    };
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleCurrentAddressChange = (event) => {
        setCurrentAddress(event.target.value);
    };
    const handleCurrentEducationChange = (event) => {
        setCurrentEducation(event.target.value);
    };
    const handleFacultyChange = (event) => {
        setFaculty(event.target.value);
    };
    const handleMajorChange = (event) => {
        setMajor(event.target.value);
    };
    const handleEducationLevelChange = (event) => {
        setEducationLevel(event.target.value);
    };
    const handleEducationLevellChange = (event) => {
        setEducationLevell(event.target.value);
    };
    const handleGpaChange = (event) => {
        setGpa(event.target.value);
    };
    const handleHobbiesChange = (event) => {
        setHobbies(event.target.value);
    };
    const handleSpecialSkillsChange = (event) => {
        setSpecialSkills(event.target.value);
    };
    const handlePositionChange = (event) => {
        setPosition(event.target.value);
    };
    const handleGoodJobChange = (event) => {
        const selectedJob = event.target.value;
        setGoodjob(selectedJob);
        if (selectedJob !== 'Other') {
            setOtherJob('');
        }
    };
    const handleProgramChange = (event) => {
        const selectedprogram = event.target.value;
        setprogram(selectedprogram);
        if (selectedprogram !== 'Other') {
            setOtherprogram('');
        }
    };
    const handledatestartChange = (event) => {
        setDatestart(event.target.value);
    };
    const handledateendChange = (event) => {
        setDateend(event.target.value);
    };
    const handleProfileChange = (event) => {
        const selectedProfile = event.target.files[0];
        setProfile(selectedProfile);
    };
    const handleConfirmation = () => {
        setShowConfirmation(true);
    };
    return (
        <>
            <div className="banner-container w-full">
                <img src="/src/img/intern.jpeg" alt="Banner Image" className="w-full h-auto" />
            </div>
            <div className="navbar flex justify-between items-center h-30" style={{backgroundColor:'#333'}}>
                <div className="logo-container flex items-center">
                    <img src="/src/img/Siam_Cement_Group_Logo.svg.png" alt="Logo" className="h-16" style={{ margin: '10px' }} />
                </div>
                <div className="right flex items-center ml-8">
                    <div className="username-container mr-10 text-white text-right">
                        <p>Intern<br />ชวัลรัตน์ บุญญา</p>
                    </div>
                      <div style={{backgroundColor:'white', width:'3px', height:'60px', marginRight:'30px'}}></div>
                    <a href="logout.php" className="logout text-white mr-20">ออกจากระบบ</a>
                </div>
            </div>
            <div className='input_data_container' >
                <div className='bg-white' style={{ borderRadius: '5px', boxShadow0: '2px 4px rgba(0, 0, 0, 0.1)', width: '100%' }}>
                    <h3 className='text-left text-4xl p-5 w-full pr-0'>กรอกข้อมูลส่วนตัว</h3>
                </div>
                <div className='bg-white' style={{ borderRadius: '5px', boxShadow0: '2px 4px rgba(0, 0, 0, 0.1)', width: '100%', marginTop: '30px' }}>
                    <form className='from-group-2' onSubmit={handleSubmit}>
                        <div className='prefix-1'>
                            <div><p className='p1'>คำนำหน้าชื่อ</p></div>
                            <select className='select' value={title} onChange={handleTitleChange} required>
                                <option value="">เลือกคำนำหน้าชื่อ</option>
                                <option value="นาย">นาย</option>
                                <option value="นาง">นาง</option>
                                <option value="นางสาว">นางสาว</option>
                            </select>
                        </div>
                        <div className='name-1'>
                            <div><p className='p1'>ชื่อ</p></div>
                            <input className='firstname' type="text" value={firstName} onChange={handleFirstNameChange} placeholder="ชื่อ" required />
                        </div>
                        <div className='last-name'>
                            <div><p className='p1'>นามสกุล</p></div>
                            <input className='last' type="text" value={lastName} onChange={handleLastNameChange} placeholder="นามสกุล" required />
                        </div>
                        <div className='nickname'>
                            <div><p className='p1'>ชื่อเล่น</p></div>
                            <input className='nick' type="text" value={nickname} onChange={handleNicknameChange} placeholder="ชื่อเล่น" required />
                        </div>
                        <div className='form-item'>
                            <div><p className='p1'>Title</p></div>
                            <select className='selectt' value={titleEng} onChange={handleTitleEngChange} required>
                                <option value="">Select Title</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Ms.">Ms.</option>
                            </select>
                        </div>
                        <div className='firstname-1'>
                            <div><p className='p1'>Name</p></div>
                            <input className='firstname-2' type="text" value={firstNameEng} onChange={handleFirstNameEngChange} placeholder="First Name" required />
                        </div>
                        <div className='lastname-1'>
                            <div><p className='p1'>Last Name</p></div>
                            <input className='lastname-2' type="text" value={lastNameEng} onChange={handleLastNameEngChange} placeholder="Last Name" required />
                        </div>
                        <div className='nickname-1'>
                            <div><p className='p1'>Nickname</p></div>
                            <input className='nickname-2' type="text" value={nicknameEng} onChange={handleNicknameEngChange} placeholder="Nickname" required />
                        </div>
                        <div className='age'>
                            <div><p className='p1'>อายุ</p></div>
                            <input className='age-1' type="text" value={age} onChange={handleAgeChange} placeholder="อายุ/Age" required />
                        </div>
                        <div className='birth-date'>
                            <div><p className='p1'>วันเกิด</p></div>
                            <input className='birth-date-1' type="date" value={birthDate} onChange={handleBirthDateChange} required />
                        </div>
                        <div className='id-card'>
                            <div><p className='p1'>เลขบัตรประชาชน</p></div>
                            <input className='id-card-1' type="text" value={idCard} onChange={handleIdCardChange} placeholder="เลขบัตรประชาชน" required />
                        </div>
                        <div className='nationality'>
                            <div><p className='p1'>สัญชาติ</p></div>
                            <input className='nationality-1' type="text" value={nationality} onChange={handleNationalityChange} placeholder="สัญชาติ" required />
                        </div>
                        <div className='religion'>
                            <div><p className='p1'>ศาสนา</p></div>
                            <input className='religion-1' type="text" value={religion} onChange={handleReligionChange} placeholder="ศาสนา" required />
                        </div>
                        <div className='phone'>
                            <div><p className='p1'>เบอร์โทรศัพท์</p></div>
                            <input className='phone-1' type="text" value={phone} onChange={handlePhoneChange} placeholder="เบอร์โทรศัพท์" required />
                        </div>
                        <div className='facebook'>
                            <div><p className='p1'>Facebook</p></div>
                            <input className='facebook-1' type="text" value={facebook} onChange={handleFacebookChange} placeholder="Facebook" required />
                        </div>
                        <div className='lineId'>
                            <div><p className='p1'>ID Line</p></div>
                            <input className='lineId-1' type="text" value={lineId} onChange={handleLineIdChange} placeholder="ID Line" required />
                        </div>
                        <div className='email2'>
                            <div><p className='p1'>Email (สำหรับสื่อสารโครงการ)</p></div>
                            <input className='email2-1' type="email" value={email2} onChange={handleEmail2Change} placeholder="Email" required />
                        </div>
                        <div className='email3'>
                            <div><p className='p1'>Email (ใช้สำหรับ Microsoft Teames)</p></div>
                            <input className='email3-1' type="email" value={email3} onChange={handleEmail3Change} placeholder="Email" required />
                        </div>
                        <div className='gender'>
                            <div><p className='p1'>เพศ</p></div>
                            <label className='gender-1'>
                                <input
                                    type="checkbox"
                                    value="ชาย"
                                    checked={gender === 'ชาย'}
                                    onChange={() => setGender('ชาย')}
                                />
                                ชาย
                            </label>
                            <label className='gender-1'>
                                <input
                                    type="checkbox"
                                    value="หญิง"
                                    checked={gender === 'หญิง'}
                                    onChange={() => setGender('หญิง')}
                                />
                                หญิง
                            </label>
                        </div>
                        <div className='address'>
                            <div><p className='p1'>ที่อยู่ตามบัตรประชาชน</p></div>
                            <input className='address-1' type="text" value={address} onChange={handleAddressChange} placeholder="ที่อยู่ตามบัตรประชาชน" required />
                        </div>
                        <div className='current-address'>
                            <div><p className='p1'>ที่อยู่ปัจจุบัน</p></div>
                            <input className='current-address-1' type="text" value={currentAddress} onChange={handleCurrentAddressChange} placeholder="ที่อยู่ปัจจุบัน" required />
                        </div>
                        <div className='education'>
                            <div><p className='p1'>สถานศึกษาปัจจุบัน</p></div>
                            <input className='education-1' type="text" value={currentEducation} onChange={handleCurrentEducationChange} placeholder="สถานศึกษาปัจจุบัน" required />
                        </div>
                        <div className='faculty'>
                            <div><p className='p1'>คณะ</p></div>
                            <input className='faculty-1' type="text" value={faculty} onChange={handleFacultyChange} placeholder="คณะ" required />
                        </div>
                        <div className='major'>
                            <div><p className='p1'>สาขา</p></div>
                            <input className='major-1' type="text" value={major} onChange={handleMajorChange} placeholder="สาขา" required />
                        </div>
                        <div className='education-level'>
                            <div><p className='p1'>วุฒิการศึกษา</p></div>
                            <input className='education-level-1' type="text" value={educationLevel} onChange={handleEducationLevelChange} placeholder="วุฒิการศึกษา" required />
                        </div>
                        <div className='education-levell'>
                            <div><p className='p1'>ระดับการศึกษา</p></div>
                            <input className='education-levell-1' type="text" value={educationLevell} onChange={handleEducationLevellChange} placeholder="ระดับการศึกษา" required />
                        </div>
                        <div className='gpa'>
                            <div><p className='p1'>เกรดเฉลี่ยรวม</p></div>
                            <input className='gpa-1' type="text" value={gpa} onChange={handleGpaChange} placeholder="เกรดเฉลี่ยรวม" required />
                        </div>
                        <div className='hobbies'>
                            <div><p className='p1'>งานอดิเรก</p></div>
                            <input className='hobbies-1' type="text" value={hobbies} onChange={handleHobbiesChange} placeholder="งานอดิเรก" required />
                        </div>
                        <div className='special-skills'>
                            <div><p className='p1'>ความสามารถพิเศษ</p></div>
                            <input className='special-skills-1' type="text" value={specialSkills} onChange={handleSpecialSkillsChange} placeholder="ความสามารถพิเศษ" required />
                        </div>
                        <div className='position'>
                            <div><p className='p1'>ตำแหน่งที่สมัคร</p></div>
                            <input className='position-1' type="text" value={position} onChange={handlePositionChange} placeholder="ตำแหน่งที่สมัคร" required />
                        </div>
                        <div className='goodjob'>
                            <div><p className='p1'>โปรดเลือกสายงานที่ถนัด</p></div>
                            <label className='goodjob-1'>
                                <input
                                    type="checkbox"
                                    value="Frontend"
                                    checked={goodjob === 'Frontend'}
                                    onChange={() => setGoodjob('Frontend')}
                                />
                                Frontend
                            </label>
                            <label className='goodjob-1'>
                                <input
                                    type="checkbox"
                                    value="Backtend"
                                    checked={goodjob === 'Backtend'}
                                    onChange={() => setGoodjob('Backtend')}
                                />
                                Backend
                            </label>
                            <label className='goodjob-1'>
                                <input
                                    type="checkbox"
                                    value="Data Analysis"
                                    checked={goodjob === 'Data Analysis'}
                                    onChange={() => setGoodjob('Data Analysis')}
                                />
                                Data Analysis
                            </label>
                            <label className='goodjob-1'>
                                <input
                                    type="checkbox"
                                    value="Data Management"
                                    checked={goodjob === 'Data Management'}
                                    onChange={() => setGoodjob('Data Management')}
                                />
                                Data Management
                            </label>
                            <label className='goodjob-1'>
                                <input
                                    type="checkbox"
                                    value="Full stack"
                                    checked={goodjob === 'Full stack'}
                                    onChange={() => setGoodjob('Full stack')}
                                />
                                Full stack
                            </label>
                            <label className='goodjob-1'>
                                <input
                                    type="checkbox"
                                    value="Other"
                                    checked={goodjob === 'Other'}
                                    onChange={handleGoodJobChange}
                                />
                                อื่นๆ
                            </label>
                            {goodjob === 'Other' && (
                                <input
                                    type="text"
                                    value={otherJob}
                                    onChange={(e) => setOtherJob(e.target.value)}
                                    placeholder="โปรดระบุ"
                                    required
                                />
                            )}
                        </div>
                        <div className='program'>
                            <div><p className='p1'>โปรแกรมหรืองานที่ถนัด (เลือก 3 ข้อ)</p></div>
                            <label className='program-1'>
                                <input
                                    type="checkbox"
                                    value="Figma"
                                    checked={program === 'Figma'}
                                    onChange={() => setprogram('Figma')}
                                />
                                Figma
                            </label>
                            <label className='program-1'>
                                <input
                                    type="checkbox"
                                    value="React"
                                    checked={program === 'React'}
                                    onChange={() => setprogram('React')}
                                />
                                React
                            </label>
                            <label className='program-1'>
                                <input
                                    type="checkbox"
                                    value="PHP"
                                    checked={program === 'PHP'}
                                    onChange={() => setprogram('PHP')}
                                />
                                PHP
                            </label>
                            <label className='program-1'>
                                <input
                                    type="checkbox"
                                    value="VS code"
                                    checked={program === 'VS code'}
                                    onChange={() => setprogram('VS code')}
                                />
                                VS Code
                            </label>
                            <label className='program-1'>
                                <input
                                    type="checkbox"
                                    value="SQL Server"
                                    checked={program === 'SQL Server'}
                                    onChange={() => setprogram('SQL Server')}
                                />
                                SQL Server
                            </label>
                            <label className='program-1'>
                                <input
                                    type="checkbox"
                                    value="DocKer"
                                    checked={program === 'DocKer'}
                                    onChange={() => setprogram('DocKer')}
                                />
                                DocKer
                            </label>
                            <label className='program-1'>
                                <input
                                    type="checkbox"
                                    value="Other"
                                    checked={program === 'Other'}
                                    onChange={handleProgramChange}
                                />
                                อื่นๆ
                            </label>
                            {program === 'Other' && (
                                <input
                                    type="text"
                                    value={otherprogram}
                                    onChange={(e) => setOtherprogram(e.target.value)}
                                    placeholder="โปรดระบุ"
                                    required
                                />
                            )}
                        </div>
                        <div className='datestart'>
                            <div><p className='p1'>วัน/เดือน/ปี ที่เริ่มฝึกงาน</p></div>
                            <input className='datestart-1' type="date" value={datestart} onChange={handledatestartChange} required />
                        </div>
                        <div className='dateend'>
                            <div><p className='p1'>วัน/เดือน/ปี ที่ฝึกงานวันสุดท้าย</p></div>
                            <input className='dateend-1' type="date" value={dateend} onChange={handledateendChange} required />
                        </div>
                        <div className='profile-picture'>
                            <div><p className='p1'>ภาพโปรไฟล์</p></div>
                            <input
                                className='image-upload'
                                type="file"
                                accept="image/*"
                                onChange={handleProfileChange}
                            />
                        </div>
                        {profile && (
                            <div className="preview">
                                <p className="p1">ตัวอย่างรูปภาพ</p>
                                <img src={URL.createObjectURL(profile)} alt="Preview" className="preview-image" />
                            </div>
                        )}
                        <button className='applyintern' type="submit">ยืนยันการสมัคร</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default input_data_intern;
