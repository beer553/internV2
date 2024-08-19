<?php
header("Access-Control-Allow-Origin: http://localhost:3002");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$uid = ""; // ชื่อผู้ใช้ SQL Server
$pwd = ""; // รหัสผ่าน SQL Server

$serverName = "CHAWANRAT"; // ชื่อเซิร์ฟเวอร์ SQL Server
$database = "Intern"; // ชื่อฐานข้อมูล

try {
    $con = new PDO("sqlsrv:Server=$serverName;Database=$database;Encrypt=false", $uid, $pwd);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // รับข้อมูลจากฟอร์ม
    $title = $_POST['title'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $nickname = $_POST['nickname'];
    // รับข้อมูลอื่น ๆ จากฟอร์ม (ทำแบบเดียวกันสำหรับฟิลด์อื่น ๆ)

    // จัดการกับไฟล์รูปภาพที่อัปโหลด
    if (isset($_FILES['profile'])) {
        $profile = $_FILES['profile'];
        $targetDirectory = "uploads/";
        $targetFile = $targetDirectory . basename($profile["name"]);

        // ย้ายไฟล์ไปยังโฟลเดอร์ที่ต้องการ
        if (move_uploaded_file($profile["tmp_name"], $targetFile)) {
            // บันทึกข้อมูลลงในฐานข้อมูล รวมถึงเส้นทางไฟล์รูปภาพ
            $sql = "INSERT INTO your_table_name (title, firstName, lastName, nickname, profile_path) 
                    VALUES (:title, :firstName, :lastName, :nickname, :profile_path)";
            $stmt = $con->prepare($sql);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':firstName', $firstName);
            $stmt->bindParam(':lastName', $lastName);
            $stmt->bindParam(':nickname', $nickname);
            $stmt->bindParam(':profile_path', $targetFile);

            // รันคำสั่ง SQL เพื่อบันทึกข้อมูล
            $stmt->execute();

            echo json_encode(["message" => "Data inserted successfully!"]);
        } else {
            echo json_encode(["error" => "Error uploading file."]);
        }
    } else {
        echo json_encode(["error" => "Profile picture is required."]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
