import React from 'react';
import './PDBacklog.css'; // นำเข้าไฟล์ CSS สำหรับจัดการรูปแบบของหน้า
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทางไปยังหน้าต่างๆ
import NavbarIntern from '../component/navbar_intern'; // นำเข้า NavbarIntern component
import Footer from '../component/footer'; // นำเข้า Footer component

const ProductBacklog = () => {
  const navigate = useNavigate(); // สร้างตัวแปร navigate เพื่อใช้ในการเปลี่ยนหน้า

  // ฟังก์ชันสำหรับนำทางไปยังหน้า BLProject (เมื่อคลิกที่ไอคอน Backlog)
  const gotoKM = () => {
    navigate('/BLProject');
  };

  // ฟังก์ชันสำหรับนำทางกลับไปยังหน้า Homepage (เมื่อคลิกที่ปุ่มย้อนกลับ)
  const Homepage = () => {
    navigate('/Homepage');

  };

  return (
    <div className='body-PDB'>
      <header>
        <NavbarIntern /> {/* แสดง NavbarIntern */}
      </header>
      
      <main className='main-1'>
        <div className='BL-img'>
          <img src="/src/img/img_icon/backlog.png" alt="ProductBacklog" className='BL' /> {/* รูปภาพสำหรับ Product Backlog */}
          <div className='BL-1'>Product Backlog</div> {/* ชื่อหน้า Product Backlog */}
          <div className="back-button-container">
            <img src="/src/img/img_icon/back-button.png" className="back-PDB" onClick={Homepage} /> {/* ปุ่มย้อนกลับไปหน้า Homepage */}
          </div>
        </div>
        <table className='table-1'>
          <thead>
            <tr className='table-2'>
              <th className='th-1'>ลำดับ</th> {/* หัวข้อคอลัมน์: ลำดับ */}
              <th className='th-1'>วันที่เริ่ม</th> {/* หัวข้อคอลัมน์: วันที่เริ่ม */}
              <th className='th-1'>กำหนดรับ</th> {/* หัวข้อคอลัมน์: กำหนดรับ */}
              <th className='th-1'>ชื่อโปรเจค</th> {/* หัวข้อคอลัมน์: ชื่อโปรเจค */}
              <th className='th-1'>ผู้ดูแล</th> {/* หัวข้อคอลัมน์: ผู้ดูแล */}
              <th className='th-1'>สถานะ</th> {/* หัวข้อคอลัมน์: สถานะ */}
              <th className='th-1'>แผนงาน</th> {/* หัวข้อคอลัมน์: แผนงาน */}
              <th className='th-1'>มอบหมายผู้รับผิดชอบ</th> {/* หัวข้อคอลัมน์: มอบหมายผู้รับผิดชอบ */}
              <th className='th-1'>Backlog</th> {/* หัวข้อคอลัมน์: Backlog */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='td-1'>1</td> {/* แสดงลำดับที่ 1 */}
              <td className='td-1'>01/01/2024</td> {/* แสดงวันที่เริ่มต้น */}
              <td className='td-1'>31/03/2024</td> {/* แสดงวันที่กำหนดรับ */}
              <td className='td-1'>KM Selg-Learning</td> {/* แสดงชื่อโปรเจค */}
              <td className='td-1'>ดาว</td> {/* แสดงชื่อผู้ดูแล */}
              <td className='td-1'><span className="status active">กำลังดำเนินงาน</span></td> {/* แสดงสถานะของโปรเจค */}
              <td className='td-1'>...</td> {/* แสดงแผนงาน (ในที่นี้ใช้เป็นสัญลักษณ์ ... เพื่อบอกว่าแผนงานนี้มีข้อมูลเพิ่มเติม) */}
              <td className='td-1'>น้องเจ, น้องณเดช, น้องไนท์</td> {/* แสดงชื่อผู้รับผิดชอบ */}
              <td><span className="backlog-icon" onClick={gotoKM}></span></td> {/* ไอคอน Backlog ที่คลิกได้เพื่อไปยังหน้า BLProject */}
            </tr>
            <tr>
              <td className='td-1'>2</td> {/* แสดงลำดับที่ 2 */}
              <td className='td-1'>01/01/2024</td> {/* แสดงวันที่เริ่มต้น */}
              <td className='td-1'>31/03/2024</td> {/* แสดงวันที่กำหนดรับ */}
              <td className='td-1'>Dashboard License</td> {/* แสดงชื่อโปรเจค */}
              <td className='td-1'>ดาว</td> {/* แสดงชื่อผู้ดูแล */}
              <td className='td-1'><span className="status active">กำลังดำเนินงาน</span></td> {/* แสดงสถานะของโปรเจค */}
              <td className='td-1'>...</td> {/* แสดงแผนงาน (ในที่นี้ใช้เป็นสัญลักษณ์ ... เพื่อบอกว่าแผนงานนี้มีข้อมูลเพิ่มเติม) */}
              <td className='td-1'>น้องเจ, น้องณเดช, น้องไนท์</td> {/* แสดงชื่อผู้รับผิดชอบ */}
              <td><button><span className="backlog-icon" onClick={gotoKM}></span></button></td> {/* ไอคอน Backlog ที่คลิกได้เพื่อไปยังหน้า BLProject */}
            </tr>
          </tbody>
        </table>
      </main>
      <Footer /> {/* แสดง Footer */}
    </div>
  );
}

export default ProductBacklog;
