<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');
header('Access-Control-Allow-Headers: Content-Type');

// SQL Server connection details
$uid = ""; // SQL Server username
$pwd = ""; // SQL Server password
$serverName = "CHAWANRAT"; // SQL Server name
$database = "Intern"; // Database name

try {
    // Connect to the database
    $con = new PDO("sqlsrv:Server=$serverName;Database=$database;Encrypt=false", $uid, $pwd);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // การเพิ่มข้อมูลใหม่ (POST)
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['sprint'], $_POST['datestart'], $_POST['dateend'], $_POST['type'], $_POST['detail'], $_POST['manday'], $_POST['responsible'], $_POST['status'], $_POST['increment'], $_POST['remark'], $_POST['project_id'])) {

            // Convert date from DD/MM/YYYY to YYYY-MM-DD
            $datestart = DateTime::createFromFormat('d/m/Y', $_POST['datestart'])->format('Y-m-d');
            $dateend = DateTime::createFromFormat('d/m/Y', $_POST['dateend'])->format('Y-m-d');
            $increment = DateTime::createFromFormat('d/m/Y', $_POST['increment'])->format('Y-m-d');

            // Upload files (imgBefore, imgAfter)
            $uploadDir = 'uploadsbacklog/';
            $imgBeforePath = '';
            $imgAfterPath = '';

            // Handle imgBefore file upload
            if (isset($_FILES['beforeImg'])) {
                $imgBeforePath = $uploadDir . basename($_FILES['beforeImg']['name']);
                if (!move_uploaded_file($_FILES['beforeImg']['tmp_name'], $imgBeforePath)) {
                    echo json_encode(['error' => 'Error uploading before image']);
                    exit;
                }
            }

            // Handle imgAfter file upload
            if (isset($_FILES['afterImg'])) {
                $imgAfterPath = $uploadDir . basename($_FILES['afterImg']['name']);
                if (!move_uploaded_file($_FILES['afterImg']['tmp_name'], $imgAfterPath)) {
                    echo json_encode(['error' => 'Error uploading after image']);
                    exit;
                }
            }

            // Prepare SQL statement
            $stmt = $con->prepare("INSERT INTO backlog (sprint, notificationDate, completionDate, type_of_work, details, imgBefore, imgAfter, manday, teamdevelop, status, productIncrement, note, project_id)
                                    VALUES (:sprint, :notificationDate, :completionDate, :type_of_work, :details, :imgBefore, :imgAfter, :manday, :teamdevelop, :status, :productIncrement, :note, :project_id)");

            // Bind parameters
            $stmt->bindParam(':sprint', $_POST['sprint']);
            $stmt->bindParam(':notificationDate', $datestart);
            $stmt->bindParam(':completionDate', $dateend);
            $stmt->bindParam(':type_of_work', $_POST['type']);
            $stmt->bindParam(':details', $_POST['detail']);
            $stmt->bindParam(':imgBefore', $imgBeforePath);
            $stmt->bindParam(':imgAfter', $imgAfterPath);
            $stmt->bindParam(':manday', $_POST['manday']);
            $stmt->bindParam(':teamdevelop', $_POST['responsible']);
            $stmt->bindParam(':status', $_POST['status']);
            $stmt->bindParam(':productIncrement', $increment);
            $stmt->bindParam(':note', $_POST['remark']);
            $stmt->bindParam(':project_id', $_POST['project_id']);

            // Execute SQL statement and check for success
            if ($stmt->execute()) {
                $backlog_id = $con->lastInsertId();
                echo json_encode(['message' => 'Backlog added successfully', 'backlog_id' => $backlog_id]);
            } else {
                $errorInfo = $stmt->errorInfo();
                echo json_encode(['error' => 'Error inserting backlog: ' . $errorInfo[2]]);
            }
        } else {
            echo json_encode(['error' => 'Invalid input data']);
        }
    }

    // ดึงข้อมูลตาม project_id (GET)
    elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['project_id'])) {
            $project_id = $_GET['project_id'];

            // Prepare SQL statement to query backlog data by project_id
            $stmt = $con->prepare("SELECT * FROM backlog WHERE project_id = :project_id");
            $stmt->bindParam(':project_id', $project_id);

            // Execute SQL statement
            if ($stmt->execute()) {
                $backlogData = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($backlogData);
            } else {
                $errorInfo = $stmt->errorInfo();
                echo json_encode(['error' => 'Error fetching backlog data: ' . $errorInfo[2]]);
            }
        } else {
            echo json_encode(['error' => 'No project_id provided']);
        }
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
