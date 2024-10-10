<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

include 'connect.php';

$inputJSON = file_get_contents('php://input');
error_log("Raw input: " . $inputJSON); // บันทึกข้อมูล JSON ที่ได้รับไปยัง log
$input = json_decode($inputJSON, true);

// ตรวจสอบว่าข้อมูล JSON ถูกต้องหรือไม่
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['status' => 'error', 'message' => 'รูปแบบข้อมูลไม่ถูกต้อง'], JSON_UNESCAPED_UNICODE);
    exit();
}

// ดึงข้อมูลจาก JSON
$username = isset($input['username']) ? trim($input['username']) : null;
$user_id = isset($input['user_id']) ? trim($input['user_id']) : null;
$password = isset($input['password']) ? $input['password'] : null;

// ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
if (empty($username) || empty($user_id) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'กรุณากรอกข้อมูลให้ครบถ้วน'], JSON_UNESCAPED_UNICODE);
    exit();
}

// กำหนด role ตาม user_id
$role = (strpos($user_id, '0001-') === 0) ? 'intern' : 'mentor';

// เข้ารหัสรหัสผ่านด้วย BCRYPT
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// ตรวจสอบว่ามีผู้ใช้งานซ้ำหรือไม่
try {
    $checkStmt = $con->prepare("SELECT COUNT(*) FROM user_info WHERE username = :username OR user_id = :user_id");
    $checkStmt->execute([
        ':username' => $username,
        ':user_id' => $user_id
    ]);
    $userExists = $checkStmt->fetchColumn();

    if ($userExists > 0) {
        echo json_encode(['status' => 'error', 'message' => 'ชื่อผู้ใช้หรือรหัสพนักงานนี้มีอยู่แล้ว'], JSON_UNESCAPED_UNICODE);
        exit();
    }

    // เตรียมคำสั่ง SQL สำหรับการเพิ่มข้อมูลผู้ใช้ใหม่
    $stmt = $con->prepare("INSERT INTO user_info (username, user_id, password, role) VALUES (:username, :user_id, :password, :role)");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':password', $hashed_password);
    $stmt->bindParam(':role', $role);

    // ดำเนินการเพิ่มข้อมูล
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'ลงทะเบียนสำเร็จ', 'role' => $role], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'ไม่สามารถเพิ่มข้อมูลได้'], JSON_UNESCAPED_UNICODE);
    }

} catch (PDOException $e) {
    // จัดการข้อผิดพลาดที่เกิดขึ้น
    echo json_encode(['status' => 'error', 'message' => 'เกิดข้อผิดพลาด: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
    exit();
}

// ปิดการเชื่อมต่อฐานข้อมูล
$con = null;
?>
