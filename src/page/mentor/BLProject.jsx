import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../component/footer';
import NavbarMentor from '../component/navbar_intern';
import ImageModal from '../component/ImageModal';
import axios from 'axios';

const ProductBacklog = () => {
  const navigate = useNavigate();
  const { project_id } = useParams();
  const [projects, setProjects] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState(null);
  const [orderCounter, setOrderCounter] = useState(1);
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editRowData, setEditRowData] = useState(null);

  const GotoPDBacklog = () => {
    navigate('/PDBacklog');
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (project_id) {
          const response = await axios.get(`http://localhost:8080/mentor/project.php?project_id=${project_id}`);
          if (response.data && response.data.length > 0) {
            setProjects(response.data);
          } else {
            console.error("No project data found");
          }
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };
    fetchProjects();
  }, [project_id]);

  useEffect(() => {
    if (project_id) {
      fetchTableData(project_id);
    }
  }, [project_id]);

  const fetchTableData = async (project_id) => {
    try {
      const response = await axios.get(`http://localhost:8080/mentor/backlog.php?project_id=${project_id}`);
      const data = Array.isArray(response.data) ? response.data : [];
      setTableData(data);
      setOrderCounter(data.length + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTableData([]);
    }
  };

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

  const saveRow = async () => {
    const requiredFields = ['sprint', 'datestart', 'dateend', 'type', 'detail', 'manday', 'responsible', 'status', 'increment', 'remark'];
    const isValid = requiredFields.every(field => newRow[field]);

    if (isValid) {
      try {
        const formData = new FormData();
        formData.append('project_id', project_id);

        Object.keys(newRow).forEach(key => {
          if (key === 'beforeImg' || key === 'afterImg') {
            if (newRow[key] instanceof File) {
              formData.append(key, newRow[key]);
            }
          } else {
            formData.append(key, newRow[key]);
          }
        });

        const response = await axios.post('http://localhost:8080/mentor/backlog.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.backlog_id) {
          fetchTableData(project_id);
          setNewRow(null);
          setOrderCounter(orderCounter + 1);
        }
      } catch (error) {
        console.error("Error saving row:", error);
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่องก่อนบันทึก");
    }
  };

  const cancelRow = () => {
    setNewRow(null);
  };

  const handleNewRowChange = (e, field) => {
    let value = e.target.value;
    e.target.style.color = value === '' ? 'black' : getStatusColor(value); // เปลี่ยนสีฟอนต์เมื่อเลือก
    setNewRow({ ...newRow, [field]: value });
  };


  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setNewRow({ ...newRow, [field]: file });
    }
  };

  const startEdit = (index) => {
    setEditRowIndex(index);
    setEditRowData({ ...tableData[index] });
  };

  const handleImageEditChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setEditRowData({ ...editRowData, [field]: file });
    }
  };

  const saveEdit = async (index) => {
    try {
      const updatedRow = { ...editRowData };

      const formData = new FormData();
      formData.append('backlog_id', updatedRow.backlog_id);
      formData.append('project_id', project_id);
      formData.append('sprint', updatedRow.sprint || tableData[index].sprint);
      formData.append('notificationDate', updatedRow.notificationDate ? new Date(updatedRow.notificationDate).toISOString().split('T')[0] : tableData[index].notificationDate);
      formData.append('completionDate', updatedRow.completionDate ? new Date(updatedRow.completionDate).toISOString().split('T')[0] : tableData[index].completionDate);
      formData.append('type_of_work', updatedRow.type_of_work || tableData[index].type_of_work);
      formData.append('details', updatedRow.details || tableData[index].details);
      formData.append('manday', updatedRow.manday || tableData[index].manday);
      formData.append('teamdevelop', updatedRow.teamdevelop || tableData[index].teamdevelop);
      formData.append('status', updatedRow.status || tableData[index].status);
      formData.append('productIncrement', updatedRow.productIncrement ? new Date(updatedRow.productIncrement).toISOString().split('T')[0] : tableData[index].productIncrement);
      formData.append('note', updatedRow.note || tableData[index].note);

      if (updatedRow.beforeImg instanceof File) {
        formData.append('beforeImg', updatedRow.beforeImg);
      } else {
        formData.append('imgBefore', tableData[index].imgBefore);
      }

      if (updatedRow.afterImg instanceof File) {
        formData.append('afterImg', updatedRow.afterImg);
      } else {
        formData.append('imgAfter', tableData[index].imgAfter);
      }

      const response = await axios.post(`http://localhost:8080/mentor/edit_backlog.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message === 'Backlog updated successfully') {
        const updatedTableData = [...tableData];
        updatedTableData[index] = updatedRow;
        setTableData(updatedTableData);
        setEditRowIndex(null);
        setEditRowData(null);
      } else {
        alert('Error updating backlog');
      }
    } catch (error) {
      console.error('Error saving edited row:', error);
    }
  };

  const cancelEdit = () => {
    setEditRowIndex(null);
    setEditRowData(null);
  };

  const handleEditChange = (e, field) => {
    let value = e.target.value;
    if (field === 'datestart' || field === 'dateend' || field === 'increment') {
      const [year, month, day] = value.split('-');
      value = `${day}/${month}/${year}`;
    }
    setEditRowData({ ...editRowData, [field]: value });
  };

  const formatDateToThai = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    const buddhistYear = parseInt(year, 10) + 543; // แปลงปี ค.ศ. เป็น พ.ศ.
    return `${day}/${month}/${buddhistYear}`;
  };

  const handleImageClick = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  const getStatusColor = (status) => {
    // ฟังก์ชันนี้จะคืนค่าสีตามสถานะ
    return status === 'Done' ? '#155724' : '#004085'; // สีเขียวสำหรับ Done, สีฟ้าสำหรับ To Do
  };

  const deleteRow = async (index) => {
    try {
      const rowToDelete = tableData[index];
      const response = await axios.post('http://localhost:8080/mentor/delete_backlog.php', {
        backlog_id: rowToDelete.backlog_id,
      });

      if (response.data.message === 'Backlog deleted successfully') {
        const updatedTableData = tableData.filter((_, i) => i !== index);
        setTableData(updatedTableData);
      } else {
        alert('Error deleting backlog');
      }
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  return (
    <div>
      <NavbarMentor />
      <div className='container mx-auto'>
        <main>
          <div className='space-y-3 mt-5 bg-white shadow-lg rounded-lg p-4'>
            <div className='text-gray-600 text-[30px]'>ProductBacklog</div>
            <div className='text-gray-600 text-[18px]'>
              {projects.length > 0 && projects[0].projectname ? projects[0].projectname : "No Project Name"}
            </div>
            <div className='text-gray-600 text-[18px]'>
              {projects.length > 0 && projects[0].team_members ? projects[0].team_members : "ยังไม่มอบหมายผู้รับผิดชอบ"}
            </div>
          </div>

          <div className="flex justify-between items-center w-full mt-5 mb-5">
            <img src="/src/img/img_icon/left-arrow.png" className='w-7 ml-10' onClick={GotoPDBacklog} />
            <div className="mr-10" onClick={addRow}>
              <img src="/src/img/img_icon/add-button.png" alt="เพิ่มแถว" className='w-10' />
            </div>
          </div>

          <section className="overflow-x-auto bg-white shadow-lg rounded-lg p-3 mb-5">
            <div className="overflow-x-auto">
              <table className="table-auto w-[180%]">
                <thead>
                  <tr className='border-b-2 border-black text-[22px]'>
                    <th className="w-[4%] h-10">Number</th>
                    <th className="w-[4%] h-10">Sprint</th>
                    <th className="w-[7%] h-10">Notification Date</th>
                    <th className="w-[7%] h-10">Completion Date</th>
                    <th className="w-[8%] h-10">Type of work</th>
                    <th className="w-[8%] h-10">Details</th>
                    <th className="w-[8%] h-10">Before</th>
                    <th className="w-[8%] h-10">After</th>
                    <th className="w-[4%] h-10">Manday</th>
                    <th className="w-[6%] h-10">Team Develop</th>
                    <th className="w-[5%] h-10">Status</th>
                    <th className="w-[7%] h-10">Product Increment</th>
                    <th className="w-[5%] h-10 px-10">Note</th>
                    <th className="w-[5%] h-10 px-10">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      {editRowIndex === index ? (
                        <>
                          <td className='text-[18px]'>{index + 1}</td>
                          <td className='text-[18px]'><input type="number" value={editRowData?.sprint || ''} onChange={(e) => handleEditChange(e, 'sprint')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                          <td className='text-[18px]'><input type="date" value={(editRowData?.datestart || '').split('/').reverse().join('-')} onChange={(e) => handleEditChange(e, 'datestart')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                          <td className='text-[18px]'><input type="date" value={(editRowData?.dateend || '').split('/').reverse().join('-')} onChange={(e) => handleEditChange(e, 'dateend')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                          <td className='text-[18px]'><input type="text" value={editRowData?.type_of_work || ''} onChange={(e) => handleEditChange(e, 'type_of_work')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                          <td className='text-[18px]'><input type="text" value={editRowData?.details || ''} onChange={(e) => handleEditChange(e, 'details')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                          <td>
                            <div className='relative'>
                              <input
                                type="file"
                                onChange={(e) => handleImageEditChange(e, 'beforeImg')}
                                className='hidden'
                                id={`beforeImg-${index}`}
                              />
                              <label
                                htmlFor={`beforeImg-${index}`}
                                className='bg-blue-500 text-white p-2 rounded-lg cursor-pointer'
                              >
                                เลือกไฟล์
                              </label>
                            </div>
                            {editRowData?.beforeImg ? (
                              <img src={URL.createObjectURL(editRowData.beforeImg)} alt="Before" className='w-28 h-16' />
                            ) : (
                              row.imgBefore && <img src={`/backend/mentor/${row.imgBefore}`} alt="Before" className='w-28 h-16' />
                            )}
                          </td>
                          <td>
                            <div className='relative'>
                              <input
                                type="file"
                                onChange={(e) => handleImageEditChange(e, 'afterImg')}
                                className='hidden'
                                id={`afterImg-${index}`}
                              />
                              <label
                                htmlFor={`afterImg-${index}`}
                                className='bg-blue-500 text-white p-2 rounded-lg cursor-pointer'
                              >
                                เลือกไฟล์
                              </label>
                            </div>
                            {editRowData?.afterImg ? (
                              <img src={URL.createObjectURL(editRowData.afterImg)} alt="After" className='w-28 h-16' />
                            ) : (
                              row.imgAfter && <img src={`/backend/mentor/${row.imgAfter}`} alt="After" className='w-28 h-16' />
                            )}
                          </td>
                          <td className='text-[18px]'><input type="number" value={editRowData?.manday || ''} onChange={(e) => handleEditChange(e, 'manday')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                          <td className='text-[18px]'><input type="text" value={editRowData?.teamdevelop || ''} onChange={(e) => handleEditChange(e, 'teamdevelop')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                          <td className='text-[18px]'>
                            <select
                              value={editRowData.status || ''}
                              onChange={(e) => handleEditChange(e, 'status')}
                              className='border-2 border-gray-300 p-2 rounded-lg w-full h-10'
                              style={{
                                color: getStatusColor(editRowData.status) // เปลี่ยนสีตามสถานะ
                              }}
                            >
                              <option value="To Do" style={{ color: '#004085' }}>To Do</option>
                              <option value="Done" style={{ color: '#155724' }}>Done</option>
                            </select>
                          </td>
                          <td className='text-[18px]'><input type="date" value={(editRowData?.productIncrement || '').split('/').reverse().join('-')} onChange={(e) => handleEditChange(e, 'productIncrement')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                          <td className='text-[18px]'><input type="text" value={editRowData?.note || ''} onChange={(e) => handleEditChange(e, 'note')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                          <td>
                            <button onClick={() => saveEdit(index)} className='bg-green-500 text-white rounded-lg h-10 w-24 text-[16px]'>บันทึก</button>
                            <button onClick={() => deleteRow(index)} className='bg-red-500 text-white rounded-lg h-10 w-24 text-[16px] mt-1'>ลบ</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className='text-[18px]'>{index + 1}</td>
                          <td className='text-[18px]'>{row.sprint}</td>
                          <td className='text-[18px]'>{formatDateToThai(row.notificationDate)}</td>
                          <td className='text-[18px]'>{formatDateToThai(row.completionDate)}</td>
                          <td className='text-[18px]'>{row.type_of_work}</td>
                          <td className='text-[18px]'>{row.details}</td>
                          <td className="flex justify-center " onClick={() => handleImageClick(`/backend/mentor/${row.imgBefore}`)}>
                            {row.imgBefore ? <img src={`/backend/mentor/${row.imgBefore}`} alt="Before" className='w-28 h-16 cursor-pointer' /> : 'No Image'}
                          </td>
                          <td className="text-center align-middle" onClick={() => handleImageClick(`/backend/mentor/${row.imgAfter}`)}>
                            {row.imgAfter ? (
                              <img src={`/backend/mentor/${row.imgAfter}`} alt="After" className="w-28 h-16 mx-auto cursor-pointer" />
                            ) : 'No Image'}
                          </td>
                          <td className='text-[18px]'>{row.manday}</td>
                          <td className='text-[18px]'>{row.teamdevelop}</td>
                          <td className='text-[18px]' style={{ color: getStatusColor(row.status) }}>
                            {row.status}
                          </td>
                          <td className='text-[18px]'>{formatDateToThai(row.productIncrement)}</td>
                          <td className='text-[18px]'>{row.note}</td>
                          <td className='flex justify-center mt-3.5'>
                            <img src="/src/img/img_icon/Edit.png" alt="Edit" className='w-10 h-10 cursor-pointer' onClick={() => startEdit(index)} />
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {newRow && (
                    <tr>
                      <td className='text-[18px]'>{newRow.order}</td>
                      <td className='text-[18px]'><input type="number" value={newRow.sprint} onChange={(e) => handleNewRowChange(e, 'sprint')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                      <td className='text-[18px]'><input type="date" onChange={(e) => handleNewRowChange(e, 'datestart')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                      <td className='text-[18px]'><input type="date" onChange={(e) => handleNewRowChange(e, 'dateend')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                      <td className='text-[18px]'><input type="text" value={newRow.type} onChange={(e) => handleNewRowChange(e, 'type')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                      <td className='text-[18px]'><input type="text" value={newRow.detail} onChange={(e) => handleNewRowChange(e, 'detail')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                      <td>
                        <div className='relative flex justify-center'>
                          <input
                            type="file"
                            onChange={(e) => handleImageChange(e, 'beforeImg')}
                            className='hidden'
                            id='newBeforeImg'
                          />
                          <label
                            htmlFor='newBeforeImg'
                          >
                            <img src="/src/img/img_icon/add-button.png" alt="เพิ่มรูป Before" className='w-10' />
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className='relative flex justify-center'>
                          <input
                            type="file"
                            onChange={(e) => handleImageChange(e, 'afterImg')}
                            className='hidden'
                            id='newAfterImg'
                          />
                          <label
                            htmlFor='newAfterImg'
                          >
                            <img src="/src/img/img_icon/add-button.png" alt="เพิ่มรูป After" className='w-10' />
                          </label>
                        </div>
                      </td>
                      <td className='text-[18px]'><input type="number" value={newRow.manday} onChange={(e) => handleNewRowChange(e, 'manday')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                      <td className='text-[18px]'><input type="text" value={newRow.responsible} onChange={(e) => handleNewRowChange(e, 'responsible')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                      <td className='text-[18px]'>
                        <select
                          value={newRow.status || ''}
                          onChange={(e) => handleNewRowChange(e, 'status')}
                          className='border-2 border-gray-300 p-2 rounded-lg w-full h-10 text-black' // เพิ่มคลาส text-black
                        >
                          <option value="" disabled hidden>เลือกสถานะ</option>
                          <option value="To Do" style={{ color: '#004085' }}>To Do</option>
                          <option value="Done" style={{ color: '#155724' }}>Done</option>
                        </select>
                      </td>


                      <td className='text-[18px]'><input type="date" onChange={(e) => handleNewRowChange(e, 'increment')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                      <td className='text-[18px]'><input type="text" value={newRow.remark} onChange={(e) => handleNewRowChange(e, 'remark')} className='border-2 border-gray-300 p-2 rounded-lg w-full h-10' /></td>
                      <td>
                        <button onClick={saveRow} className='bg-green-500 text-white rounded-lg h-10 w-24 text-[16px] mt-1'>บันทึก</button>
                        <button onClick={cancelRow} className='bg-red-500 text-white rounded-lg h-10 w-24 text-[16px] mt-1 mb-3.5'>ยกเลิก</button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
      <Footer />
      <ImageModal show={modalImageUrl !== null} imageUrl={modalImageUrl} onClose={() => setModalImageUrl(null)} />
    </div>
  );
};

export default ProductBacklog;
