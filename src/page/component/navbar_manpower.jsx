import { useNavigate } from 'react-router-dom';

const NavbarManpower = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/Homepage'); // เปลี่ยนเป็น path ของหน้าแรก
  };

  return (
    <div className="w-full bg-white">
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <div className="mr-4">
            <img src="/src/img/menu.png" alt="Menu"className="h-8"/>
          </div>
          <img className="h-10 cursor-pointer" style={{ width: '165px', height: '60px' }} src="/src/img/Siam_Cement_Group_Logo.svg.png"alt="SCG Logo" onClick={handleLogoClick} />
        </div>
        <div className="flex items-center text-right">
          <span className="mr-2 leading-tight text-[1.5rem]">
            <span style={{ display: 'block', marginBottom: '-9px', color: 'black' }}>Mentor</span>
            <span style={{ display: 'block', color: 'black' }}>Star</span>
          </span>
          <div className="avatar online">
            <div style={{width:'50px', height:'50px'}}> 
              <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavbarManpower;
