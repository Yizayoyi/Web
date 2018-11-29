<?php

require_once '../model/User.php';

$file = $_POST['file'];
$data = json_decode($_POST['data']);

User::set($file, $data);
