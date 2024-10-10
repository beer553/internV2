<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// กำหนดค่าเชื่อมต่อฐานข้อมูล
$uid = "SA"; // ชื่อผู้ใช้ SQL Server (ในกรณีนี้คือ SA)
$pwd = "phurin4508!"; // รหัสผ่าน SQL Server (ที่คุณตั้งไว้ตอนสร้าง container)
$serverName = "Intern_V2,1433"; // ชื่อเซิร์ฟเวอร์ SQL Server และ port ที่คุณใช้เชื่อมต่อ (1433)
$database = "Intern"; // ชื่อฐานข้อมูลที่คุณต้องการเชื่อมต่อ

try {
    // เชื่อมต่อกับฐานข้อมูลโดยปิดการเข้ารหัส SSL
    $con = new PDO("sqlsrv:Server=$serverName;Database=$database;Encrypt=false", $uid, $pwd);

    // ตั้งค่าการจัดการข้อผิดพลาด
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // ส่งผลลัพธ์การเชื่อมต่อสำเร็จในรูปแบบ JSON
    echo json_encode(array("status" => "success", "message" => "Connected successfully"));
} catch (PDOException $e) {
    // ส่งผลลัพธ์การเชื่อมต่อล้มเหลวในรูปแบบ JSON
    echo json_encode(array("status" => "error", "message" => "Connection failed: " . $e->getMessage()));
}
?>
