<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
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

    // รับค่า user_id ที่ถูกส่งมาใน query string
    $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

    // ตรวจสอบ user_id ว่าไม่เป็นค่าว่างหรือ null
    if ($user_id === null || empty($user_id)) {
        echo json_encode(['error' => 'Missing or invalid user_id parameter']);
        exit();
    }

    // คิวรีหา mentor จากตาราง mentor_info โดยใช้ user_id
    $sql = "SELECT mentor FROM mentor_info WHERE user_id = :user_id";
    $stmt = $con->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();

    // ดึงข้อมูล mentor
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result && isset($result['mentor'])) {
        $mentor = $result['mentor'];
        // คิวรีหา intern จากตาราง intern_info โดยใช้ mentor ที่ได้มา
        $sql = "SELECT user_id, nickname, firstName, lastName, datestart, dateend, project FROM intern_info WHERE mentor = :mentor";
        $stmt = $con->prepare($sql);
        $stmt->bindParam(':mentor', $mentor);
        $stmt->execute();

        // ดึงข้อมูลทั้งหมดจากผลลัพธ์
        $internData = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // ตรวจสอบว่ามีข้อมูล intern หรือไม่
        if (!empty($internData)) {
            // ส่งข้อมูลกลับเป็น JSON
            echo json_encode($internData);
        } else {
            echo json_encode(['error' => 'No interns found for this mentor']);
        }
    } else {
        echo json_encode(['error' => 'Mentor not found']);
    }

} catch (PDOException $e) {
    // หากมีข้อผิดพลาด
    echo json_encode(['error' => $e->getMessage()]);
}
?>
