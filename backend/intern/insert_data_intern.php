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

    // เตรียมคำสั่ง SQL สำหรับการบันทึกข้อมูล
    $stmt = $con->prepare("
    INSERT INTO intern_info (
        title, firstName, lastName, nickname, titleEng, firstNameEng, lastNameEng, nicknameEng, age, birthDate, idCard, nationality, religion, phone, facebook, lineId, email2, email3, gender, address, currentAddress, currentEducation, faculty, major, educationLevel, educationLevell, gpa, hobbies, specialSkills, position, goodjob, otherJob, program, otherprogram, datestart, dateend, profile
    ) VALUES (
        :title, :firstName, :lastName, :nickname, :titleEng, :firstNameEng, :lastNameEng, :nicknameEng, :age, :birthDate, :idCard, :nationality, :religion, :phone, :facebook, :lineId, :email2, :email3, :gender, :address, :currentAddress, :currentEducation, :faculty, :major, :educationLevel, :educationLevell, :gpa, :hobbies, :specialSkills, :position, :goodjob, :otherJob, :program, :otherprogram, :datestart, :dateend, CONVERT(varbinary(max), :profile)
    )
    ");

    // กำหนดค่าจากฟอร์ม โดยเพิ่ม N ไว้ข้างหน้าค่าที่เป็น Unicode
    $stmt->bindParam(':title', $_POST['title']);
    $stmt->bindParam(':firstName',$_POST['firstName']);
    $stmt->bindParam(':lastName', $_POST['lastName']);
    $stmt->bindParam(':nickname', $_POST['nickname']);
    $stmt->bindParam(':titleEng', $_POST['titleEng']);
    $stmt->bindParam(':firstNameEng',  $_POST['firstNameEng']);
    $stmt->bindParam(':lastNameEng',  $_POST['lastNameEng']);
    $stmt->bindParam(':nicknameEng', $_POST['nicknameEng']);
    $stmt->bindParam(':age', $_POST['age']); // ไม่จำเป็นต้องใช้ N สำหรับข้อมูลที่ไม่ใช่ Unicode
    $stmt->bindParam(':birthDate', $_POST['birthDate']);
    $stmt->bindParam(':idCard', $_POST['idCard']);
    $stmt->bindParam(':nationality', $_POST['nationality']);
    $stmt->bindParam(':religion',  $_POST['religion']);
    $stmt->bindParam(':phone', $_POST['phone']);
    $stmt->bindParam(':facebook',  $_POST['facebook']);
    $stmt->bindParam(':lineId',  $_POST['lineId']);
    $stmt->bindParam(':email2', $_POST['email2']);
    $stmt->bindParam(':email3', $_POST['email3']);
    $stmt->bindParam(':gender',  $_POST['gender']);
    $stmt->bindParam(':address', $_POST['address']);
    $stmt->bindParam(':currentAddress',$_POST['currentAddress']);
    $stmt->bindParam(':currentEducation',  $_POST['currentEducation']);
    $stmt->bindParam(':faculty',  $_POST['faculty']);
    $stmt->bindParam(':major',  $_POST['major']);
    $stmt->bindParam(':educationLevel',  $_POST['educationLevel']);
    $stmt->bindParam(':educationLevell',  $_POST['educationLevell']);
    $stmt->bindParam(':gpa', $_POST['gpa']);
    $stmt->bindParam(':hobbies',  $_POST['hobbies']);
    $stmt->bindParam(':specialSkills', $_POST['specialSkills']);
    $stmt->bindParam(':position',  $_POST['position']);
    $stmt->bindParam(':goodjob',  $_POST['goodjob']);
    $stmt->bindParam(':otherJob', $_POST['otherJob']);
    $stmt->bindParam(':program',  $_POST['program']);
    $stmt->bindParam(':otherprogram', $_POST['otherprogram']);
    $stmt->bindParam(':datestart', $_POST['datestart']);
    $stmt->bindParam(':dateend', $_POST['dateend']);

    // กรณีที่มีการอัพโหลดรูปภาพ
    if (!empty($_FILES['profile']['name'])) {
        $profile = file_get_contents($_FILES['profile']['tmp_name']);
        $stmt->bindParam(':profile', $profile, PDO::PARAM_LOB);
    } else {
        $profile = null;
        $stmt->bindParam(':profile', $profile, PDO::PARAM_LOB);
    }
    

    // ดำเนินการบันทึกข้อมูล
    $stmt->execute();

    // ส่งผลลัพธ์การบันทึกข้อมูลสำเร็จ
    echo json_encode(array("status" => "success", "message" => "ข้อมูลไปไหน"));
} catch (PDOException $e) {
    // ส่งผลลัพธ์การบันทึกข้อมูลล้มเหลว
    echo json_encode(array("status" => "error", "message" => "Failed to insert data: " . $e->getMessage()));
}

print_r($_POST);
?>
