<?php
$uid = ""; // ชื่อผู้ใช้ SQL Server
$pwd = ""; // รหัสผ่าน SQL Server

$serverName = "CHAWANRAT"; // ชื่อเซิร์ฟเวอร์ SQL Server
$database = "Intern"; // ชื่อฐานข้อมูล

try {
    // เชื่อมต่อกับฐานข้อมูลโดยปิดการเข้ารหัส SSL
    $con = new PDO("sqlsrv:Server=$serverName;Database=$database;Encrypt=false", $uid, $pwd);

    // ตั้งค่าการจัดการข้อผิดพลาด
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "เทสๆ"; 
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
