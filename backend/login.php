<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

include 'connect.php';

// ตรวจสอบว่าเป็นคำขอ OPTIONS หรือไม่
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // ส่ง HTTP 200 OK สำหรับ preflight request
    http_response_code(200);
    exit();
}

// การเชื่อมต่อกับ SQL Server โดยใช้ PDO
$dsn = "sqlsrv:server=CHAWANRAT;database=Intern";
$usernameDB = "";
$passwordDB = "";

try {
    $con = new PDO($dsn, $usernameDB, $passwordDB);
    // ตั้งค่า PDO error mode ให้เป็น exception
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $e->getMessage()]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // รับข้อมูลจาก POST request (ใช้ JSON payload)
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    // ตรวจสอบว่าชื่อผู้ใช้และรหัสผ่านถูกตั้งค่าหรือไม่
    if ($username && $password) {
        // ตรวจสอบผู้ใช้ในฐานข้อมูล
        $sql = "SELECT * FROM user_info WHERE username = ?";
        $stmt = $con->prepare($sql);
        $stmt->execute([$username]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            // ล็อกอินสำเร็จ, ส่งข้อมูลบทบาทของผู้ใช้กลับไป
            echo json_encode([
                'status' => 'success',
                'message' => 'Login successful',
                'role' => $user['role'], // ส่ง role กลับไปเพื่อใช้ในการจัดการสิทธิ์
                'user_id'=> $user['user_id']
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Username and password are required']);
    }
}
?>
