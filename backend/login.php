<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dsn = "sqlsrv:server=CHAWANRAT;database=Intern";
$usernameDB = "";
$passwordDB = "";

try {
    $con = new PDO($dsn, $usernameDB, $passwordDB);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $e->getMessage()]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    if ($username && $password) {
        $sql = "SELECT * FROM user_info WHERE username = ?";
        $stmt = $con->prepare($sql);
        $stmt->execute([$username]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $isDataFilled = $user['is_data_filled']; // ตรวจสอบว่ากรอกข้อมูลแล้วหรือยัง

            // กำหนดการ redirect ตาม role
            if ($user['role'] === 'intern') {
                $redirectPage = !$isDataFilled ? 'input_data_intern' : 'home';
            } elseif ($user['role'] === 'mentor') {
                $redirectPage = 'Homepage'; // ให้ mentor ไปหน้า Homepage
            } else {
                $redirectPage = 'home'; // กรณีอื่นๆ ให้ไปที่ home
            }

            echo json_encode([
                'status' => 'success',
                'message' => 'Login successful',
                'role' => $user['role'],
                'user_id'=> $user['user_id'],
                'redirect' => $redirectPage
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Invalid username or password'
            ]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Username and password are required']);
    }
}
?>
