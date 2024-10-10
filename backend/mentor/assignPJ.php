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

    // รับค่า user_id ที่ถูกส่งมาใน body ของ POST request
    $data = json_decode(file_get_contents('php://input'), true);
    $user_id = isset($data['user_id']) ? $data['user_id'] : null;

    // เพิ่มการ log เพื่อตรวจสอบ user_id
    error_log("Received user_id: " . $user_id);

    if ($user_id) {
        // คิวรีหา mentor จากตาราง mentor_info โดยใช้ user_id
        $sql = "SELECT mentor FROM mentor_info WHERE user_id = :user_id";
        $stmt = $con->prepare($sql);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();

        // ดึงข้อมูล mentor
        $mentor = $stmt->fetch(PDO::FETCH_ASSOC)['mentor'];

        if ($mentor) {
            // คิวรีหา intern ที่วันสิ้นสุดยังไม่พ้นจากวันปัจจุบัน
            $sql = "SELECT profile, user_id, nickname, firstName, lastName, currentEducation 
                    FROM intern_info 
                    WHERE mentor = :mentor AND dateend >= GETDATE()";
            $stmt = $con->prepare($sql);
            $stmt->bindParam(':mentor', $mentor);
            $stmt->execute();

            // ดึงข้อมูลทั้งหมดจากผลลัพธ์
            $internData = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // ส่งข้อมูลกลับเป็น JSON
            echo json_encode($internData);
        } else {
            echo json_encode(['error' => 'Mentor not found']);
        }
    } else {
        echo json_encode(['error' => 'Missing user_id parameter']);
    }

} catch (PDOException $e) {
    // หากมีข้อผิดพลาด
    echo json_encode(['error' => $e->getMessage()]);
}
?>
