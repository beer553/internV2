<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// กำหนดข้อมูลสำหรับเชื่อมต่อ SQL Server
$uid = "SA"; // ชื่อผู้ใช้ SQL Server
$pwd = "phurin4508!"; // รหัสผ่าน SQL Server
$serverName = "Intern_V2,1433"; // ชื่อเซิร์ฟเวอร์ SQL Server
$database = "Intern"; // ชื่อฐานข้อมูล

try {
    // Connect to the database
    $con = new PDO("sqlsrv:Server=$serverName;Database=$database;Encrypt=false", $uid, $pwd);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo json_encode(['message' => 'Database connection successful']); // ดีบักการเชื่อมต่อฐานข้อมูล
    // ตรวจสอบว่าเป็นการร้องขอแบบ POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // ตรวจสอบว่ามีการส่ง backlog_id มาหรือไม่
        if (!isset($_POST['backlog_id']) || empty($_POST['backlog_id'])) {
            echo json_encode(['error' => 'Missing or empty backlog_id']);
            exit;
        }

        // รับค่า backlog_id จาก POST
        $backlog_id = $_POST['backlog_id'];
        echo json_encode(['message' => 'Received backlog_id: ' . $backlog_id]); // ดีบัก backlog_id

        // ตรวจสอบว่า backlog_id มีอยู่ในฐานข้อมูลหรือไม่
        $stmt = $con->prepare("SELECT imgBefore, imgAfter FROM backlog WHERE backlog_id = :backlog_id");
        $stmt->bindParam(':backlog_id', $backlog_id);
        $stmt->execute();
        $backlog = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$backlog) {
            echo json_encode(['error' => 'Backlog not found']);
            exit;
        }

        echo json_encode(['message' => 'Backlog found']); // ดีบักการค้นหา backlog

        // ลบไฟล์รูปภาพถ้ามี
        if (!empty($backlog['imgBefore']) && file_exists($backlog['imgBefore'])) {
            if (!unlink($backlog['imgBefore'])) {
                echo json_encode(['error' => 'Failed to delete imgBefore file']);
                exit;
            }
        }
        if (!empty($backlog['imgAfter']) && file_exists($backlog['imgAfter'])) {
            if (!unlink($backlog['imgAfter'])) {
                echo json_encode(['error' => 'Failed to delete imgAfter file']);
                exit;
            }
        }

        echo json_encode(['message' => 'Images deleted successfully or not found']); // ดีบักการลบรูปภาพ

        // ลบข้อมูลจากตาราง backlog
        $stmt = $con->prepare("DELETE FROM backlog WHERE backlog_id = :backlog_id");
        $stmt->bindParam(':backlog_id', $backlog_id);

        // Execute SQL statement
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Backlog deleted successfully']);
        } else {
            $errorInfo = $stmt->errorInfo();
            echo json_encode(['error' => 'Error deleting backlog: ' . $errorInfo[2]]);
        }
    } else {
        echo json_encode(['error' => 'Invalid request method']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
