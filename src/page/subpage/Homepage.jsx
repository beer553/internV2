import React from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทางไปยังหน้าต่างๆ
import Footer from '../component/footer'; // นำเข้า Footer component
import NavbarIntern from '../component/navbar_intern'; // นำเข้า NavbarIntern component

function Homepage() {
  const navigate = useNavigate(); // สร้างตัวแปร navigate เพื่อใช้ในการเปลี่ยนหน้า

  // ฟังก์ชันสำหรับนำทางไปยังหน้าโปรไฟล์
  const goToPofilePage = () => {
    navigate('/IDP');
  };

  // ฟังก์ชันสำหรับนำทางไปยังหน้า Product Backlog
  const gotoProductBacklog = () => {
    navigate('/PDBacklog');
  };

  return (
    <div>
      <header>
        <NavbarIntern /> {/* แสดง NavbarIntern */}
      </header>

      <div className="dashboard">
        <div className="welcome">
          <img src="/src/img/star.png" className="profile-img" alt="Profile" /> {/* รูปภาพโปรไฟล์ */}
          <div className="welcome-text">
            <h2 className='DX'>DX Manpower Management</h2> {/* ชื่อระบบ */}
            <p className='SC'>Hello, Scrum Master STAR 👋</p> {/* ข้อความต้อนรับ */}
          </div>
        </div>

        <div className="dashboard-1">
          <div className="card">
            <div className="number6">6</div> {/* จำนวนทีมพัฒนา */}
            <div className="label-1-">Developer Team (TTL)</div> {/* คำอธิบายทีม */}
            <div className="blue-line"></div> {/* เส้นแบ่งสีน้ำเงิน */}
          </div>
          <div className="card">
            <div className="number3-1">3</div> {/* จำนวน Developer ในปีนี้ */}
            <div className="label-2-">Developer This Year</div> {/* คำอธิบาย Developer ปีนี้ */}
            <div className="orange-line"></div> {/* เส้นแบ่งสีส้ม */}
          </div>
          <div className="card-2">
            <div className="project-card">
              <div className="number2">
                <span>2</span> {/* จำนวนโปรเจกต์ */}
              </div>
              <div className="project-details">
                <div className="project-item">
                  <span>Project</span> {/* คำว่า Project */}
                </div>
                <div className="project-item2">
                  <span>Daily Scrum</span> {/* คำว่า Daily Scrum */}
                </div>
              </div>
              <div className='pj-1-'><span>Project This Year (Items)</span></div> {/* คำอธิบายโปรเจกต์ปีนี้ */}
            </div>
            <div className="cyan-line"></div> {/* เส้นแบ่งสีฟ้า */}
          </div>
          <div className="card-1">
            <div className="item">
              <div className="number3">3</div> {/* จำนวน Sprint */}
              <div className="labelz-1">Sprint</div> {/* คำอธิบาย Sprint */}
            </div>
            <div className="item">
              <div className="number10">10</div> {/* จำนวน Product Backlog */}
              <div className="labelz" onClick={gotoProductBacklog}>
                <div>Product Backlog</div> {/* ลิงก์ไปยังหน้า Product Backlog */}
              </div>
            </div>
            <div className="PI">Product Increment (Items)</div> {/* คำอธิบาย Product Increment */}
            <div className="Green"></div> {/* เส้นแบ่งสีเขียว */}
          </div>
        </div>

        <div className="manpower">
          <div className='add-manpower'>
            <h3 className='manpower-center'>Manpower</h3> {/* หัวข้อ Manpower */}
            {/* <div><img src="https://cdn-icons-png.flaticon.com/128/4315/4315609.png" alt="Add" className='add-1' /></div> {/* ไอคอนเพิ่ม Manpower */}
          </div> 
          <table>
            <thead>
              <tr>
                <th>NO</th>
                <th>ID Name</th>
                <th>Status</th>
                <th>Time Line</th>
                <th>Project</th>
                <th>Profile</th>
                <th>Sprint Review</th>
                <th>Evaluate</th>
              </tr>
            </thead>
            <tbody>
              {/* แสดงข้อมูลนักศึกษาฝึกงานในตาราง */}
              {[
                { id: 1, name: 'G001-12345 Phurin Chairoek ', status: 'รอฝึกงาน', timeline: '01/01/2024 - 31/12/2024', project: 'OT Dashboard' },
                { id: 2, name: 'G001-12345 Teerapat Wanleng ', status: 'กำลังฝึกงาน', timeline: '01/01/2024 - 31/12/2024', project: ' Internship' },
                { id: 3, name: 'G001-12345 Teerapat Wanleng ', status: 'กำลังฝึกงาน', timeline: '01/01/2024 - 31/12/2024', project: 'OT Dashboard' },
                { id: 4, name: 'G001-12345 Teerapat Wanleng ', status: 'กำลังฝึกงาน', timeline: '01/01/2024 - 31/12/2024', project: 'Internship' },
                { id: 5, name: 'G001-12345 Teerapat Wanleng ', status: 'ฝึกงานเสร็จสิ้น', timeline: '01/01/2024 - 31/12/2024', project: 'OT Dashboard' },
                { id: 6, name: 'G001-12345 Teerapat Wanleng ', status: 'ฝึกงานเสร็จสิ้น', timeline: '01/01/2024 - 31/12/2024', project: 'OT Dashboard' },
              ].map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td> {/* แสดงหมายเลขนักศึกษา */}
                  <td>{row.name}</td> {/* แสดงชื่อและรหัสนักศึกษา */}
                  <td className={row.status.toLowerCase()}>{row.status}</td> {/* แสดงสถานะของนักศึกษา */}
                  <td>{row.timeline}</td> {/* แสดงระยะเวลาฝึกงาน */}
                  <td>{row.project}</td> {/* แสดงโปรเจกต์ที่นักศึกษาทำ */}
                  <td><button> <img className='file' src="https://cdn-icons-png.flaticon.com/128/1157/1157026.png" alt="Profile" onClick={goToPofilePage} /></button></td> {/* ปุ่มเปิดโปรไฟล์ */}
                  <td><img className='sprint' src="https://cdn-icons-png.flaticon.com/128/4727/4727519.png" alt="Sprint Review" /></td> {/* ไอคอน Sprint Review */}
                  <td><img className='Eva' src="https://cdn-icons-png.flaticon.com/128/334/334345.png" alt="Evaluate" /></td> {/* ไอคอน Evaluate */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer /> {/* แสดง Footer */}
    </div>
  );
}

export default Homepage;
