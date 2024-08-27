import React, { useState, useRef } from 'react';
import './BLProject.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/footer';
import NavbarMentor from '../component/navbar_mentor';
import ImageModal from '../component/ImageModal';

const ProductBacklog = () => {
  const navigate = useNavigate(); // ใช้เพื่อเปลี่ยนหน้าเมื่อคลิกที่ปุ่ม

  const GotoPDBacklog = () => {
    navigate('/PDBacklog'); // ฟังก์ชันเพื่อเปลี่ยนหน้าไปที่ PDBacklog
  };

  const GotoDailyscrum = () => {
    navigate('/Dailyscrum'); // ฟังก์ชันเพื่อเปลี่ยนหน้าไปที่ Dailyscrum
  };

  // ตั้งค่า state สำหรับข้อมูลในตาราง
  const [tableData, setTableData] = useState([
    {
      order: 1,
      sprint: 1,
      datestart: "21/03/2547",
      dateend: "22/03/2547",
      type: "Test",
      detail: "Test",
      beforeImg: "/src/img/dasbourd.png",
      afterImg: "/src/img/dasbourd.png",
      manday: 1,
      responsible: "ซัน",
      status: "To Do",
      increment: "21/05/2547",
      remark: "ด่วน",
    }
  ]);

  // สร้าง state เพื่อจัดการแถวใหม่ที่ผู้ใช้เพิ่มเข้ามา
  const [newRow, setNewRow] = useState(null);
  const [editRowIndices, setEditRowIndices] = useState([]); // เก็บ index ของแถวที่กำลังถูกแก้ไข
  const [orderCounter, setOrderCounter] = useState(tableData.length + 1); // ตัวนับสำหรับหมายเลขออร์เดอร์
  const [modalImageUrl, setModalImageUrl] = useState(null); // สำหรับจัดการ URL ของรูปภาพในโมดอล
  const beforeImgRef = useRef([]); // เก็บ reference ของ input ก่อนการแก้ไข
  const afterImgRef = useRef([]); // เก็บ reference ของ input หลังการแก้ไข

  // ฟังก์ชันสำหรับเพิ่มแถวใหม่ในตาราง
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

  // ฟังก์ชันสำหรับบันทึกแถวใหม่ที่ถูกเพิ่มเข้ามา
  const saveRow = () => {
    const requiredFields = ['sprint', 'datestart', 'dateend', 'type', 'detail', 'beforeImg', 'afterImg', 'manday', 'responsible', 'status', 'increment', 'remark'];
    const isValid = requiredFields.every(field => newRow[field]);

    if (isValid) {
      setTableData([...tableData, newRow]); // เพิ่มแถวใหม่เข้าไปในตาราง
      setNewRow(null); // รีเซ็ตค่าแถวใหม่
      setOrderCounter(orderCounter + 1); // เพิ่มตัวนับ order
    } else {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่องก่อนบันทึก"); // แสดงข้อความเตือนหากข้อมูลไม่ครบ
    }
  };

  // ฟังก์ชันสำหรับยกเลิกการเพิ่มแถวใหม่
  const cancelRow = () => {
    setNewRow(null);

  };

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของค่าใน input ของแต่ละแถว
  const handleChange = (e, field, index = null) => {
    const value = e.target.value;
    if (index !== null) {
      const updatedTableData = tableData.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      );
      setTableData(updatedTableData);
    } else {
      setNewRow({ ...newRow, [field]: value });
    }
  };

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของรูปภาพ
  const handleImageChange = (e, field, index = null) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (index !== null) {
        const updatedTableData = tableData.map((row, i) =>
          i === index ? { ...row, [field]: imageUrl } : row
        );
        setTableData(updatedTableData);
      } else {
        setNewRow({ ...newRow, [field]: imageUrl });
      }
    }
  };

  // ฟังก์ชันสำหรับจัดการการลบรูปภาพ
  const handleImageDelete = (field, index = null) => {
    if (index !== null) {
      const updatedTableData = tableData.map((row, i) =>
        i === index ? { ...row, [field]: "" } : row
      );
      setTableData(updatedTableData);
      if (field === 'beforeImg') {
        beforeImgRef.current[index].value = null;
      } else if (field === 'afterImg') {
        afterImgRef.current[index].value = null;
      }
    } else {
      setNewRow({ ...newRow, [field]: "" });
    }
  };

  // ฟังก์ชันสำหรับแปลงวันที่ให้อยู่ในรูปแบบที่ต้องการ
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-EN', options);
  };

  // ฟังก์ชันเริ่มต้นการแก้ไขแถว
  const startEdit = (index) => {
    setEditRowIndices(prevIndices => [...prevIndices, index]); // เพิ่ม index ของแถวที่กำลังแก้ไขลงใน array
  };

  // ฟังก์ชันสำหรับบันทึกการแก้ไขแถว
  const saveEdit = (index) => {
    setEditRowIndices(prevIndices => prevIndices.filter(i => i !== index)); // ลบ index ของแถวที่แก้ไขเสร็จแล้วออกจาก array
  };

  // ฟังก์ชันสำหรับลบแถว
  const deleteRow = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index); // กรองแถวที่ไม่ต้องการออก
    setTableData(updatedTableData);
    setEditRowIndices(prevIndices => prevIndices.filter(i => i !== index)); // ลบ index ของแถวที่ถูกลบออกจาก array
  };

  // ฟังก์ชันสำหรับเปิดโมดอลเพื่อแสดงรูปภาพ
  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  // ฟังก์ชันสำหรับปิดโมดอล
  const closeModal = () => {
    setModalImageUrl(null);
  };

  return (
    <>
      <NavbarMentor /> {/* แสดง Navbar */}
      <div>

        <main className='MBL'>
          <div className='h1-1'>ProductBacklog</div>
          <div className='h2-1'>น้องแดนนี่, น้องกาฟิวส์, น้องเบียร์</div>
          <div className='h3-1'>KM Selg-Learning</div>
          <div className="flex justify-between items-center w-full mt-10 mb-10">
            <img src="/src/img/img_icon/left-arrow.png" className='w-7 ml-10' onClick={GotoPDBacklog} />
            {/* ปุ่มย้อนกลับหน้า PDBacklog */}
            <img src="/src/img/img_icon/left-arrow.png" className="w-7 mr-10 transform rotate-180" onClick={GotoDailyscrum} />
            {/* ปุ่มย้อนกลับหน้า Dailyscrum*/}
          </div>

          <section className="backlog-table">
            <div className="table-container">
              <table className="fixed-table">
                <thead >
                  <tr className='linetable'>
                    <th>Number</th>
                    <th>Sprint</th>
                    <th>Notification Date</th>
                    <th>Completion Date</th>
                    <th>Type of work</th>
                    <th>Details</th>
                    <th>Before</th>
                    <th>After</th>
                    <th>Manday</th>
                    <th>Responsible Person</th>
                    <th>Status</th>
                    <th>Product Increment</th>
                    <th>Note</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {/* แสดงข้อมูลแต่ละแถวในตาราง */}
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      {editRowIndices.includes(index) ? (
                        <>
                          <td>{row.order}</td>
                          <td><input type="number" value={row.sprint} onChange={(e) => handleChange(e, 'sprint', index)} className='IP-1' min="0" step="1" /></td>
                          <td><input type="date" value={row.datestart} onChange={(e) => handleChange(e, 'datestart', index)} className='IP-2' /></td>
                          <td><input type="date" value={row.dateend} onChange={(e) => handleChange(e, 'dateend', index)} className='IP-2' /></td>
                          <td><textarea placeholder="โปรดระบุ" type="text" value={row.type} onChange={(e) => handleChange(e, 'type', index)} className='IP-1' /></td>
                          <td><textarea placeholder="โปรดระบุ" type="text" value={row.detail} onChange={(e) => handleChange(e, 'detail', index)} className='IP-1' /></td>
                          <td>
                            <label className="file-input" style={{ backgroundColor: 'white' }}>
                              <input
                                type="file"
                                onChange={(e) => handleImageChange(e, 'beforeImg', index)}
                                ref={el => beforeImgRef.current[index] = el}
                              />
                              {row.beforeImg ? (
                                <>
                                  <img src={row.beforeImg} alt="Before Preview" className='img-KM-1' onClick={() => openModal(row.beforeImg)} style={{ width: '95px', height: '45px' }} />
                                  <img src="/src/img/img_icon/bin.png" alt="Delete" className='delete-icon' onClick={() => handleImageDelete('beforeImg', index)} />
                                </>
                              ) : (
                                <img src="/src/img/img_icon/add-button.png" alt="Upload" className='UL-IM' />
                              )}
                            </label>
                          </td>
                          <td>
                            <label className="file-input" style={{ backgroundColor: 'white' }}>
                              <input
                                type="file"
                                onChange={(e) => handleImageChange(e, 'afterImg', index)}
                                ref={el => afterImgRef.current[index] = el}
                              />
                              {row.afterImg ? (
                                <>
                                  <img src={row.afterImg} alt="After Preview" className='img-KM-1' onClick={() => openModal(row.afterImg)} style={{ width: '95px', height: '45px' }} />
                                  <img src="/src/img/img_icon/bin.png" alt="Delete" className='delete-icon' onClick={() => handleImageDelete('afterImg', index)} />
                                </>
                              ) : (
                                <img src="/src/img/img_icon/add-button.png" alt="Upload" className='UL-IM' />
                              )}
                            </label>
                          </td>
                          <td><input type="number" value={row.manday} onChange={(e) => handleChange(e, 'manday', index)} className='IP-1' min="0" step="1" /></td>
                          <td><textarea placeholder="โปรดระบุ" type="text" value={row.responsible} onChange={(e) => handleChange(e, 'responsible', index)} className='IP-1' /></td>
                          <td>
                            <select
                              value={row.status || ""}
                              onChange={(e) => handleChange(e, 'status', index)}
                              className='IP-1'
                              style={{
                                color: row.status === 'To do' ? 'blue' : row.status === 'Done' ? 'green' : ''
                              }}
                            >
                              <option value="" disabled hidden>เลือกสถานะ</option>
                              <option value="To do" className="option-todo">To do</option>
                              <option value="Done" className="option-done">Done</option>
                            </select>
                          </td>
                          <td><input type="date" value={row.increment} onChange={(e) => handleChange(e, 'increment', index)} className='IP-2' /></td>
                          <td><textarea placeholder="โปรดระบุ" type="text" value={row.remark} onChange={(e) => handleChange(e, 'remark', index)} className='IP-1' /></td>
                          <td>
                            <button onClick={() => saveEdit(index)} className='save-button'>บันทึก</button>
                            <button onClick={() => deleteRow(index)} className='Deleterow-button'>ลบ</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{row.order}</td>
                          <td>{row.sprint}</td>
                          <td>{formatDate(row.datestart)}</td>
                          <td>{formatDate(row.dateend)}</td>
                          <td>{row.type}</td>
                          <td>{row.detail}</td>
                          <td><img src={row.beforeImg} alt="Before" className='img-KM' onClick={() => openModal(row.beforeImg)} /></td>
                          <td><img src={row.afterImg} alt="After" className='img-KM' onClick={() => openModal(row.afterImg)} /></td>
                          <td>{row.manday}</td>
                          <td>{row.responsible}</td>
                          <td
                            className={row.status === "To Do" ? "option-todo" : "option-done"}
                            style={{
                              color: row.status === 'To do' ? 'blue' : row.status === 'Done' ? 'green' : ''
                            }}
                          >
                            {row.status}
                          </td>
                          <td>{formatDate(row.increment)}</td>
                          <td>{row.remark}</td>
                          <td>
                            <img src="/src/img/img_icon/Edit.png" alt="Edit" className='edit-icon' onClick={() => startEdit(index)} />
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {newRow && (
                    <tr>
                      <td>{newRow.order}</td>
                      <td ><input type="number" value={newRow.sprint} onChange={(e) => handleChange(e, 'sprint')} className='IP-1' min="0" step="1" /></td>
                      <td><input type="date" value={newRow.datestart} onChange={(e) => handleChange(e, 'datestart')} className='IP-2' /></td>
                      <td><input type="date" value={newRow.dateend} onChange={(e) => handleChange(e, 'dateend')} className='IP-2' /></td>
                      <td><textarea placeholder="โปรดระบุ" type="text" value={newRow.type} onChange={(e) => handleChange(e, 'type')} className='IP-1' /></td>
                      <td><textarea placeholder="โปรดระบุ" type="text" value={newRow.detail} onChange={(e) => handleChange(e, 'detail')} className='IP-1' /></td>
                      <td>

                        <label className="file-input" style={{ backgroundColor: 'white' }}>
                          <input
                            type="file"
                            onChange={(e) => handleImageChange(e, 'beforeImg')}
                          />
                          {newRow.beforeImg ? (
                            <>
                              <img src={newRow.beforeImg} alt="Before Preview" className='img-KM-1' onClick={() => openModal(newRow.beforeImg)} style={{ width: '95px', height: '45px' }} />
                              <img src="/src/img/img_icon/bin.png" alt="Delete" className='delete-icon' onClick={() => handleImageDelete('beforeImg')} />
                            </>
                          ) : (
                            <img src="/src/img/img_icon/add-button.png" alt="Upload" className='UL-IM' />
                          )}
                        </label>
                      </td>
                      <td>
                        <label className="file-input" style={{ backgroundColor: 'white' }}>
                          <input
                            type="file"
                            onChange={(e) => handleImageChange(e, 'afterImg')}
                          />
                          {newRow.afterImg ? (
                            <>
                              <img src={newRow.afterImg} alt="After Preview" className='img-KM-1' onClick={() => openModal(newRow.afterImg)} style={{ width: '95px', height: '45px' }} />
                              <img src="/src/img/img_icon/bin.png" alt="Delete" className='delete-icon' onClick={() => handleImageDelete('afterImg')} />
                            </>
                          ) : (
                            <img src="/src/img/img_icon/add-button.png" alt="Upload" className='UL-IM' />
                          )}
                        </label>
                      </td>
                      <td><input type="number" value={newRow.manday} onChange={(e) => handleChange(e, 'manday')} className='IP-1' min="0" step="1" /></td>
                      <td><textarea placeholder="โปรดระบุ" type="text" value={newRow.responsible} onChange={(e) => handleChange(e, 'responsible')} className='IP-1' /></td>
                      <td>
                        <select
                          value={newRow.status || ""}
                          onChange={(e) => handleChange(e, 'status')}
                          className='IP-1'
                          style={{
                            color: newRow.status === 'To do' ? 'blue' : newRow.status === 'Done' ? 'green' : ''
                          }}
                        >
                          <option value="" disabled hidden>เลือกสถานะ</option>
                          <option value="To do" className="option-todo">To do</option>
                          <option value="Done" className="option-done">Done</option>
                        </select>
                      </td>
                      <td><input type="date" value={newRow.increment} onChange={(e) => handleChange(e, 'increment')} className='IP-2' /></td>
                      <td><textarea placeholder="โปรดระบุ" type="text" value={newRow.remark} onChange={(e) => handleChange(e, 'remark')} className='IP-1' /></td>
                      <td>
                        <button onClick={saveRow} className='save-button'>บันทึก</button>
                        <button onClick={cancelRow} className='cancel-button'>ยกเลิก</button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div style={{display:'flex',justifyContent:'right', marginRight:'50px'}}>
              {!newRow && (
                <img src="/src/img/img_icon/plus.png" alt="Add" className='add-buttonz' onClick={addRow} />)}
            </div>
          </section>
        </main>
      </div>
      <Footer /> {/* แสดง Footer */}
      <ImageModal show={modalImageUrl !== null} imageUrl={modalImageUrl} onClose={closeModal} /> {/* แสดง modal สำหรับรูปภาพ */}
    </>
  );
};

export default ProductBacklog;
