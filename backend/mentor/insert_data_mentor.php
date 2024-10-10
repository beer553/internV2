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
    // สร้างการเชื่อมต่อฐานข้อมูล
    $con = new PDO("sqlsrv:Server=$serverName;Database=$database;Encrypt=false", $uid, $pwd);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // ตรวจสอบว่า request เป็น GET หรือ POST
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // รับค่า userId ผ่าน GET request
        $userId = $_GET['user_id'] ?? null;
        
        if (!$userId) {
            echo json_encode(['error' => 'User ID is required']);
            exit;
        }

        // กรณีเป็น GET: ดึงข้อมูลผู้ใช้เพิ่มเติมจากฐานข้อมูล
        $sql = "SELECT user_id, title, mentor, profile_picture, completed FROM mentor_info WHERE user_id = :userId";
        $stmt = $con->prepare($sql);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        // ส่งข้อมูลกลับในรูปแบบ JSON
        if ($result) {
            echo json_encode($result); // ส่งข้อมูลทั้งหมดกลับมา
        } else {
            echo json_encode(['error' => 'No data found for the given user_id.']);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // รับค่า userId ผ่าน POST request
        $userId = $_POST['userId'] ?? null;
        if (!$userId) {
            echo json_encode(['error' => 'User ID is required']);
            exit;
        }

        // กรณีเป็น POST: บันทึกข้อมูลผู้ใช้ใหม่
        $title = $_POST['title'];
        $mentor = $_POST['fullName']; // ใช้ fullName ใน POST request เพื่อเก็บชื่อ-นามสกุลในคอลัมน์ mentor
        $profilePicture = $_FILES['profilePicture'];

        // ตรวจสอบว่ามีการอัปโหลดรูปโปรไฟล์
        if (isset($profilePicture) && $profilePicture['error'] === UPLOAD_ERR_OK) {
            // กำหนด directory สำหรับบันทึกรูป
            $uploadDir = __DIR__ . '/uploads/';

            // ตรวจสอบว่าโฟลเดอร์มีอยู่แล้วหรือไม่ ถ้าไม่มีให้สร้าง
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true); // สร้างโฟลเดอร์ถ้ายังไม่มี
            }

            // ตรวจสอบชื่อไฟล์อย่างละเอียด
            $fileInfo = pathinfo($profilePicture['name']);
            $fileExt = strtolower($fileInfo['extension']);
            $validExt = ['jpg', 'jpeg', 'png', 'gif']; // ตรวจสอบไฟล์ประเภทที่ยอมรับ
            if (!in_array($fileExt, $validExt)) {
                echo json_encode(['success' => false, 'message' => 'Invalid file type']);
                exit;
            }

            // ตั้งชื่อไฟล์ใหม่ให้ปลอดภัย
            $safeFilename = uniqid() . '.' . $fileExt;
            $uploadFile = $uploadDir . $safeFilename;

            // ย้ายไฟล์รูปที่อัปโหลดไปยัง directory ที่กำหนด
            if (move_uploaded_file($profilePicture['tmp_name'], $uploadFile)) {
                // ตรวจสอบว่ามี userId อยู่ในฐานข้อมูลหรือไม่
                $sql = "SELECT COUNT(*) as count FROM mentor_info WHERE user_id = :userId";
                $stmt = $con->prepare($sql);
                $stmt->bindParam(':userId', $userId);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($result['count'] > 0) {
                    // ถ้ามี user_id อยู่แล้ว ทำการ UPDATE
                    $sql = "UPDATE mentor_info SET title = :title, mentor = :mentor, profile_picture = :profilePicture, completed = 1 WHERE user_id = :userId";
                    $stmt = $con->prepare($sql);
                    $stmt->bindParam(':title', $title);
                    $stmt->bindParam(':mentor', $mentor);
                    $stmt->bindParam(':profilePicture', $safeFilename);
                    $stmt->bindParam(':userId', $userId);

                    if ($stmt->execute()) {
                        echo json_encode(['success' => true, 'message' => 'Data updated successfully']);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Failed to update data']);
                    }
                } else {
                    // ถ้ายังไม่มี user_id ทำการ INSERT ข้อมูลใหม่
                    $sql = "INSERT INTO mentor_info (user_id, title, mentor, profile_picture, completed) VALUES (:userId, :title, :mentor, :profilePicture, 1)";
                    $stmt = $con->prepare($sql);
                    $stmt->bindParam(':userId', $userId);
                    $stmt->bindParam(':title', $title);
                    $stmt->bindParam(':mentor', $mentor);
                    $stmt->bindParam(':profilePicture', $safeFilename);
                    
                    if ($stmt->execute()) {
                        echo json_encode(['success' => true, 'message' => 'Data inserted successfully']);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Failed to insert data']);
                    }
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to upload file']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'No file uploaded or upload error']);
        }
    } else {
        echo json_encode(['error' => 'Invalid request method']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
