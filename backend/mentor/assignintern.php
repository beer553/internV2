<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// กำหนดข้อมูลสำหรับเชื่อมต่อ SQL Server
$uid = "SA"; // ชื่อผู้ใช้ SQL Server
$pwd = "phurin4508!"; // รหัสผ่าน SQL Server
$serverName = "Intern_V2,1433"; // ชื่อเซิร์ฟเวอร์ SQL Server
$database = "Intern"; // ชื่อฐานข้อมูล

try {
    // เชื่อมต่อฐานข้อมูล
    $con = new PDO("sqlsrv:Server=$serverName;Database=$database;Encrypt=false", $uid, $pwd);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // รับค่า user_id, project_id และ selectedUsers (intern ที่ถูกเลือก) ที่ถูกส่งมาใน body ของ POST request
    $data = json_decode(file_get_contents('php://input'), true);
    $project_id = isset($data['project_id']) ? $data['project_id'] : null;
    $selectedUsers = isset($data['selectedUsers']) ? $data['selectedUsers'] : []; // รายชื่อ intern ที่ถูกเลือก

    // เพิ่มการ log เพื่อตรวจสอบ user_id, project_id และ selectedUsers
    error_log("Received project_id: " . $project_id);
    error_log("Received selectedUsers: " . implode(',', $selectedUsers)); // แสดง intern_id ที่ถูกเลือก

    if ($project_id && !empty($selectedUsers)) {
        // เปลี่ยน selectedUsers array เป็น string ในรูปแบบ comma-separated values (CSV)
        $teamDevelopData = implode(',', $selectedUsers);

        // บันทึกข้อมูล intern ที่ถูกเลือกในคอลัมน์ teamdevelop ของตาราง project
        $sql = "UPDATE project SET teamdevelop = :teamdevelop WHERE project_id = :project_id";
        $stmt = $con->prepare($sql);
        $stmt->bindParam(':teamdevelop', $teamDevelopData);
        $stmt->bindParam(':project_id', $project_id);
        $stmt->execute();

        // คิวรีหา project name จากตาราง project
        $sql = "SELECT projectname FROM project WHERE project_id = :project_id";
        $stmt = $con->prepare($sql);
        $stmt->bindParam(':project_id', $project_id);
        $stmt->execute();
        $projectName = $stmt->fetch(PDO::FETCH_ASSOC)['projectname'];

        // อัปเดตชื่อ project ในคอลัมน์ project ของ intern_info สำหรับ intern ที่ถูกเลือก
        foreach ($selectedUsers as $intern_id) {
            $sql = "UPDATE intern_info SET project = :projectname WHERE user_id = :intern_id";
            $stmt = $con->prepare($sql);
            $stmt->bindParam(':projectname', $projectName);
            $stmt->bindParam(':intern_id', $intern_id);
            $stmt->execute();
        }

        // ส่งสถานะการบันทึกกลับ
        echo json_encode(['status' => 'Success', 'message' => 'Team development data and project name updated successfully']);
    } else {
        // ตรวจสอบว่ามีการส่งค่าที่จำเป็นมาครบหรือไม่
        if (!$user_id) {
            echo json_encode(['error' => 'Missing user_id parameter']);
        }
        if (!$project_id) {
            echo json_encode(['error' => 'Missing project_id parameter']);
        }
        if (empty($selectedUsers)) {
            echo json_encode(['error' => 'No interns selected']);
        }
    }

} catch (PDOException $e) {
    // หากมีข้อผิดพลาด
    echo json_encode(['error' => $e->getMessage()]);
}
