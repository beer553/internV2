<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// ข้อมูลการเชื่อมต่อฐานข้อมูล
$uid = ""; // ชื่อผู้ใช้ SQL Server
$pwd = ""; // รหัสผ่าน SQL Server
$serverName = "CHAWANRAT"; // ชื่อเซิร์ฟเวอร์ SQL Server
$database = "Intern"; // ชื่อฐานข้อมูล

try {
    // เชื่อมต่อกับฐานข้อมูล
    $con = new PDO("sqlsrv:Server=$serverName;Database=$database;Encrypt=false", $uid, $pwd);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // กำหนดพาธหลักสำหรับการอัปโหลดไฟล์
    $baseUploadDir = 'uploads/';
    if (!is_dir($baseUploadDir)) {
        mkdir($baseUploadDir, 0777, true);
    }

    // สร้างโฟลเดอร์สำหรับแต่ละประเภทของไฟล์
    $folders = ['profile', 'resume', 'transcript', 'otherFiles'];
    foreach ($folders as $folder) {
        $dir = $baseUploadDir . $folder . '/';
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }
    }

    // กำหนดพาธสำหรับไฟล์แต่ละประเภท
    $profileDir = $baseUploadDir . 'profile/';
    $resumeDir = $baseUploadDir . 'resume/';
    $transcriptDir = $baseUploadDir . 'transcript/';
    $otherFilesDir = $baseUploadDir . 'otherFiles/';

    // อัปโหลดไฟล์ไปยังโฟลเดอร์ที่กำหนด
    $profilePath = !empty($_FILES['profile']['tmp_name']) ? $profileDir . basename($_FILES['profile']['name']) : null;
    $resumePath = !empty($_FILES['resume']['tmp_name']) ? $resumeDir . basename($_FILES['resume']['name']) : null;
    $transcriptPath = !empty($_FILES['transcript']['tmp_name']) ? $transcriptDir . basename($_FILES['transcript']['name']) : null;
    $otherFilesPath = !empty($_FILES['otherFiles']['tmp_name']) ? $otherFilesDir . basename($_FILES['otherFiles']['name']) : null;

    // ย้ายไฟล์ไปยังโฟลเดอร์ที่กำหนด
    if ($profilePath && move_uploaded_file($_FILES['profile']['tmp_name'], $profilePath)) {
        $profilePath = basename($_FILES['profile']['name']);
    } else {
        $profilePath = null;
    }
    if ($resumePath && move_uploaded_file($_FILES['resume']['tmp_name'], $resumePath)) {
        $resumePath = basename($_FILES['resume']['name']);
    } else {
        $resumePath = null;
    }
    if ($transcriptPath && move_uploaded_file($_FILES['transcript']['tmp_name'], $transcriptPath)) {
        $transcriptPath = basename($_FILES['transcript']['name']);
    } else {
        $transcriptPath = null;
    }
    if ($otherFilesPath && move_uploaded_file($_FILES['otherFiles']['tmp_name'], $otherFilesPath)) {
        $otherFilesPath = basename($_FILES['otherFiles']['name']);
    } else {
        $otherFilesPath = null;
    }

    // เตรียมคำสั่ง SQL สำหรับการบันทึกข้อมูล
    $stmt = $con->prepare("
        INSERT INTO intern_info (
            title, firstName, lastName, nickname, titleEng, firstNameEng, lastNameEng, nicknameEng, user_id, age, birthDate, idCard, nationality, religion, phone, lineId, email2, email3, gender, mentor, address, currentAddress, currentEducation, faculty, major, educationLevel, educationLevell, gpa, hobbies, specialSkills, position, section, goodjob, otherJob, program, otherprogram, datestart, dateend, profile, resume, transcript, otherFiles
        ) VALUES (
            :title, :firstName, :lastName, :nickname, :titleEng, :firstNameEng, :lastNameEng, :nicknameEng, :internid, :age, :birthDate, :idCard, :nationality, :religion, :phone, :lineId, :email2, :email3, :gender, :mentor, :address, :currentAddress, :currentEducation, :faculty, :major, :educationLevel, :educationLevell, :gpa, :hobbies, :specialSkills, :position, :section, :goodjob, :otherJob, :program, :otherprogram, :datestart, :dateend, :profile, :resume, :transcript, :otherFiles
        )
    ");

    // Bind ข้อมูลที่ไม่ใช่ไฟล์
    $stmt->bindParam(':title', $_POST['title']);
    $stmt->bindParam(':firstName', $_POST['firstName']);
    $stmt->bindParam(':lastName', $_POST['lastName']);
    $stmt->bindParam(':nickname', $_POST['nickname']);
    $stmt->bindParam(':titleEng', $_POST['titleEng']);
    $stmt->bindParam(':firstNameEng', $_POST['firstNameEng']);
    $stmt->bindParam(':lastNameEng', $_POST['lastNameEng']);
    $stmt->bindParam(':nicknameEng', $_POST['nicknameEng']);
    $stmt->bindParam(':internid', $_POST['internid']);
    $stmt->bindParam(':age', $_POST['age']); 
    $stmt->bindParam(':birthDate', $_POST['birthDate']);
    $stmt->bindParam(':idCard', $_POST['idCard']);
    $stmt->bindParam(':nationality', $_POST['nationality']);
    $stmt->bindParam(':religion', $_POST['religion']);
    $stmt->bindParam(':phone', $_POST['phone']);
    // $stmt->bindParam(':facebook', $_POST['facebook']);
    $stmt->bindParam(':lineId', $_POST['lineId']);
    $stmt->bindParam(':email2', $_POST['email2']);
    $stmt->bindParam(':email3', $_POST['email3']);
    $stmt->bindParam(':gender', $_POST['gender']);
    $stmt->bindParam(':mentor', $_POST['mentor']);
    $stmt->bindParam(':address', $_POST['address']);
    $stmt->bindParam(':currentAddress', $_POST['currentAddress']);
    $stmt->bindParam(':currentEducation', $_POST['currentEducation']);
    $stmt->bindParam(':faculty', $_POST['faculty']);
    $stmt->bindParam(':major', $_POST['major']);
    $stmt->bindParam(':educationLevel', $_POST['educationLevel']);
    $stmt->bindParam(':educationLevell', $_POST['educationLevell']);
    $stmt->bindParam(':gpa', $_POST['gpa']);
    $stmt->bindParam(':hobbies', $_POST['hobbies']);
    $stmt->bindParam(':specialSkills', $_POST['specialSkills']);
    $stmt->bindParam(':position', $_POST['position']);
    $stmt->bindParam(':section', $_POST['section']);
    $stmt->bindParam(':goodjob', $_POST['goodjob']);
    $stmt->bindParam(':otherJob', $_POST['otherJob']);
    $stmt->bindParam(':program', $_POST['program']);
    $stmt->bindParam(':otherprogram', $_POST['otherprogram']);
    $stmt->bindParam(':datestart', $_POST['datestart']);
    $stmt->bindParam(':dateend', $_POST['dateend']);

    // Bind ข้อมูลไฟล์
    $stmt->bindParam(':profile', $profilePath);
    $stmt->bindParam(':resume', $resumePath);
    $stmt->bindParam(':transcript', $transcriptPath);
    $stmt->bindParam(':otherFiles', $otherFilesPath);

    // ดำเนินการบันทึกข้อมูล
    $stmt->execute();

    // ตรวจสอบผลการดำเนินการ
    $errorInfo = $stmt->errorInfo();
    if ($errorInfo[0] !== '00000') {
        echo json_encode([
            "status" => "error",
            "message" => "SQLSTATE: " . $errorInfo[0] . " SQL Error Code: " . $errorInfo[1] . " Error Message: " . $errorInfo[2]
        ]);
    } else {
        echo json_encode([
            "status" => "success",
            "message" => "Data inserted successfully!"
        ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to insert data: " . $e->getMessage()
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Error: " . $e->getMessage()
    ]);
}

// สำหรับการดีบั๊ก พิมพ์ข้อมูล POST ทั้งหมดที่ได้รับ
print_r($_POST);
?>
