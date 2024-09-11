import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/footer';
import NavbarMentor from '../component/navbar_mentor';
import ImageModal from '../component/ImageModal';

const ProductBacklog = () => {
  const navigate = useNavigate();

  const GotoPDBacklog = () => {
    navigate('/PDBacklog');
  };

  const GotoDailyscrum = () => {
    navigate('/Dailyscrum');
  };

  const [tableData, setTableData] = useState([
    {
      order: 1,
      sprint: 1,
      datestart: "21/03/2547",
      dateend: "22/03/2547",
      type: "Test",
      detail: "Test",
      beforeImg: "/src/img/dashboard.png",
      afterImg: "/src/img/dashboard.png",
      manday: 1,
      responsible: "ซัน",
      status: "To Do",
      increment: "21/05/2547",
      remark: "ด่วน",
    }
  ]);

  const [newRow, setNewRow] = useState(null);
  const [editRowIndices, setEditRowIndices] = useState([]);
  const [orderCounter, setOrderCounter] = useState(tableData.length + 1);
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const beforeImgRef = useRef([]);
  const afterImgRef = useRef([]);

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
    const requiredFields = ['sprint', 'datestart', 'dateend', 'type', 'detail', 'beforeImg', 'afterImg', 'manday', 'responsible', 'status', 'increment', 'remark'];
    const isValid = requiredFields.every(field => newRow[field]);

    if (isValid) {
      setTableData([...tableData, newRow]);
      setNewRow(null);
      setOrderCounter(orderCounter + 1);
    } else {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่องก่อนบันทึก");
    }
  };

  const cancelRow = () => {
    setNewRow(null);
  };

  const handleChange = (e, field, index = null) => {
    let value = e.target.value;

    // จัดรูปแบบวันที่เป็น "วัน/เดือน/ปี"
    if (field === 'datestart' || field === 'dateend' || field === 'increment') {
      const [year, month, day] = value.split('-');
      value = `${day}/${month}/${year}`;
    }

    if (index !== null) {
      const updatedTableData = tableData.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      );
      setTableData(updatedTableData);
    } else {
      setNewRow({ ...newRow, [field]: value });
    }
  };

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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split('/');
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  };

  const startEdit = (index) => {
    setEditRowIndices(prevIndices => [...prevIndices, index]);
  };

  const saveEdit = (index) => {
    setEditRowIndices(prevIndices => prevIndices.filter(i => i !== index));
  };

  const deleteRow = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index);
    setTableData(updatedTableData);
    setEditRowIndices(prevIndices => prevIndices.filter(i => i !== index));
  };

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  const closeModal = () => {
    setModalImageUrl(null);
  };

  return (
    <div>
      <NavbarMentor />
      <div className='container mx-auto'>
        <main className=''>
          <div className='text-gray-600 text-[45px]'>ProductBacklog</div>
          <div className='text-gray-600 text-[25px]'>น้องแดนนี่, น้องกาฟิวส์, น้องเบียร์</div>
          <div className='mt-1 text-gray-600 text-[25px]'>KM Selg-Learning</div>
          <div className="flex justify-between items-center w-full mt-5 mb-5">
            <img src="/src/img/img_icon/left-arrow.png" className='w-7 ml-10' onClick={GotoPDBacklog} />
            <img src="/src/img/img_icon/left-arrow.png" className="w-7 mr-10 transform rotate-180" onClick={GotoDailyscrum} />
          </div>

          <section className="overflow-x-auto">
            <div className="overflow-x-auto">
              <table className="table-auto w-[190%]">
                <thead >
                  <tr className='border-b-2 border-black text-[25px]'>
                    <th className="w-[5%] h-8">Number</th>
                    <th className="w-[5%] h-8">Sprint</th>
                    <th className="w-[5%] h-8">Notification Date</th>
                    <th className="w-[5%] h-8">Completion Date</th>
                    <th className="w-[5%] h-8">Type of work</th>
                    <th className="w-[5%] h-8">Details</th>
                    <th className="w-[5%] h-8">Before</th>
                    <th className="w-[5%] h-8">After</th>
                    <th className="w-[5%] h-8">Manday</th>
                    <th className="w-[5%] h-8">Responsible Person</th>
                    <th className="w-[5%] h-8">Status</th>
                    <th className="w-[5%] h-8">Product Increment</th>
                    <th className="w-[5%] h-8">Note</th>
                    <th className="w-[5%] h-8">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      {editRowIndices.includes(index) ? (
                        <>
                          <td className='text-[20px]'>{row.order}</td>
                          <td><input type="number" value={row.sprint} onChange={(e) => handleChange(e, 'sprint', index)} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-3' min="0" step="1" /></td>
                          <td className="relative">
                            <input type="date" value={row.datestart.split('/').reverse().join('-')} onChange={(e) => handleChange(e, 'datestart', index)} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-3' />
                          </td>
                          <td className="relative">
                            <input type="date" value={row.dateend.split('/').reverse().join('-')} onChange={(e) => handleChange(e, 'dateend', index)} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-3' />
                          </td>
                          <td><textarea placeholder="โปรดระบุ" type="text" value={row.type} onChange={(e) => handleChange(e, 'type', index)} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-[20px]' /></td>
                          <td><textarea placeholder="โปรดระบุ" type="text" value={row.detail} onChange={(e) => handleChange(e, 'detail', index)} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-[20px]' /></td>
                          <td>
                            <label className="w-full bg-white flex flex-col items-center">
                              <input
                                type="file"
                                onChange={(e) => handleImageChange(e, 'beforeImg', index)}
                                ref={el => beforeImgRef.current[index] = el}
                                className="hidden"
                              />
                              {row.beforeImg ? (
                                <>
                                  <img src={row.beforeImg} alt="Before Preview" className='object-cover w-28 h-16 cursor-pointer mt-5' onClick={() => openModal(row.beforeImg)} />
                                  <img src="/src/img/img_icon/bin.png" alt="Delete" className='w-6 h-6 cursor-pointer mt-2' onClick={() => handleImageDelete('beforeImg', index)} />
                                </>
                              ) : (
                                <img src="/src/img/img_icon/add-button.png" alt="Upload" className='w-6 h-6 cursor-pointer' />
                              )}
                            </label>
                          </td>
                          <td>
                            <label className="w-full bg-white flex flex-col items-center">
                              <input
                                type="file"
                                onChange={(e) => handleImageChange(e, 'afterImg', index)}
                                ref={el => afterImgRef.current[index] = el}
                                className="hidden"
                              />
                              {row.afterImg ? (
                                <>
                                  <img src={row.afterImg} alt="After Preview" className='object-cover w-28 h-16 cursor-pointer mt-5' onClick={() => openModal(row.afterImg)} />
                                  <img src="/src/img/img_icon/bin.png" alt="Delete" className='w-6 h-6 cursor-pointer mt-2' onClick={() => handleImageDelete('afterImg', index)} />
                                </>
                              ) : (
                                <img src="/src/img/img_icon/add-button.png" alt="Upload" className='w-6 h-6 cursor-pointer' />
                              )}
                            </label>
                          </td>
                          <td><input type="number" value={row.manday} onChange={(e) => handleChange(e, 'manday', index)} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-3' min="0" step="1" /></td>
                          <td><textarea placeholder="โปรดระบุ" type="text" value={row.responsible} onChange={(e) => handleChange(e, 'responsible', index)} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-[20px]' /></td>
                          <td>
                            <select
                              value={row.status}
                              onChange={(e) => handleChange(e, 'status', index)}
                              className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-3'
                              style={{ color: row.status === 'To Do' ? 'blue' : row.status === 'Done' ? 'green' : '' }}
                            >
                              <option value="To Do" className="text-blue-500">To Do</option>
                              <option value="Done" className="text-green-500">Done</option>
                            </select>
                          </td>

                          <td><input type="date" value={row.increment.split('/').reverse().join('-')} onChange={(e) => handleChange(e, 'increment', index)} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-3' /></td>
                          <td><textarea placeholder="โปรดระบุ" type="text" value={row.remark} onChange={(e) => handleChange(e, 'remark', index)} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-[20px]' /></td>
                          <td>
                            <button onClick={() => saveEdit(index)} className='bg-green-500 text-white rounded-lg h-10 w-24 text-[25px]'>บันทึก</button>
                            <button onClick={() => deleteRow(index)} className='bg-red-500 text-white rounded-lg h-10 w-24 mt-1 text-[25px] ml-2'>ลบ</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className='text-[20px]'>{row.order}</td>
                          <td className='text-[20px]'>{row.sprint}</td>
                          <td className='text-[20px]'>{formatDate(row.datestart)}</td>
                          <td className='text-[20px]'>{formatDate(row.dateend)}</td>
                          <td className='text-[20px]'>{row.type}</td>
                          <td className='text-[20px]'>{row.detail}</td>
                          <td>
                            <div className="flex justify-center items-center mt-3">
                              <img src={row.beforeImg} alt="Before" className='object-cover w-28 h-16 cursor-pointer' onClick={() => openModal(row.beforeImg)} />
                            </div>
                          </td>
                          <td>
                            <div className="flex justify-center items-center mt-3">
                              <img src={row.afterImg} alt="After" className='object-cover w-28 h-16 cursor-pointer' onClick={() => openModal(row.afterImg)} />
                            </div>
                          </td>
                          <td className='text-[20px]'>{row.manday}</td>
                          <td className='text-[20px]'>{row.responsible}</td>
                          <td className={row.status === "To Do" ? "text-blue-500 text-[20px]" : "text-green-500 text-[20px]"}>{row.status}</td>
                          <td className='text-[20px]'>{formatDate(row.increment)}</td>
                          <td className='text-[20px]'>{row.remark}</td>
                          <td>
                            <div className="flex justify-center items-center mt-3">
                              <img src="/src/img/img_icon/Edit.png" alt="Edit" className='w-10 h-10 cursor-pointer' onClick={() => startEdit(index)} />
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {newRow && (
                    <tr>
                      <td className='text-[20px]'>{newRow.order}</td>
                      <td><input type="number" value={newRow.sprint} onChange={(e) => handleChange(e, 'sprint')} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-3' min="0" step="1" /></td>
                      <td><input type="date" value={newRow.datestart.split('/').reverse().join('-')} onChange={(e) => handleChange(e, 'datestart')} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-3' /></td>
                      <td><input type="date" value={newRow.dateend.split('/').reverse().join('-')} onChange={(e) => handleChange(e, 'dateend')} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-3' /></td>
                      <td><textarea placeholder="โปรดระบุ" type="text" value={newRow.type} onChange={(e) => handleChange(e, 'type')} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-[22px]' /></td>
                      <td><textarea placeholder="โปรดระบุ" type="text" value={newRow.detail} onChange={(e) => handleChange(e, 'detail')} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-[22px]' /></td>
                      <td>
                        <label className="w-full bg-white flex flex-col items-center">
                          <input
                            type="file"
                            onChange={(e) => handleImageChange(e, 'beforeImg')}
                            className="hidden"
                          />
                          {newRow.beforeImg ? (
                            <>
                              <img src={newRow.beforeImg} alt="Before Preview" className='object-cover w-28 h-16 cursor-pointer mt-5' onClick={() => openModal(newRow.beforeImg)} />
                              <img src="/src/img/img_icon/bin.png" alt="Delete" className='w-6 h-6 cursor-pointer mt-2' onClick={() => handleImageDelete('beforeImg')} />
                            </>
                          ) : (
                            <img src="/src/img/img_icon/add-button.png" alt="Upload" className='w-6 h-6 cursor-pointer' />
                          )}
                        </label>
                      </td>
                      <td>
                        <label className="w-full bg-white flex flex-col items-center">
                          <input
                            type="file"
                            onChange={(e) => handleImageChange(e, 'afterImg')}
                            className="hidden"
                          />
                          {newRow.afterImg ? (
                            <>
                              <img src={newRow.afterImg} alt="After Preview" className='object-cover w-28 h-16 cursor-pointer mt-5' onClick={() => openModal(newRow.afterImg)} />
                              <img src="/src/img/img_icon/bin.png" alt="Delete" className='w-6 h-6 cursor-pointer mt-2' onClick={() => handleImageDelete('afterImg')} />
                            </>
                          ) : (
                            <img src="/src/img/img_icon/add-button.png" alt="Upload" className='w-6 h-6 cursor-pointer' />
                          )}
                        </label>
                      </td>
                      <td><input type="number" value={newRow.manday} onChange={(e) => handleChange(e, 'manday')} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-3' min="0" step="1" /></td>
                      <td><textarea placeholder="โปรดระบุ" type="text" value={newRow.responsible} onChange={(e) => handleChange(e, 'responsible')} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-[22px]' /></td>
                      <td>
                        <select
                          value={newRow.status || ""}
                          onChange={(e) => handleChange(e, 'status')}
                          className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-3'
                          style={{
                            color: newRow.status === 'To Do' ? 'blue' : newRow.status === 'Done' ? 'green' : ''
                          }}
                        >
                          <option value="To Do" className="text-blue-500">To Do</option>
                          <option value="Done" className="text-green-500">Done</option>
                        </select>
                      </td>

                      <td><input type="date" value={newRow.increment.split('/').reverse().join('-')} onChange={(e) => handleChange(e, 'increment')} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-3' /></td>
                      <td><textarea placeholder="โปรดระบุ" type="text" value={newRow.remark} onChange={(e) => handleChange(e, 'remark')} className='w-[95%] bg-white rounded-md h-[35px] border-2 border-gray-300 text-[20px] mt-[22px]' /></td>
                      <td>
                        <button onClick={saveRow} className='bg-green-500 text-white rounded-lg h-10 w-24 text-[25px]'>บันทึก</button>
                        <button onClick={cancelRow} className='bg-red-500 text-white rounded-lg h-10 w-24 mt-1 text-[25px] ml-2'>ยกเลิก</button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className='flex justify-end mr-12'>
              {!newRow && (
                <img src="/src/img/img_icon/plus.png" alt="Add" className='w-10 h-10 mt-8 mb-16 cursor-pointer' onClick={addRow} />)}
            </div>
            <div className='mb-20'></div>
          </section>
        </main>
      </div>
      <Footer />
      <ImageModal show={modalImageUrl !== null} imageUrl={modalImageUrl} onClose={closeModal} />
    </div>
  );
};

export default ProductBacklog;
