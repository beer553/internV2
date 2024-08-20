import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    fetch('http://localhost/internV2/backend/connect.php') // เปลี่ยน URL ตามตำแหน่งไฟล์ PHP ของคุณ
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          console.log("ห๊ะอีกที");
        } else {
          console.error("Failed to connect to database:", data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Database Connection Test</h1>
      <p>Check the console for connection status.</p>
    </div>
  );
};

export default App;
