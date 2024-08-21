import React from 'react';
import './IDP.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/footer';
import NavbarIntern from '../component/navbar_intern';

const Profile = () => {
  const navigate = useNavigate();

  // ฟังก์ชันเพื่อกลับไปยังหน้า Homepage
  const Home = () => {
    navigate('/Homepage');
  };

  return (
    <>
      <div>
        {/* ส่วน Header สำหรับ Navbar */}
        <header>
          <NavbarIntern />
        </header>
        
        <main className="main-content">
          {/* ข้อมูลส่วนตัว */}
          <section className="personal-info">
            {/* รูปโปรไฟล์และรายละเอียดส่วนตัว */}
            <div className="personal-info-1">
              <img src="/src/img/profile_IDP.png" className="profile-picture" alt="Profile" />
              <div className="info">
                <h2 className="data">ข้อมูลส่วนตัว</h2>
                <p><strong>ID :</strong> G001-12345</p>
                <p><strong>ชื่อ - นามสกุล :</strong> นายธีรภัทร์ วั่นเล่ง</p>
                <p><strong>ชื่อเล่น :</strong> แดน</p>
                <p><strong>อายุ :</strong> 19 ปี</p>
                <p><strong>วันเกิด :</strong> 18 / 06 / 2548</p>
                <p><strong>สัญชาติ :</strong> ไทย</p>
                <p><strong>เบอร์มือถือ :</strong> 082-337-9677</p>
                {/* แถบแสดงลายเส้นที่ตกแต่งหน้าโปรไฟล์ */}
                <div className="pattern-container">
                  {Array.from({ length: 13 }).map((_, index) => (
                    <div key={index} className="pattern-bar"></div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ข้อมูลการสมัครงาน */}
          <div className="form-container">
            <div className="form-group">
              <label>ตำแหน่งที่สมัคร</label>
              <input type="text" placeholder="Digital Information" className="form-control" readOnly />
            </div>
            <div className="form-group">
              <label>สถานศึกษาปัจจุบัน</label>
              <input type="text" placeholder="วิทยาลัยเทคนิคทุ่งสง" className="form-control" readOnly />
            </div>
            <div className="form-group">
              <label>วันเดือนปีเริ่มฝึกงาน</label>
              <input type="text" placeholder='13/5/2567' className="form-control" readOnly />
            </div>
            <div className="form-group">
              <label>วันเดือนปีฝึกงานวันสุดท้าย</label>
              <input type="text" placeholder='31/1/2568' className="form-control" readOnly />
            </div>
            {/* การแสดงค่า GPA รวม */}
            <div className="form-group gpa-group">
              <label>GPA รวม</label>
              <div className="gpa-display">4.00</div>
            </div>
          </div>

          {/* เนื้อหาของฟอร์มด้านซ้ายและขวา */}
          <div className="form-body">
            <div className="form-left">
              {/* ลิงก์สำหรับดู Resume, Transcript และข้อมูลอื่นๆ */}
              <div className="form-section">
                <a href="#resume">ดู Resume</a>
                <img src="/src/img/img_icon/resume.png" className="icon" alt="Resume" />
              </div>
              <div className="form-section">
                <a href="#transcript">ดู Transcript</a>
                <img src="/src/img/img_icon/transcript.png" className="icon" alt="Transcript" />
              </div>
              <div className="form-section">
                <a href="#additional-info">ดูประวัติส่วนตัวเพิ่มเติม</a>
                <img src="/src/img/img_icon/user.png" className="icon" alt="Profile" />
              </div>
              <div className="form-section">
                <a href="#project-sample">ตัวอย่าง Project ที่เคยทำมา (โปรดส่งเป็นไฟล์ PDF)</a>
                <img src="/src/img/img_icon/project.png" className="icon" alt="Project" />
              </div>
              <div className="form-section">
                <a href="#github-link">ผลงาน link GitHub <span className='text-red-500'>*ถ้ามี</span></a> 
                <img src="/src/img/img_icon/link.png" className="icon" alt="Github" />
              </div>
            </div>

            {/* ฟอร์มด้านขวาสำหรับการกรอกเป้าหมายและเลือกความถนัด */}
            <div className="form-right">
              {/* กรอกเป้าหมาย */}
              <div className="form-group">
                <label>โปรดกรอกเป้าหมาย</label>
                <textarea className="t-please" readOnly>
                  อยากทำโปรเจคเกี่ยวกับการออกแบบอยากได้ ประสบการณ์ในการคุยกับลูกค้าจริงๆ
                </textarea>
              </div>
              {/* เลือกงานสายงานที่ถนัด (Frontend ถูกติ๊กไว้แล้ว) */}
              <div className="form-group">
                <label>โปรดเลือกงานสายงานที่ถนัด</label>
                <div className="label-check">
                  <div>
                    <input type="checkbox" id="frontend" name="frontend" checked/>
                    <label htmlFor="frontend" >Frontend</label>
                  </div>
                  <div>
                    <input type="checkbox" id="backend" name="backend" disabled/>
                    <label htmlFor="backend">Backend</label>
                  </div>
                  <div>
                    <input type="checkbox" id="full-stack" name="full-stack" disabled/>
                    <label htmlFor="full-stack">Full Stack</label>
                  </div>
                  <div>
                    <input type="checkbox" id="data-analysis" name="data-analysis" disabled/>
                    <label htmlFor="data-analysis">Data Analysis</label>
                  </div>
                  <div>
                    <input type="checkbox" id="data-management" name="data-management" disabled/>
                    <label htmlFor="data-management">Data Management</label>
                  </div>
                  <div>
                    <input type="checkbox" id="other" name="other" disabled/>
                    <label htmlFor="other">อื่นๆ</label>
                  </div>
                </div>
              </div>
              {/* เลือกโปรแกรมหรืองานที่ถนัดที่สุด (Figma, React, และ VS Code ถูกติ๊กไว้แล้ว) */}
              <div className="form-group">
                <label>โปรแกรมหรืองานที่ถนัด (3 อย่างที่ถนัดที่สุด)</label>
                <div className="label-check-2">
                  <div>
                    <input type="checkbox" id="figma" name="figma" checked/>
                    <label htmlFor="figma">Figma</label>
                  </div>
                  <div>
                    <input type="checkbox" id="react" name="react" checked/>
                    <label htmlFor="react">React</label>
                  </div>
                  <div >
                    <input type="checkbox" id="php" name="php" disabled />
                    <label htmlFor="php">PHP</label>
                  </div>
                  <div>
                    <input type="checkbox" id="vs-code" name="vs-code" checked/>
                    <label htmlFor="vs-code">VS Code</label>
                  </div>
                  <div>
                    <input type="checkbox" id="sql-server" name="sql-server" disabled/>
                    <label htmlFor="sql-server">SQL Server</label>
                  </div>
                  <div>
                    <input type="checkbox" id="docker" name="docker" disabled/>
                    <label htmlFor="docker">Docker</label>
                  </div>
                  <div>
                    <input type="checkbox" id="other-tool" name="other-tool" disabled/>
                    <label htmlFor="other-tool">อื่นๆ</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
