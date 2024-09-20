import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทางไปยังหน้าต่างๆ
import NavbarIntern from '../component/navbar_intern';
import Footer from '../component/footer';

function Document() {
    const [showPopup, setShowPopup] = useState(false); // สร้าง state สำหรับแสดงหรือซ่อน Pop-up
    const [showEditPopup, setShowEditPopup] = useState(false); // สำหรับ pop-up edit
    const [showReadPopup, setShowReadPopup] = useState(false);
    const [checkedItems, setCheckedItems] = useState({
        selectAll: false,
        file1: false,
        file2: false,
        file3: false,
    });

    const [uploadedFile, setUploadedFile] = useState(null); // state สำหรับเก็บไฟล์ที่อัปโหลด
    const [uploadedFiles, setUploadedFiles] = useState([]); // เก็บไฟล์ที่อัปโหลด
    const [errorMessage, setErrorMessage] = useState(""); // เก็บข้อความแสดงข้อผิดพลาด

    const navigate = useNavigate(); // ต้องมี useNavigate ใช้ navigate ไปยังหน้า home

    const togglePopup = () => {
        if (showPopup) {
            // รีเซ็ตค่า checkedItems เมื่อปิด popup
            setCheckedItems({
                selectAll: false,
                file1: false,
                file2: false,
                file3: false,
            });
        }
        setShowPopup(!showPopup);
    };

    const toggleEditPopup = () => {
        if (showEditPopup) {
            // รีเซ็ตค่า checkedItems เมื่อปิด popup edit
            setCheckedItems({
                selectAll: false,
                file1: false,
                file2: false,
                file3: false,
            });
        }
        setShowEditPopup(!showEditPopup);
    };

    const gotohome = () => {
        navigate('/home');
    };

    const toggleReadPopup = () => {
        setShowReadPopup(!showReadPopup);
    };

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;

        if (id === 'selectAll') {
            setCheckedItems({
                selectAll: checked,
                file1: checked,
                file2: checked,
                file3: checked,
            });
        } else {
            setCheckedItems((prev) => ({
                ...prev,
                [id]: checked,
                selectAll: prev.file1 && prev.file2 && prev.file3 && checked
            }));
        }
    };

    const downloadFiles = () => {
        // Logic สำหรับดาวน์โหลดไฟล์
        console.log("Downloading selected files...");
        setShowPopup(false); // ปิด Pop-up หลังจากดาวน์โหลดไฟล์
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            setUploadedFile(file);
            setErrorMessage(""); // เคลียร์ข้อความ error เมื่อเลือกไฟล์ถูกต้อง
        } else {
            setUploadedFile(null);
        }
    };

    const deleteFile = (fileName) => {
        setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    };

    return (
        <div>
            <header>
                <NavbarIntern />
            </header>
            <div className='mt-10'></div>
            <div className="flex items-center bg-pink-100 p-2  w-[80%] mx-auto relative">
                <div className="bg-red-500 w-2 h-full absolute left-0"></div>
                <div className="ml-4 text-gray-700 text-[30px]">Document</div>
                <div className="absolute right-10" onClick={gotohome}>
                    <img src="/src/img/img_icon/left-arrow.png" alt="กลับไปหน้าโฮม" className="w-7 cursor-pointer mr-10" />
                </div>
            </div>

            <div className="text-[35px] mt-4 text-center text-black">Teerapat Wanleng</div>
            <div className="text-[30px] mb-7 text-center text-black">KM Selg-Learning</div>

            <div className="grid grid-cols-2 gap-20 px-[20%] mb-20">
                {/* Flowchart Card */}
                <div className="bg-white shadow-lg rounded-lg p-4 relative">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-[25px] text-black font-semibold">Flowchart</h4>
                        <button className="absolute top-2 right-2 text-gray-500" onClick={toggleEditPopup}>
                            <img src="/src/img/img_icon/edit-1.png" alt="Edit" className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <img src="/src/img/img_icon/flowchart.png" alt="Flowchart Icon" className="w-16 h-16 mb-3" />
                        <div className="flex space-x-8">
                            <div className="flex flex-col items-center text-black">
                                <label htmlFor="uploadFlowchart">
                                    <img src='/src/img/img_icon/upload.png' alt='Upload' className='w-7 cursor-pointer'></img>
                                </label>
                                <input type="file" id="uploadFlowchart" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                                <span className="text-[20px]">Upload</span>
                            </div>
                            <button className="flex flex-col items-center text-black" onClick={togglePopup}>
                                <img src='/src/img/img_icon/download.png' alt='Download' className='w-7'></img>
                                <span className="text-[20px]">Download</span>
                            </button>
                            <button className="flex flex-col items-center text-black" onClick={toggleReadPopup}>
                                <img src='/src/img/img_icon/read.png' alt='Read' className='w-7'></img>
                                <span className="text-[20px]">Read</span>
                            </button>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-cyan-400 rounded-b-lg"></div>
                </div>

                {/* Swimlane Card */}
                <div className="bg-white shadow-lg rounded-lg p-4 relative">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-[25px] text-black font-semibold">Swimlane</h4>
                        <button className="absolute top-2 right-2 text-gray-500" onClick={toggleEditPopup}>
                            <img src="/src/img/img_icon/edit-1.png" alt="Edit" className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <img src="/src/img/img_icon/swimlane.png" alt="Swimlane Icon" className="w-16 h-16 mb-3" />
                        <div className="flex space-x-8">
                            <div className="flex flex-col items-center text-black">
                                <label htmlFor="uploadSwimlane">
                                    <img src='/src/img/img_icon/upload.png' alt='Upload' className='w-7 cursor-pointer'></img>
                                </label>
                                <input type="file" id="uploadSwimlane" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                                <span className="text-[20px]">Upload</span>
                            </div>
                            <button className="flex flex-col items-center text-black" onClick={togglePopup}>
                                <img src='/src/img/img_icon/download.png' alt='Download' className='w-7'></img>
                                <span className="text-[20px]">Download</span>
                            </button>
                            <button className="flex flex-col items-center text-black" onClick={toggleReadPopup}>
                                <img src='/src/img/img_icon/read.png' alt='Read' className='w-7'></img>
                                <span className="text-[20px]">Read</span>
                            </button>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-[#00FF85] rounded-b-lg"></div>
                </div>

                {/* Prototype Card */}
                <div className="bg-white shadow-lg rounded-lg p-4 relative">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-[25px] text-black font-semibold">Prototype</h4>
                        <button className="absolute top-2 right-2 text-gray-500" onClick={toggleEditPopup}>
                            <img src="/src/img/img_icon/edit-1.png" alt="Edit" className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <img src="/src/img/img_icon/prototype.png" alt="Prototype Icon" className="w-16 h-16 mb-3" />
                        <div className="flex space-x-8">
                            <div className="flex flex-col items-center text-black">
                                <label htmlFor="uploadPrototype">
                                    <img src='/src/img/img_icon/upload.png' alt='Upload' className='w-7 cursor-pointer'></img>
                                </label>
                                <input type="file" id="uploadPrototype" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                                <span className="text-[20px]">Upload</span>
                            </div>
                            <button className="flex flex-col items-center text-black" onClick={togglePopup}>
                                <img src='/src/img/img_icon/download.png' alt='Download' className='w-7'></img>
                                <span className="text-[20px]">Download</span>
                            </button>
                            <button className="flex flex-col items-center text-black" onClick={toggleReadPopup}>
                                <img src='/src/img/img_icon/read.png' alt='Read' className='w-7'></img>
                                <span className="text-[20px]">Read</span>
                            </button>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-purple-400 rounded-b-lg"></div>
                </div>

                {/* Data dic Card */}
                <div className="bg-white shadow-lg rounded-lg p-4 relative">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-[25px] text-black font-semibold">Data dic</h4>
                        <button className="absolute top-2 right-2 text-gray-500" onClick={toggleEditPopup}>
                            <img src="/src/img/img_icon/edit-1.png" alt="Edit" className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <img src="/src/img/img_icon/exploration.png" alt="Data dic Icon" className="w-16 h-16 mb-3" />
                        <div className="flex space-x-8">
                            <div className="flex flex-col items-center text-black">
                                <label htmlFor="uploadDataDic">
                                    <img src='/src/img/img_icon/upload.png' alt='Upload' className='w-7 cursor-pointer'></img>
                                </label>
                                <input type="file" id="uploadDataDic" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                                <span className="text-[20px]">Upload</span>
                            </div>
                            <button className="flex flex-col items-center text-black" onClick={togglePopup}>
                                <img src='/src/img/img_icon/download.png' alt='Download' className='w-7'></img>
                                <span className="text-[20px]">Download</span>
                            </button>
                            <button className="flex flex-col items-center text-black" onClick={toggleReadPopup}>
                                <img src='/src/img/img_icon/read.png' alt='Read' className='w-7'></img>
                                <span className="text-[20px]">Read</span>
                            </button>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-lime-400 rounded-b-lg"></div>
                </div>

                {/* ER-Diagram Card */}
                <div className="bg-white shadow-lg rounded-lg p-4 relative">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-[25px] text-black font-semibold">ER-Diagram</h4>
                        <button className="absolute top-2 right-2 text-gray-500" onClick={toggleEditPopup}>
                            <img src="/src/img/img_icon/edit-1.png" alt="Edit" className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <img src="/src/img/img_icon/er_diagram.png" alt="ER-Diagram Icon" className="w-16 h-16 mb-3" />
                        <div className="flex space-x-8">
                            <div className="flex flex-col items-center text-black">
                                <label htmlFor="uploadERDiagram">
                                    <img src='/src/img/img_icon/upload.png' alt='Upload' className='w-7 cursor-pointer'></img>
                                </label>
                                <input type="file" id="uploadERDiagram" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                                <span className="text-[20px]">Upload</span>
                            </div>
                            <button className="flex flex-col items-center text-black" onClick={togglePopup}>
                                <img src='/src/img/img_icon/download.png' alt='Download' className='w-7'></img>
                                <span className="text-[20px]">Download</span>
                            </button>
                            <button className="flex flex-col items-center text-black" onClick={toggleReadPopup}>
                                <img src='/src/img/img_icon/read.png' alt='Read' className='w-7'></img>
                                <span className="text-[20px]">Read</span>
                            </button>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-orange-400 rounded-b-lg"></div>
                </div>

                {/* Other Documents Card */}
                <div className="bg-white shadow-lg rounded-lg p-4 relative">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-[25px] text-black font-semibold">เอกสารอื่นๆ</h4>
                        <button className="absolute top-2 right-2 text-gray-500" onClick={toggleEditPopup}>
                            <img src="/src/img/img_icon/edit-1.png" alt="Edit" className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <img src="/src/img/img_icon/documents.png" alt="Other Documents Icon" className="w-16 h-16 mb-3" />
                        <div className="flex space-x-8">
                            <div className="flex flex-col items-center text-black">
                                <label htmlFor="uploadOtherDocuments">
                                    <img src='/src/img/img_icon/upload.png' alt='Upload' className='w-7 cursor-pointer'></img>
                                </label>
                                <input type="file" id="uploadOtherDocuments" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                                <span className="text-[20px]">Upload</span>
                            </div>
                            <button className="flex flex-col items-center text-black" onClick={togglePopup}>
                                <img src='/src/img/img_icon/download.png' alt='Download' className='w-7'></img>
                                <span className="text-[20px]">Download</span>
                            </button>
                            <button className="flex flex-col items-center text-black" onClick={toggleReadPopup}>
                                <img src='/src/img/img_icon/read.png' alt='Read' className='w-7'></img>
                                <span className="text-[20px]">Read</span>
                            </button>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-red-400 rounded-b-lg"></div>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-7 w-[30%]">
                        <div className="flex justify-center">
                            <img src="/src/img/Siam_Cement_Group_Logo.svg.png" alt="SCG Logo" className="w-[200px] h-[70px] mb-4" />
                        </div>
                        <h2 className="text-[25px] mb-4 text-center">เลือกไฟล์ที่ต้องการดาวน์โหลด</h2>
                        <form className='text-left'>
                            <div className="mb-4">
                                <input
                                    type="checkbox"
                                    id="selectAll"
                                    className="mr-2"
                                    checked={checkedItems.selectAll}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="selectAll" className='ml-3'>All</label>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="checkbox"
                                    id="file1"
                                    className="mr-2"
                                    checked={checkedItems.file1}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="file1" className='ml-3'>Test.pdf</label>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="checkbox"
                                    id="file2"
                                    className="mr-2"
                                    checked={checkedItems.file2}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="file2" className='ml-3'>Test.doc</label>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="checkbox"
                                    id="file3"
                                    className="mr-2"
                                    checked={checkedItems.file3}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="file3" className='ml-3'>Test.drawio</label>
                            </div>
                        </form>
                        <div className="flex justify-end mt-6 text-[23px]">
                            <button className="bg-[#4CAF50] text-white w-[100px] h-[45px] rounded mr-4" onClick={downloadFiles}>
                                ดาวน์โหลด
                            </button>
                            <button className="bg-yellow-500 text-white w-[100px] h-[45px] rounded" onClick={togglePopup}>
                                ยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditPopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-7 w-[30%]">
                        <div className="flex justify-center">
                            <img src="/src/img/Siam_Cement_Group_Logo.svg.png" alt="SCG Logo" className="w-[200px] h-[70px] mb-4" />
                        </div>
                        <h2 className="text-[25px] mb-4 text-center">เลือกไฟล์ที่ต้องการลบ</h2>
                        <div className="flex flex-col items-start">
                            {uploadedFiles.length > 0 ? (
                                uploadedFiles.map((file) => (
                                    <div key={file.name} className="flex justify-between items-center w-full mb-4">
                                        <span>{file.name}</span>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                            onClick={() => deleteFile(file.name)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No files uploaded</p>
                            )}
                        </div>
                        <div className="flex justify-end mt-6 text-[23px]">
                            <button className="bg-[#F44336] text-white w-[100px] h-[45px] rounded mr-4" onClick={downloadFiles}>
                                ลบรายการ
                            </button>
                            <button className="bg-yellow-500 text-white w-[100px] h-[45px] rounded" onClick={toggleEditPopup}>
                                ยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showReadPopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-7 w-[30%]">
                        <div className="flex justify-center">
                            <img src="/src/img/Siam_Cement_Group_Logo.svg.png" alt="SCG Logo" className="w-[200px] h-[70px] mb-4" />
                        </div>
                        <h2 className="text-[25px] mb-4 text-center">ดูไฟล์ที่อัปโหลดทั้งหมด</h2>
                        <div className="flex flex-col items-start">
                            {uploadedFiles.length > 0 ? (
                                uploadedFiles.map((file) => (
                                    <div key={file.name} className="flex justify-between items-center w-full mb-4">
                                        <span>{file.name}</span>
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                            onClick={() => {
                                                // ใส่ logic สำหรับดูไฟล์
                                                console.log(`Reading file: ${file.name}`);
                                            }}
                                        >
                                            View
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No files uploaded</p>
                            )}
                        </div>
                        <div className="flex justify-end mt-6 text-[23px]">
                            <button className="bg-yellow-500 text-white w-[100px] h-[45px] rounded" onClick={toggleReadPopup}>
                                ยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Document;
