<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// กำหนดค่าเชื่อมต่อฐานข้อมูล
$uid = "SA"; // ชื่อผู้ใช้ SQL Server (ในกรณีนี้คือ SA)
$pwd = "phurin4508!"; // รหัสผ่าน SQL Server (ที่คุณตั้งไว้ตอนสร้าง container)
$serverName = "Intern_V2,1433"; // ชื่อเซิร์ฟเวอร์ SQL Server และ port ที่คุณใช้เชื่อมต่อ (1433)
$database = "Intern"; // ชื่อฐานข้อมูลที่คุณต้องการเชื่อมต่อ

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
            // คิวรีหา intern จากตาราง intern_info โดยใช้ mentor ที่ได้มา
            $sql = "SELECT profile,user_id,nickname,firstName, lastName, currentEducation   FROM intern_info WHERE mentor = :mentor";
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