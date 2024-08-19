import React from 'react'
import Footer from '../component/footer';

const upload_doc_intern = () => {
  return (
    <>
    <div className='banner-container'>
                <img src="/src/img/banner1.jpg" alt="Banner Image" className="w-full h-auto" />
            </div>
            <div className="navbar flex justify-between items-center h-21 bg-gray-800">
                <div className="flex items-center ml-5">
                    <img src="/src/img/Siam_Cement_Group_Logo.svg.png" alt="Logo" className="h-16 m-4 " />
                </div>
                <div className="flex items-center ml-8">
                    <div className="mr-5 text-white text-right ">
                        <p className='text-left' style={{height:'30px'}}>Intern</p> 
                        <p>Chawanrat Boonya</p>
                    </div>
                    <div className="bg-white w-px h-16 mx-4"></div>
                    <a href="logout.php" className="text-white mr-12 ">Logout</a>
                </div>
            </div>
            <div className="max-w-[95%] mx-auto mt-12 mb-5  p-3 bg-white shadow-lg rounded-lg text-left " style={{ fontSize: '40px' }}>
                <h3 className='ml-5'>
                    กรอกข้อมูลส่วนตัว
                </h3>
            </div>

            <Footer/>
    </>
  )
}

export default upload_doc_intern
