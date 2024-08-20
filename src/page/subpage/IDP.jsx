import React from 'react';
import './IDP.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/footer';
import NavbarManpower from '../component/navbar_manpower';

const Profile = () => {
  const navigate = useNavigate();

  const Home = () => {
    navigate('/Homepage');
  };

  return (
    <>
      <div>
        <header>
          <NavbarManpower />
        </header>
        <div className="tegid">
          <span className="ID">ID : 001 - 123004</span>
          <img src="/src/img/back-button.png" className="back" alt="Back" onClick={Home} />
        </div>
        <main className="main-content">
          <section className="personal-info">
            <div className="personal-info-1">
              <img src="/src/img/profile.png" alt="Profile" className="profile-picture" />
              <div className="info">
                <h2 className="data">ข้อมูลส่วนตัว</h2>
                <p><strong>ชื่อ - นามสกุล :</strong> นายธีรภัทร รัตนสุคนธ์</p>
                <p><strong>ชื่อเล่น :</strong> แดนนี่</p>
                <p><strong>อายุ :</strong> 60 ปี</p>
                <p><strong>วันเกิด :</strong> 18 / 06 / 3000</p>
                <p><strong>สัญชาติ :</strong> ไทย ผสม อเมริกา</p>
                <p><strong>เบอร์มือถือ :</strong> 082-337-9677</p>
                <div className="pattern-container">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <div key={index} className="pattern-bar"></div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="form-container">
            <div className="form-group">
              <label>ตำแหน่งที่สมัคร</label>
              <input type="text" placeholder="โปรดระบุ" className="form-control" />
            </div>
            <div className="form-group">
              <label>สถานศึกษาปัจจุบัน</label>
              <input type="text" placeholder="โปรดระบุ" className="form-control" />
            </div>
            <div className="form-group gpa-group">
              <label>GPA รวม</label>
              <div className="gpa-display">4.00</div>
            </div>
            <div className="form-group">
              <label>วันเดือนปีเริ่มฝึกงาน</label>
              <input type="date" className="form-control" />
            </div>
            <div className="form-group">
              <label>วันเดือนปีฝึกงานวันสุดท้าย</label>
              <input type="date" className="form-control" />
            </div>
          </div>

          <div className="form-body">
            <div className="form-left">
              <div className="form-section">
                <a href="#resume">ดู Resume</a>
                <img src="https://cdn-icons-png.flaticon.com/128/11102/11102425.png" className="Resume" alt="Resume" />
              </div>
              <div className="form-section">
                <a href="#transcript">ดู Transcript</a>
                <img src="https://cdn-icons-png.flaticon.com/128/15175/15175732.png" className="Transcript" alt="Transcript" />
              </div>
              <div className="form-section">
                <a href="#additional-info">ดูประวัติส่วนตัวเพิ่มเติม</a>
                <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png" className="Profile" alt="Profile" />
              </div>
              <div className="form-section">
                <a href="#project-sample">ตัวอย่าง Project ที่เคยทำมา (โปรดส่งเป็นไฟล์ PDF)</a>
                <img src="https://cdn-icons-png.flaticon.com/128/5956/5956592.png" className="Project" alt="Project" />
              </div>
              <div className="form-section">
                <a href="#github-link">ผลงาน link GitHub *ถ้ามี</a>
                <img src="https://cdn-icons-png.flaticon.com/128/5678/5678562.png" className="Github" alt="Github" />
              </div>
            </div>

            <div className="form-right">
              <div className="form-goal">
                <label className="target">โปรดกรอกเป้าหมาย</label>
                <textarea placeholder="โปรดระบุ" className="please-1"></textarea>
              </div>

              <div className="form-checkboxes">
                <label>โปรดเลือกงานสายงานที่ถนัด</label>
                <div className="label-check">
                  <div>
                    <input type="checkbox" id="frontend" name="frontend" />
                    <label htmlFor="frontend">Frontend</label>
                  </div>
                  <div>
                    <input type="checkbox" id="data-analysis" name="data-analysis" />
                    <label htmlFor="data-analysis">Data Analysis</label>
                  </div>
                  <div>
                    <input type="checkbox" id="backend" name="backend" />
                    <label htmlFor="backend">Backend</label>
                  </div>
                  <div>
                    <input type="checkbox" id="full-stack" name="full-stack" />
                    <label htmlFor="full-stack">Full Stack</label>
                  </div>
                  <div>
                    <input type="checkbox" id="data-management" name="data-management" />
                    <label htmlFor="data-management">Data Management</label>
                  </div>
                  <div>
                    <input type="checkbox" id="other" name="other" />
                    <label htmlFor="other">อื่นๆ</label>
                  </div>
                </div>
              </div>

              <div className="form-checkboxes">
                <label>โปรดแกรมหรืองานที่ถนัด (3 อย่างที่ถนัดที่สุด)</label>
                <div className="label-check-2">
                  <div>
                    <input type="checkbox" id="figma" name="figma" />
                    <label htmlFor="figma">Figma</label>
                  </div>
                  <div>
                    <input type="checkbox" id="vs-code" name="vs-code" />
                    <label htmlFor="vs-code">VS Code</label>
                  </div>
                  <div>
                    <input type="checkbox" id="react" name="react" />
                    <label htmlFor="react">React</label>
                  </div>
                  <div>
                    <input type="checkbox" id="sql-server" name="sql-server" />
                    <label htmlFor="sql-server">SQL Server</label>
                  </div>
                  <div>
                    <input type="checkbox" id="php" name="php" />
                    <label htmlFor="php">PHP</label>
                  </div>
                  <div>
                    <input type="checkbox" id="docker" name="docker" />
                    <label htmlFor="docker">Docker</label>
                  </div>
                  <div>
                    <input type="checkbox" id="other-tool" name="other-tool" />
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
