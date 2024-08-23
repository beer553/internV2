<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

$uid = ""; // ชื่อผู้ใช้ SQL Server
$pwd = ""; // รหัสผ่าน SQL Server

$serverName = "CHAWANRAT"; // ชื่อเซิร์ฟเวอร์ SQL Server
$database = "Intern"; // ชื่อฐานข้อมูล

try {
    // เชื่อมต่อกับฐานข้อมูลโดยปิดการเข้ารหัส SSL
    $con = new PDO("sqlsrv:Server=$serverName;Database=$database;Encrypt=false", $uid, $pwd);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // เตรียมคำสั่ง SQL สำหรับการบันทึกข้อมูล โดยใช้ CONVERT เพื่อแปลงไฟล์เป็น VARBINARY
    $stmt = $con->prepare("
    INSERT INTO intern_info (
        title, firstName, lastName, nickname, titleEng, firstNameEng, lastNameEng, nicknameEng, age, birthDate, idCard, nationality, religion, phone, facebook, lineId, email2, email3, gender, mentor, address, currentAddress, currentEducation, faculty, major, educationLevel, educationLevell, gpa, hobbies, specialSkills, position, goodjob, otherJob, program, otherprogram, datestart, dateend, profile, resume, transcript, otherFiles
    ) VALUES (
        :title, :firstName, :lastName, :nickname, :titleEng, :firstNameEng, :lastNameEng, :nicknameEng, :age, :birthDate, :idCard, :nationality, :religion, :phone, :facebook, :lineId, :email2, :email3, :gender, :mentor, :address, :currentAddress, :currentEducation, :faculty, :major, :educationLevel, :educationLevell, :gpa, :hobbies, :specialSkills, :position, :goodjob, :otherJob, :program, :otherprogram, :datestart, :dateend, :profile, :resume, :transcript, :otherFiles
    )
");

    // แปลงข้อมูลทั้งหมดเป็น UTF-8 ก่อนการบันทึก
    foreach ($_POST as $key => $value) {
        $_POST[$key] = mb_convert_encoding($value, 'UTF-8', 'auto');
    }

    // Bind ข้อมูลที่ไม่ใช่ไฟล์
    $stmt->bindParam(':title', $_POST['title']);
    $stmt->bindParam(':firstName', $_POST['firstName']);
    $stmt->bindParam(':lastName', $_POST['lastName']);
    $stmt->bindParam(':nickname', $_POST['nickname']);
    $stmt->bindParam(':titleEng', $_POST['titleEng']);
    $stmt->bindParam(':firstNameEng', $_POST['firstNameEng']);
    $stmt->bindParam(':lastNameEng', $_POST['lastNameEng']);
    $stmt->bindParam(':nicknameEng', $_POST['nicknameEng']);
    $stmt->bindParam(':age', $_POST['age']); 
    $stmt->bindParam(':birthDate', $_POST['birthDate']);
    $stmt->bindParam(':idCard', $_POST['idCard']);
    $stmt->bindParam(':nationality', $_POST['nationality']);
    $stmt->bindParam(':religion', $_POST['religion']);
    $stmt->bindParam(':phone', $_POST['phone']);
    $stmt->bindParam(':facebook', $_POST['facebook']);
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
    $stmt->bindParam(':goodjob', $_POST['goodjob']);
    $stmt->bindParam(':otherJob', $_POST['otherJob']);
    $stmt->bindParam(':program', $_POST['program']);
    $stmt->bindParam(':otherprogram', $_POST['otherprogram']);
    $stmt->bindParam(':datestart', $_POST['datestart']);
    $stmt->bindParam(':dateend', $_POST['dateend']);

    // Handle file uploads
    if (!empty($_FILES['profile']['tmp_name'])) {
        $profile = file_get_contents($_FILES['profile']['tmp_name']);
        $stmt->bindParam(':profile', $profile, PDO::PARAM_LOB);
    } else {
        $profile = null;
        $stmt->bindParam(':profile', $profile, PDO::PARAM_LOB);
    }

    if (!empty($_FILES['resume']['tmp_name'])) {
        $resume = file_get_contents($_FILES['resume']['tmp_name']);
        $stmt->bindParam(':resume', $resume, PDO::PARAM_LOB);
    } else {
        $resume = null;
        $stmt->bindParam(':resume', $resume, PDO::PARAM_LOB);
    }

    if (!empty($_FILES['transcript']['tmp_name'])) {
        $transcript = file_get_contents($_FILES['transcript']['tmp_name']);
        $stmt->bindParam(':transcript', $transcript, PDO::PARAM_LOB);
    } else {
        $transcript = null;
        $stmt->bindParam(':transcript', $transcript, PDO::PARAM_LOB);
    }

    if (!empty($_FILES['otherFiles']['tmp_name'])) {
        $otherFiles = file_get_contents($_FILES['otherFiles']['tmp_name']);
        $stmt->bindParam(':otherFiles', $otherFiles, PDO::PARAM_LOB);
    } else {
        $otherFiles = null;
        $stmt->bindParam(':otherFiles', $otherFiles, PDO::PARAM_LOB);
    }

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
