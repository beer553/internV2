import React, { useState } from 'react';
import './BLProject.css';
import { useNavigate } from 'react-router-dom';

const ProductBacklog = () => {
  const navigate = useNavigate();

  const Home = () => {
    navigate('/Homepage');
  };

  const GotoBL = () => {
    navigate('/PDBacklog');
  };

  const [tableData, setTableData] = useState([
    {
      order: 1,
      sprint: 1,
      datestart: "",
      dateend: "",
      type: "แก้ Assessment Report",
      detail: "ปรับข้อความจากไทยเป็นอังกฤษ",
      beforeImg: "/src/img/KM.png",
      afterImg: "/src/img/KM.png",
      manday: 1,
      responsible: "เจ,ซัน",
      status: "To do",
      increment: "17-3-2024",
      remark: "ด่วนๆ"
    },
    {
      order: 2,
      sprint: 1,
      datestart: "",
      dateend: "",
      type: "*******",
      detail: "*******",
      beforeImg: "/src/img/KM.png",
      afterImg: "/src/img/KM.png",
      manday: "*",
      responsible: "*******",
      status: "Done",
      increment: "",
      remark: "-"
    }
  ]);

  const [newRow, setNewRow] = useState(null);
  const [orderCounter, setOrderCounter] = useState(tableData.length + 1); // Initialize counter

  const addRow = () => {
    setNewRow({
      order: orderCounter,
      sprint: "",
      datestart: "",
      dateend: "",
      type: "",
      detail: "",
      beforeImg: "",
      afterImg: "",
      manday: "",
      responsible: "",
      status: "",
      increment: "",
      remark: ""
    });
  };

  const saveRow = () => {
    setTableData([...tableData, newRow]);
    setNewRow(null);
    setOrderCounter(orderCounter + 1); // Increment counter
  };

  const handleChange = (e, field) => {
    setNewRow({ ...newRow, [field]: e.target.value });
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setNewRow({ ...newRow, [field]: URL.createObjectURL(file) });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-EN', options);
  };

  return (
    <div className="product-backlog">
      <header className="header">
        <div className="header-left">
          <div className="hamburger-menu">
            <img src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png" alt="Menubar" />
          </div>
          <img className='scg' src="https://www.watsadupedia.com/images/2/2c/Scg.png" alt="SCG Logo." onClick={Home} />
        </div>
        <div className="header-center">
        </div>
        <div className="mentor">
          <span>Mentor<br />Star</span>
          <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Mentor" className="mentor-img" />
        </div>
      </header>
      <main>
        <div className='h1-1'>ProductBacklog</div>
        <div className='h2-1'>น้องเจ,น้องณเดช,น้องไนท์</div>
        <div className='h3-1'>ระบบ KM</div>

        <div className='back-th-1'>
          <img src="https://cdn-icons-png.flaticon.com/128/130/130882.png" alt="ย้อนกลับ" className='back-1' onClick={GotoBL} />
          {/* <div className='back-th'>ย้อนกลับ</div> */}
        </div>

        <section className="backlog-table">
          <div className="table-container">
            <table className="fixed-table">
              <thead>
                <tr className='table-2'>
                  <th>Number</th>
                  <th>Sprint</th>
                  <th>Notification date</th>
                  <th>Completion date</th>
                  <th>Type of work</th>
                  <th>Details</th>
                  <th>Before</th>
                  <th>After</th>
                  <th>Manday</th>
                  <th>Responsible Person</th>
                  <th>Status</th>
                  <th>Product Increment</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.order}</td>
                    <td>{row.sprint}</td>
                    <td>{formatDate(row.datestart)}</td>
                    <td>{formatDate(row.dateend)}</td>
                    <td>{row.type}</td>
                    <td>{row.detail}</td>
                    <td><img src={row.beforeImg} alt="Before" className='img-KM' /></td>
                    <td><img src={row.afterImg} alt="After" className='img-KM' /></td>
                    <td>{row.manday}</td>
                    <td>{row.responsible}</td>
                    <td>{row.status}</td>
                    <td>{formatDate(row.increment)}</td>
                    <td>{row.remark}</td>
                  </tr>
                ))}
                {newRow && (
                  <tr>
                    <td>{newRow.order}</td>
                    <td><input type="text" value={newRow.sprint} onChange={(e) => handleChange(e, 'sprint')} className='IP-1' /></td>
                    <td><input type="date" value={newRow.datestart} onChange={(e) => handleChange(e, 'datestart')} className='IP-2' /></td>
                    <td><input type="date" value={newRow.dateend} onChange={(e) => handleChange(e, 'dateend')} className='IP-2' /></td>
                    <td><input type="text" value={newRow.type} onChange={(e) => handleChange(e, 'type')} className='IP-1' /></td>
                    <td><input type="text" value={newRow.detail} onChange={(e) => handleChange(e, 'detail')} className='IP-1' /></td>
                    <td>
                      <label className="file-input">
                        <input type="file" onChange={(e) => handleImageChange(e, 'beforeImg')} />
                        {newRow.beforeImg ? (
                          <img src={newRow.beforeImg} alt="Before Preview" className='img-KM' />
                        ) : (
                          <img src="https://cdn-icons-png.flaticon.com/128/8371/8371357.png" alt="Upload" className='img-KM' />
                        )}
                      </label>
                    </td>
                    <td>
                      <label className="file-input">
                        <input type="file" onChange={(e) => handleImageChange(e, 'afterImg')} />
                        {newRow.afterImg ? (
                          <img src={newRow.afterImg} alt="After Preview" className='img-KM' />
                        ) : (
                          <img src="https://cdn-icons-png.flaticon.com/128/8371/8371357.png" alt="Upload" className='img-KM' />
                        )}
                      </label>
                    </td>
                    <td><input type="text" value={newRow.manday} onChange={(e) => handleChange(e, 'manday')} className='IP-1' /></td>
                    <td><input type="text" value={newRow.responsible} onChange={(e) => handleChange(e, 'responsible')} className='IP-1' /></td>
                    <td><input type="text" value={newRow.status} onChange={(e) => handleChange(e, 'status')} className='IP-1' /></td>
                    <td><input type="date" value={newRow.increment} onChange={(e) => handleChange(e, 'increment')} className='IP-2'/></td>
                    <td><input type="text" value={newRow.remark} onChange={(e) => handleChange(e, 'remark')} className='IP-1' /></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {newRow ? (
            <button onClick={saveRow} className='save-button'>ยืนยัน</button>
          ) : (
            <img src="https://cdn-icons-png.flaticon.com/128/4315/4315609.png" alt="Add" className='add-button' onClick={addRow} />
          )}
        </section>
      </main>
      <footer className="footer-1">
        <p>ติดต่อสอบถาม DX Manpower Managemant</p>
        <p>คุณสุพรรษา ม. supansak@scg.com</p>
        <p>Digital Transformation Architect (Data Driven-TS)</p>
        <p>Created by Sunsa M and Pantakit S & Developed by Phurin C</p>
        <p>©SCG 2024</p>
      </footer>
    </div>
  );
};

export default ProductBacklog;
