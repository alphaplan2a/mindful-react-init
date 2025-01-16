<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration
$config = [
    'servername' => "localhost",
    'username' => "respizen_fiori",
    'password' => "VCz46XAwgyttbMCMAuVL",
    'dbname' => "respizen_fiori"
];

// Create connection
$conn = new mysqli($config['servername'], $config['username'], $config['password'], $config['dbname']);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['error' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Get JSON data from request body
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data || !is_array($data)) {
    echo json_encode(['error' => 'Invalid data format']);
    exit();
}

$response = ['success' => true, 'updates' => []];

foreach ($data as $item) {
    if (!isset($item['id_product'])) {
        continue;
    }

    $id_product = $conn->real_escape_string($item['id_product']);
    $sizes = [
        '3xl_size', 's_size', 'm_size', 'l_size', 'xl_size', 'xxl_size',
        '48_size', '50_size', '52_size', '54_size', '56_size', '58_size'
    ];

    // Build the update query dynamically based on provided sizes
    $updates = [];
    $updateValues = [];
    
    foreach ($sizes as $size) {
        if (isset($item['quantities'][$size]) && $item['quantities'][$size] !== '') {
            $quantity = intval($item['quantities'][$size]);
            if ($quantity > 0) {
                $updates[] = "$size = GREATEST($size - ?, 0)";
                $updateValues[] = $quantity;
            }
        }
    }

    if (!empty($updates)) {
        $updateQuery = "UPDATE products SET " . implode(", ", $updates) . " WHERE id = ?";
        $stmt = $conn->prepare($updateQuery);
        
        if ($stmt) {
            $types = str_repeat('i', count($updateValues)) . 'i';
            $updateValues[] = $id_product;
            $stmt->bind_param($types, ...$updateValues);
            
            if ($stmt->execute()) {
                $response['updates'][] = [
                    'id_product' => $id_product,
                    'status' => 'success',
                    'message' => 'Stock updated successfully'
                ];
            } else {
                $response['updates'][] = [
                    'id_product' => $id_product,
                    'status' => 'error',
                    'message' => 'Failed to update stock'
                ];
            }
            $stmt->close();
        }
    }
}

$conn->close();
echo json_encode($response);