import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
import Home from './page/intern/home';
import Login from './page/login';
import Project from './page/mentor/Project';
import AssignPJ from './page/mentor/AssignPJ'
import Homepage from './page/mentor/Homepage';
import IDP from './page/mentor/IDP';
import PDBacklog from './page/mentor/PDBacklog';
import BLProject from './page/mentor/BLProject';
import Input_data_intern from './page/intern/input_data_intern';
import Upload_doc_intern from './page/intern/upload_doc_intern';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/Homepage" element={<Homepage />} />
              <Route path="/input_data_intern" element={<Input_data_intern />} />
              <Route path="/upload_doc_intern" element={<Upload_doc_intern />} />
              <Route path="/project" element={<Project />} />
              {/* <Route path="/assignproject" element={<Assignproject />} /> */}
              <Route path="/AssignPJ" element={<AssignPJ />} />
              <Route path="/IDP/:user_id" element={<IDP />} />
              <Route path="/PDBacklog" element={<PDBacklog />} />
              <Route path="/BLProject" element={<BLProject />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;