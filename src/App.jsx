import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import Login from './page/intern/login';
// import Apply from './page/intern/Apply';
// import Benefit from './page/intern/benefit';
// import Consider from './page/intern/consider';
// import Interview from './page/intern/interview';
// import Doc from './page/intern/Doc';
// import Doc2 from './page/intern/Doc2';
// import Doc3 from './page/intern/Doc3';
// import Welcome from './page/intern/welcome';
// import Welcome2 from './page/intern/welcome2';
// import Welcome3 from './page/intern/welcome3';
// import Homepage_1 from './page/mentor/Homepage_1';
// import Input_data_intern from './page/intern/input_data_intern';
import Home from './page/intern/home';
import Backlog from './page/intern/backlog';
import Document from './page/intern/document';
import Work_from_home from './page/intern/work_from_home';
import Dailyscrum from './page/mentor/Dailyscrum';
import AssignPJ from './page/mentor/AssignPJ';
import IDP from './page/mentor/IDP';
import PDBacklog from './page/mentor/PDBacklog';
import BLProject from './page/mentor/BLProject';
import Homepage from './page/mentor/Homepage';
import Project from './page/mentor/Project';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/apply" element={<Apply />} /> */}
          {/* <Route path="/benefit" element={<Benefit />} /> */}
          {/* <Route path="/consider" element={<Consider />} /> */}
          {/* <Route path="/interview" element={<Interview />} /> */}
          {/* <Route path="/doc" element={<Doc />} /> */}
          {/* <Route path="/doc2" element={<Doc2 />} /> */}
          {/* <Route path="/doc3" element={<Doc3 />} /> */}
          {/* <Route path="/welcome" element={<Welcome />} /> */}
          {/* <Route path="/welcome2" element={<Welcome2 />} /> */}
          {/* <Route path="/welcome3" element={<Welcome3 />} /> */}
          {/* <Route path="/project" element={<Project />} /> */}
          {/* <Route path="/assignproject" element={<Assignproject />} /> */}
          {/* <Route path="/Homepage_1" element={<Homepage_1 />} /> */}
          {/* <Route path="/input_data_intern" element={<Input_data_intern />} /> */}
          <Route path="/Home" element={<Home />} />
          <Route path="/Backlog" element={<Backlog />} />
          <Route path="/Document" element={<Document />} />
          <Route path="/Work_from_home" element={<Work_from_home />} />
          <Route path="/Dailyscrum" element={<Dailyscrum />} />
          <Route path="/AssignPJ" element={<AssignPJ />} />
          <Route path="/IDP" element={<IDP />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/PDBacklog" element={<PDBacklog />} />
          <Route path="/BLProject" element={<BLProject />} />
          <Route path="/Project" element={<Project />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;