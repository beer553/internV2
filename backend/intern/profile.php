<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// ข้อมูลการเชื่อมต่อฐานข้อมูล
$uid = ""; // ชื่อผู้ใช้ SQL Server
$pwd = ""; // รหัสผ่าน SQL Server
$serverName = "CHAWANRAT"; // ชื่อเซิร์ฟเวอร์ SQL Server
$database = "Intern"; // ชื่อฐานข้อมูล

try {
    // เชื่อมต่อกับฐานข้อมูล
    $con = new PDO("sqlsrv:Server=$serverName;Database=$database;Encrypt=false", $uid, $pwd);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // ตรวจสอบว่ามีการส่งค่า user_id มาหรือไม่
    if (isset($_GET['user_id'])) {
        $user_id = $_GET['user_id'];

        // เตรียมคำสั่ง SQL เพื่อคิวรีข้อมูลของผู้ใช้เฉพาะราย
        $stmt = $con->prepare("SELECT * FROM intern_info WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();

        // ดึงข้อมูลของผู้ใช้ที่ค้นหา
        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        // ตรวจสอบว่าพบข้อมูลหรือไม่
        if ($data) {
            // ส่งข้อมูลกลับในรูปแบบ JSON
            echo json_encode([
                "status" => "success",
                "data" => $data
            ]);
        } else {
            // กรณีไม่พบข้อมูลผู้ใช้
            echo json_encode([
                "status" => "error",
                "message" => "User not found."
            ]);
        }
    } else {
        // กรณีไม่ได้ส่ง user_id มาในคำขอ
        echo json_encode([
            "status" => "error",
            "message" => "user_id is required."
        ]);
    }

} catch (PDOException $e) {
    // ส่ง error กลับในรูปแบบ JSON หากเกิดข้อผิดพลาด
    echo json_encode([
        "status" => "error",
        "message" => "Failed to retrieve data: " . $e->getMessage()
    ]);
}
