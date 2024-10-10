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

    // การแก้ไขข้อมูล (POST)
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!isset($_POST['backlog_id'])) {
            echo json_encode(['error' => 'Missing backlog_id']);
            exit;
        }

        // รับค่า backlog_id และข้อมูลอื่น ๆ จาก POST
        $backlog_id = $_POST['backlog_id'];
        $sprint = $_POST['sprint'];
        $notificationDate = DateTime::createFromFormat('Y-m-d', $_POST['notificationDate'])->format('Y-m-d');
        $completionDate = DateTime::createFromFormat('Y-m-d', $_POST['completionDate'])->format('Y-m-d');
        $type_of_work = $_POST['type_of_work'];
        $details = $_POST['details'];
        $manday = $_POST['manday'];
        $teamdevelop = $_POST['teamdevelop'];
        $status = $_POST['status'];
        $productIncrement = DateTime::createFromFormat('Y-m-d', $_POST['productIncrement'])->format('Y-m-d');
        $note = $_POST['note'];

        // การจัดการไฟล์รูปภาพ
        $uploadDir = 'uploadsbacklog/';
        $imgBeforePath = isset($_FILES['beforeImg']) ? $uploadDir . basename($_FILES['beforeImg']['name']) : $_POST['imgBefore'];
        $imgAfterPath = isset($_FILES['afterImg']) ? $uploadDir . basename($_FILES['afterImg']['name']) : $_POST['imgAfter'];

        // ดึงข้อมูลรูปเก่าจากฐานข้อมูล
        $stmt = $con->prepare("SELECT imgBefore, imgAfter FROM backlog WHERE backlog_id = :backlog_id");
        $stmt->bindParam(':backlog_id', $backlog_id);
        $stmt->execute();
        $backlog = $stmt->fetch(PDO::FETCH_ASSOC);

        // ถ้ามีการอัปโหลดรูปใหม่สำหรับ imgBefore
        if (isset($_FILES['beforeImg'])) {
            // ลบไฟล์รูปภาพเก่าถ้ามี
            if (!empty($backlog['imgBefore']) && file_exists($backlog['imgBefore'])) {
                unlink($backlog['imgBefore']);
            }

            // อัปโหลดรูปภาพใหม่
            move_uploaded_file($_FILES['beforeImg']['tmp_name'], $imgBeforePath);
        }

        // ถ้ามีการอัปโหลดรูปใหม่สำหรับ imgAfter
        if (isset($_FILES['afterImg'])) {
            // ลบไฟล์รูปภาพเก่าถ้ามี
            if (!empty($backlog['imgAfter']) && file_exists($backlog['imgAfter'])) {
                unlink($backlog['imgAfter']);
            }

            // อัปโหลดรูปภาพใหม่
            move_uploaded_file($_FILES['afterImg']['tmp_name'], $imgAfterPath);
        }

        // Prepare SQL statement for update
        $stmt = $con->prepare("UPDATE backlog SET 
                                sprint = :sprint,
                                notificationDate = :notificationDate,
                                completionDate = :completionDate,
                                type_of_work = :type_of_work,
                                details = :details,
                                imgBefore = :imgBefore,
                                imgAfter = :imgAfter,
                                manday = :manday,
                                teamdevelop = :teamdevelop,
                                status = :status,
                                productIncrement = :productIncrement,
                                note = :note
                                WHERE backlog_id = :backlog_id");

        // Bind parameters
        $stmt->bindParam(':sprint', $sprint);
        $stmt->bindParam(':notificationDate', $notificationDate);
        $stmt->bindParam(':completionDate', $completionDate);
        $stmt->bindParam(':type_of_work', $type_of_work);
        $stmt->bindParam(':details', $details);
        $stmt->bindParam(':imgBefore', $imgBeforePath);
        $stmt->bindParam(':imgAfter', $imgAfterPath);
        $stmt->bindParam(':manday', $manday);
        $stmt->bindParam(':teamdevelop', $teamdevelop);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':productIncrement', $productIncrement);
        $stmt->bindParam(':note', $note);
        $stmt->bindParam(':backlog_id', $backlog_id);

        // Execute SQL statement
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Backlog updated successfully']);
        } else {
            $errorInfo = $stmt->errorInfo();
            echo json_encode(['error' => 'Error updating backlog: ' . $errorInfo[2]]);
        }
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
