import React from 'react';
import './PDBacklog.css';
import { useNavigate } from 'react-router-dom';

const ProductBacklog = () => {
  const navigate = useNavigate();

  const gotoKM = () => {
    navigate('/BLProject');
  }
  const Homepage = () => {
    navigate('/Homepage');
  }
  const Home = () => {
    navigate('/Homepage');

  };
  return (
    <div className="product-backlog">
      <header className="header">
        <div className="header-left">
          <div className="hamburger-menu">
            <img src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png" alt="Menu" />
          </div>
          <img className='scg' src="https://www.watsadupedia.com/images/2/2c/Scg.png" alt="SCG  Logo" onClick={Home} />
        </div>
        <div className="header-center">
          <div className="search-container">
            <img src="https://cdn-icons-png.flaticon.com/128/751/751463.png" className="search-icon" />
            <input className='search-' type="text" placeholder="Search" />
          </div>
        </div>
        <div className="mentor">
          <span>Mentor<br />Star</span>
          <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Mentor" className="mentor-img" />
        </div>
      </header>
      <button><div><img src="https://cdn-icons-png.flaticon.com/128/130/130882.png" alt="ย้อนกลับ" className="back" onClick={Homepage} /></div></button>
      <main className='main-1'>
        <div className='BL-img'>
          <img src="https://cdn-icons-png.flaticon.com/128/5084/5084624.png" alt="ProductBacklog<" className='BL' />
          <div className='BL-1'>ProductBacklog</div>
        </div>
        <table className='table-1'>
          <thead>
            <tr className='table-2'>
              <th className='th-1'>ลำดับ</th>
              <th className='th-1'>วันที่เริ่ม</th>
              <th className='th-1'>กำหนดรับ</th>
              <th className='th-1'>ชื่อโปรเจค</th>
              <th className='th-1'>ผู้ดูแล</th>
              <th className='th-1'>สถานะ</th>
              <th className='th-1'>แผนงาน</th>
              <th className='th-1'>มอบหมายผู้รับผิดชอบ</th>
              <th className='th-1'>Backlog</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='td-1'>1</td>
              <td className='td-1'>01/01/2024</td>
              <td className='td-1'>31/03/2024</td>
              <td className='td-1'>KM Selg-Learning</td>
              <td className='td-1'> ดาว</td>
              <td><span className="status active">กำลังดำเนินงาน</span></td>
              <td className='td-1'>...</td>
              <td className='td-1'>น้องเจ, น้องณเดช, น้องไนท์</td>
              <td><span className="backlog-icon" onClick={gotoKM}></span></td>
            </tr>
            <tr>
              <td className='td-1'>2</td>
              <td className='td-1'>01/01/2024</td>
              <td className='td-1'>31/03/2024</td>
              <td className='td-1'>Dashboard License</td>
              <td className='td-1'>ดาว</td>
              <td><span className="status active">กำลังดำเนินงาน</span></td>
              <td className='td-1'>...</td>
              <td className='td-1'>น้องเจ, น้องณเดช, น้องไนท์</td>
              <td><button><span className="backlog-icon" onClick={gotoKM}></span></button></td>
            </tr>
          </tbody>
        </table>
      </main>
      <footer className="footer-2">
        <p>ติดต่อสอบถาม DX Manpower Managemant</p>
        <p>คุณสุพรรษา ม. supansak@scg.com</p>
        <p>Digital Transformation Architect (Data Driven-TS)</p>
        <p>Created by Sunsa M and Pantakit S & Developed by Phurin C</p>
        <p>©SCG 2024</p>
      </footer>
    </div>
  );
}

export default ProductBacklog;
