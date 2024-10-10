<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST'); // อนุญาตให้ใช้ทั้ง GET และ POST
header('Access-Control-Allow-Headers: Content-Type');

// กำหนดค่าเชื่อมต่อฐานข้อมูล
$uid = "SA"; // ชื่อผู้ใช้ SQL Server (ในกรณีนี้คือ SA)
$pwd = "phurin4508!"; // รหัสผ่าน SQL Server (ที่คุณตั้งไว้ตอนสร้าง container)
$serverName = "Intern_V2,1433"; // ชื่อเซิร์ฟเวอร์ SQL Server และ port ที่คุณใช้เชื่อมต่อ (1433)
$database = "Intern"; // ชื่อฐานข้อมูลที่คุณต้องการเชื่อมต่อ

try {
    // สร้างการเชื่อมต่อฐานข้อมูลโดยใช้ PDO กับ SQL Server
    $con = new PDO("sqlsrv:Server=$serverName;Database=$database;Encrypt=false", $uid, $pwd);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['user_id'])) {
            $id = $_GET['user_id']; 

            try {
                $stmt = $con->prepare("SELECT * FROM intern_info WHERE user_id = ?");
                $stmt->execute([$id]);
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($result) {
                    echo json_encode($result);
                } else {
                    echo json_encode(array("error" => "No data found for the given user_id."));
                }
            } catch (PDOException $e) {
                echo json_encode(array("error" => "Database error."));
            }
        } else {
            echo json_encode(array("error" => "ID parameter is missing."));
        }
        exit;
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // ส่วนบันทึกข้อมูล goal
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['user_id']) && isset($data['goal'])) {
            $id = $data['user_id'];
            $goal = $data['goal'];

            try {
                $stmt = $con->prepare("UPDATE intern_info SET goal = ? WHERE user_id = ?");
                $stmt->execute([$goal, $id]);

                if ($stmt->rowCount() > 0) {
                    echo json_encode(array("message" => "Goal updated successfully."));
                } else {
                    echo json_encode(array("error" => "No rows updated. Please check the user_id."));
                }
            } catch (PDOException $e) {
                echo json_encode(array("error" => "Database error: " . $e->getMessage()));
            }
        } else {
            echo json_encode(array("error" => "Missing user_id or goal in request."));
        }
        exit;
    }
} catch (PDOException $e) {
    echo json_encode(array("error" => "Database error: " . $e->getMessage()));
    exit;
}

