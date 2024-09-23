<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');
header('Access-Control-Allow-Headers: Content-Type');

// กำหนดข้อมูลสำหรับเชื่อมต่อ SQL Server
$uid = ""; // ชื่อผู้ใช้ SQL Server
$pwd = ""; // รหัสผ่าน SQL Server
$serverName = "CHAWANRAT"; // ชื่อเซิร์ฟเวอร์ SQL Server
$database = "Intern"; // ชื่อฐานข้อมูล 

try {
    // เชื่อมต่อฐานข้อมูล
    $con = new PDO("sqlsrv:Server=$serverName;Database=$database;Encrypt=false", $uid, $pwd);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // ตรวจสอบว่าคำขอเป็น GET หรือไม่
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        // ตรวจสอบว่า user_id ถูกส่งมาหรือไม่
        if (isset($_GET['user_id'])) {
            $user_id = $_GET['user_id'];

            // สร้างคำสั่ง SQL เพื่อดึงข้อมูลโปรเจค
            $sql = "SELECT p.project_id, p.projectname, p.startdate, p.enddate, p.scrummaster, p.status, p.teamdevelop
                    FROM project p
                    WHERE p.user_id = :user_id";
            
            $stmt = $con->prepare($sql);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
            $stmt->execute();

            // ดึงข้อมูลทั้งหมดจากฐานข้อมูล
            $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // ตรวจสอบว่ามีข้อมูลหรือไม่
            if ($projects) {
                foreach ($projects as &$project) {
                    // ตรวจสอบว่ามีค่า teamdevelop หรือไม่
                    if (isset($project['teamdevelop']) && $project['teamdevelop'] !== null) {
                        // แยก user_id ที่อยู่ใน teamdevelop ออกมาเป็นอาร์เรย์
                        $team_ids = explode(',', $project['teamdevelop']);
                        
                        // เตรียม query เพื่อดึงชื่อสมาชิกทีมพัฒนา
                        $placeholders = implode(',', array_fill(0, count($team_ids), '?')); // สร้าง placeholder
                        $sqlMembers = "SELECT nickname FROM intern_info WHERE user_id IN ($placeholders)";
                        
                        $stmtMembers = $con->prepare($sqlMembers);
                        $stmtMembers->execute($team_ids);
                        
                        // ดึงข้อมูลชื่อสมาชิกทีม
                        $members = $stmtMembers->fetchAll(PDO::FETCH_COLUMN);
                        
                        // รวมชื่อสมาชิกทีมให้คั่นด้วย ,
                        $project['team_members'] = implode(', ', $members);
                    } else {
                        $project['team_members'] = null; // ถ้าไม่มีสมาชิกทีม
                    }
                }
                // ส่งข้อมูลโปรเจคพร้อมชื่อทีมพัฒนากลับในรูปแบบ JSON
                echo json_encode($projects);
            } else {
                echo json_encode(['error' => 'No projects found']);
            }
        } else {
            echo json_encode(['error' => 'user_id not provided']);
        }
    }
    // ตรวจสอบว่าคำขอเป็น POST หรือไม่
    elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // รับข้อมูลจากคำขอ POST (JSON input)
        $data = json_decode(file_get_contents('php://input'), true);

        // ตรวจสอบว่าข้อมูลที่ส่งมาครบถ้วนหรือไม่
        if (isset($data['projectName'], $data['startDate'], $data['endDate'], $data['manager'], $data['status'], $data['user_id'])) {
            // สร้างคำสั่ง SQL สำหรับการเพิ่มข้อมูลโปรเจค
            $sql = "INSERT INTO project (projectname, startdate, enddate, scrummaster, status, user_id)
                    OUTPUT INSERTED.project_id
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
                $project_id = $stmt->fetchColumn(); // ใช้ fetchColumn() เพื่อดึง project_id
                echo json_encode(['message' => 'Project added successfully', 'project_id' => $project_id]);
            } else {
                echo json_encode(['error' => 'Error inserting project']);
            }
        } else {
            echo json_encode(['error' => 'Invalid input data']);
        }
    }
    // ตรวจสอบว่าคำขอเป็น PUT หรือไม่
    elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        // รับข้อมูล JSON ที่ส่งมา
        $data = json_decode(file_get_contents('php://input'), true);

        // ตรวจสอบว่าข้อมูลที่จำเป็นครบถ้วนหรือไม่
        if (isset($data['project_id'], $data['projectName'], $data['startDate'], $data['endDate'], $data['manager'], $data['status'], $data['user_id'])) {
            // สร้างคำสั่ง SQL สำหรับการอัปเดตข้อมูลโปรเจค
            $sql = "UPDATE project SET projectname = :projectName, startdate = :startDate, enddate = :endDate, scrummaster = :manager, status = :status 
                    WHERE project_id = :project_id AND user_id = :user_id";
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
    }
    else {
        echo json_encode(['message' => 'Invalid request method']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
?>
