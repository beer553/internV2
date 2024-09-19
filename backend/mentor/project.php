<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT'); // เพิ่ม PUT เพื่อรองรับคำขอแก้ไข
header('Access-Control-Allow-Headers: Content-Type');

$uid = ""; // ชื่อผู้ใช้ SQL Server
$pwd = ""; // รหัสผ่าน SQL Server
$serverName = "CHAWANRAT"; // ชื่อเซิร์ฟเวอร์ SQL Server
$database = "Intern"; // ชื่อฐานข้อมูล

try {
    // เชื่อมต่อฐานข้อมูล
    $con = new PDO("sqlsrv:Server=$serverName;Database=$database;Encrypt=false", $uid, $pwd);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // ตรวจสอบว่าคำขอเป็น POST หรือไม่
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // รับข้อมูลจากคำขอ POST (JSON input)
        $data = json_decode(file_get_contents('php://input'), true);

        // ตรวจสอบว่าข้อมูลที่ส่งมาครบถ้วนหรือไม่
        if (isset($data['projectName'], $data['startDate'], $data['endDate'], $data['manager'], $data['status'], $data['user_id'])) {
            // สร้างคำสั่ง SQL สำหรับการเพิ่มข้อมูลโปรเจค โดยไม่ต้องใช้ project_id
            $sql = "INSERT INTO project (projectname, startdate, enddate, scrummaster, status, user_id) 
                    VALUES (:projectName, :startDate, :endDate, :manager, :status, :user_id)";
            $stmt = $con->prepare($sql);

            // ผูกค่าพารามิเตอร์
            $stmt->bindParam(':projectName', $data['projectName']);
            $stmt->bindParam(':startDate', $data['startDate']);
            $stmt->bindParam(':endDate', $data['endDate']);
            $stmt->bindParam(':manager', $data['manager']);
            $stmt->bindParam(':status', $data['status']);
            $stmt->bindParam(':user_id', $data['user_id']);

            // ดำเนินการคำสั่ง SQL
            if ($stmt->execute()) {
                // ดึง project_id ที่ถูกสร้างจากฐานข้อมูล
                $project_id = $con->lastInsertId();
                echo json_encode(['message' => 'Project added successfully', 'project_id' => $project_id]);
            } else {
                echo json_encode(['error' => 'Error inserting project']);
            }
        } else {
            echo json_encode(['error' => 'Invalid input data']);
        }
    }
    // ตรวจสอบว่าคำขอเป็น GET หรือไม่ เพื่อดึงข้อมูลโปรเจค
    elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
        // ตรวจสอบว่า user_id ถูกส่งมาหรือไม่
        if (isset($_GET['user_id'])) {
            $user_id = $_GET['user_id'];

            // สร้างคำสั่ง SQL เพื่อดึงข้อมูลโปรเจคตาม user_id
            $sql = "SELECT * FROM project WHERE user_id = :user_id";
            $stmt = $con->prepare($sql);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
            $stmt->execute();

            // ดึงข้อมูลทั้งหมดจากฐานข้อมูล
            $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // ส่งข้อมูลโปรเจคกลับในรูปแบบ JSON
            echo json_encode($projects);
        } else {
            echo json_encode(['error' => 'user_id not provided']);
        }
    }
    // ฟังก์ชันแก้ไขโปรเจคเมื่อได้รับคำขอ PUT
    elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        // รับข้อมูล JSON ที่ส่งมา
        $data = json_decode(file_get_contents('php://input'), true);

        // ตรวจสอบว่ามี project_id และข้อมูลที่จำเป็นครบถ้วนหรือไม่
        if (isset($data['project_id'], $data['projectName'], $data['startDate'], $data['endDate'], $data['manager'], $data['status'], $data['user_id'])) {
            // สร้างคำสั่ง SQL สำหรับการอัปเดตข้อมูลโปรเจค
            $sql = "UPDATE project SET projectname = :projectName, startdate = :startDate, enddate = :endDate, 
                    scrummaster = :manager, status = :status WHERE project_id = :project_id AND user_id = :user_id";
            $stmt = $con->prepare($sql);

            // ผูกค่าพารามิเตอร์
            $stmt->bindParam(':projectName', $data['projectName']);
            $stmt->bindParam(':startDate', $data['startDate']);
            $stmt->bindParam(':endDate', $data['endDate']);
            $stmt->bindParam(':manager', $data['manager']);
            $stmt->bindParam(':status', $data['status']);
            $stmt->bindParam(':project_id', $data['project_id']);
            $stmt->bindParam(':user_id', $data['user_id']);

            // ดำเนินการอัปเดตคำสั่ง SQL
            if ($stmt->execute()) {
                echo json_encode(['message' => 'Project updated successfully']);
            } else {
                echo json_encode(['error' => 'Error updating project']);
            }
        } else {
            echo json_encode(['error' => 'Invalid input data']);
        }
    } else {
        echo json_encode(['message' => 'Invalid request method']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
?>
