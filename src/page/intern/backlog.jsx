import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทางไปยังหน้าต่างๆ
import NavbarIntern from '../component/navbar_intern';
import Footer from '../component/footer';

function Backlog() {
    const navigate = useNavigate(); // สร้างตัวแปร navigate เพื่อใช้ในการเปลี่ยนหน้า
    // State to manage the boxes in the Doing column
    const [doingBoxes, setDoingBoxes] = useState([{ id: 1, text: "" }, { id: 2, text: "" }]);
    const [todoBoxes, setTodoBoxes] = useState([1, 2]);
    const [doneBoxes, setDoneBoxes] = useState([1]);

    // Refs for columns
    const doingRef = useRef(null);
    const todoRef = useRef(null);
    const doneRef = useRef(null);

    // State to track the max height
    const [maxHeight, setMaxHeight] = useState(0);

    // Function to add a box to the Doing column
    const addBoxToDoing = () => {
        setDoingBoxes([...doingBoxes, { id: doingBoxes.length + 1, text: "" }]);
    };

    // Handle input change
    const handleInputChange = (index, value) => {
        const updatedBoxes = [...doingBoxes];
        updatedBoxes[index].text = value;
        setDoingBoxes(updatedBoxes);
    };

    // Effect to update the max height when boxes are added
    useEffect(() => {
        const doingHeight = doingRef.current.clientHeight;
        const todoHeight = todoRef.current.clientHeight;
        const doneHeight = doneRef.current.clientHeight;
        const newMaxHeight = Math.max(doingHeight, todoHeight, doneHeight);
        setMaxHeight(newMaxHeight);
    }, [doingBoxes, todoBoxes, doneBoxes]);

    const gotohome = () => {
        navigate('/home');
    };

    return (
        <div>
            <header>
                <NavbarIntern />
            </header>

            <div className="w-full flex flex-col items-center mt-5">
                {/* Profile Section */}
                <div className="flex items-center  w-full mt-5 mb-10 px-4">
                    <div className="flex items-center">
                        <div className="ml-4">
                            <div className="bg-[#5C5A5A] text-[white] px-10 py-2 rounded-lg text-[35px] font-semibold ml-7">
                                BackLog
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-10" onClick={gotohome}>
                        <img src="/src/img/img_icon/left-arrow.png" alt="กลับไปหน้าโฮม" className="w-7 cursor-pointer mr-10" />
                    </div>
                </div>

                {/* Kanban Board */}
                <div className="w-full max-w-5xl flex justify-between items-start">
                    {/* Doing Column */}
                    <div ref={doingRef} className="flex flex-col w-1/3 p-2" style={{ minHeight: maxHeight }}>
                        <h2 className="text-[30px] font-semibold mb-2 text-center">Doing</h2>
                        {doingBoxes.map((box, index) => (
                            <div key={index} className="bg-yellow-300 rounded-lg mb-8 border-2 border-black self-center p-2">
                                <textarea
                                    className=" bg-transparent outline-none text-black text-center text-[20px] resize-none overflow-auto h-[220px] w-[230px]"
                                    value={box.text}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    rows="10"
                                />
                            </div>
                        ))}
                        <div className="flex justify-center mt-1">
                            <button onClick={addBoxToDoing} className="flex justify-center item-center mb-5">
                                <img src="/src/img/img_icon/add-button.png" alt="เพิ่มแนวตั้ง" className="w-10" />
                            </button>
                        </div>
                    </div>

                    {/* To do Column */}
                    <div ref={todoRef} className="flex flex-col w-1/3 p-2 border-r-4 border-l-4 border-orange-500" style={{ minHeight: maxHeight }}>
                        <h2 className="text-[30px] font-semibold mb-2 text-center">To do</h2>
                        {todoBoxes.map((box, index) => (
                            <div key={index} className="bg-yellow-300 h-[250px] w-[250px] rounded-lg mb-8 p-2 border-2 border-black self-center"></div>
                        ))}
                    </div>

                    {/* Done Column */}
                    <div ref={doneRef} className="flex flex-col w-1/3 p-2" style={{ minHeight: maxHeight }}>
                        <h2 className="text-[30px] font-semibold mb-2 text-center">Done</h2>
                        {doneBoxes.map((box, index) => (
                            <div key={index} className="bg-yellow-300 h-[250px] w-[250px] rounded-lg mb-8 p-2 border-2 border-black self-center"></div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Backlog;
