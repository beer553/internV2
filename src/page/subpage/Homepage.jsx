import React from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/footer';
import NavbarManpower from '../component/navbar_manpower';

function Homepage() {
  const navigate = useNavigate();

  const goToPofilePage = () => {
    navigate('/IDP');
  }
  const gotoProductBacklog = () => {
    navigate('/PDBacklog');
  };

  return (
    <div>
      
      <header>
        <NavbarManpower />
      </header>

      <div className="dashboard">
        <div className="welcome">
          <img src="/src/img/star.png" className="profile-img" alt="Profile" />
          <div className="welcome-text">
            <h2 className='DX'>DX Manpower Management</h2>
            <p className='SC'>Hello, Scrum Master STAR 👋</p>
          </div>
        </div>
        <div className="dashboard-1">
          <div className="card">
            <div className="number6">6</div>
            <img src="https://cdn-icons-png.flaticon.com/128/1478/1478951.png" className='Team' />
            <div className="label-1-">Developer Team (TTL)</div>
            <div className="blue-line"></div>
          </div>
          <div className="card">
            <div className="number3-1">3</div>
            <div><img src="https://cdn-icons-png.flaticon.com/128/1320/1320909.png" className='Team-1' /></div>
            <div className="label-2-">Developer This Year</div>
            <div className="orange-line"></div>
          </div>
          <div className="card-2">
            <div className="project-card">
              <div className="number2">
                <span>2</span>
              </div>
              <div className="project-details">
                <div className="project-item">
                  <img src="https://cdn-icons-png.flaticon.com/128/5956/5956592.png" alt="Project" className='PJZ' />
                  <span>Project</span>
                </div>
                <div className="project-item-1-">
                  <img src="https://cdn-icons-png.flaticon.com/128/15189/15189145.png" alt="Scrum" className='Sc-1' />
                  <span>Daily Scrum</span>
                </div>
              </div>
              <div className='pj-1-'><span>Project This Year (Items)</span></div>
            </div>
            <div className="cyan-line"></div>
          </div>
          <div className="card-1">
            <div className="item">
              <div className="number3">3</div>
              <div className="labelz-1">Sprint</div>
            </div>
            <div className="item">
              <div className="number10">10</div>
              <div className="labelz">
                <div className="icon-1" onClick={gotoProductBacklog}>
                  <img src="https://cdn-icons-png.flaticon.com/128/5084/5084624.png" alt="Product Backlog Icon" className='BLZ' />
                </div>
                <div>Product Backlog</div>
              </div>
            </div>
            <div className="PI">Product Increment (Items)</div>
            <div className="Green"></div>
          </div>
        </div>

        <div className="manpower">
          <div className='add-manpower'>
            <h3 className='manpower-center'>Manpower</h3>
            <div><img src="https://cdn-icons-png.flaticon.com/128/4315/4315609.png" alt="Add" className='add-1' /></div>
          </div>
          <table>
            <thead>
              <tr>
                <th>NO</th>
                <th>ID Name</th>
                <th>Status</th>
                <th>Time Line</th>
                <th>Project</th>
                <th>Profile</th>
                <th>Sprint Review</th>
                <th>Evaluate</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, name: 'G001-12345 Panidnat Saeng ', status: 'รอฝึกงาน', timeline: '01/01/2024 - 31/12/2024', project: 'OT Dashboard' },
                { id: 2, name: 'G001-12345 Panidnat Saeng ', status: 'กำลังฝึกงาน', timeline: '01/01/2024 - 31/12/2024', project: ' Internship' },
                { id: 3, name: 'G001-12345 Panidnat Saeng ', status: 'กำลังฝึกงาน', timeline: '01/01/2024 - 31/12/2024', project: 'OT Dashboard' },
                { id: 4, name: 'G001-12345 Panidnat Saeng ', status: 'กำลังฝึกงาน', timeline: '01/01/2024 - 31/12/2024', project: 'Internship' },
                { id: 5, name: 'G001-12345 Panidnat Saeng ', status: 'ฝึกงานเสร็จสิ้น', timeline: '01/01/2024 - 31/12/2024', project: 'OT Dashboard' },
                { id: 6, name: 'G001-12345 Panidnat Saeng ', status: 'ฝึกงานเสร็จสิ้น', timeline: '01/01/2024 - 31/12/2024', project: 'OT Dashboard' },
              ].map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td className={row.status.toLowerCase()}>{row.status}</td>
                  <td>{row.timeline}</td>
                  <td>{row.project}</td>
                  <td><button> <img className='file' src="https://cdn-icons-png.flaticon.com/128/1157/1157026.png" alt="Profile" onClick={goToPofilePage} /></button></td>
                  <td><img className='sprint' src="https://cdn-icons-png.flaticon.com/128/4727/4727519.png" alt="Sprint Review" /></td>
                  <td><img className='Eva' src="https://cdn-icons-png.flaticon.com/128/334/334345.png" alt="Evaluate" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Homepage;