<?php

require_once "../model/User.php";

$act = $_POST['action'];

if ($act == "login") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $result = array("state" => "fail");
    if (User::check($username, $password)) {
        User::login($username);
        $result["state"] = "success";
    }
    echo json_encode($result);
}

if ($act == "reg") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $result = array("state" => "fail");
    if (!User::has($username)) {
        User::create($username, $password);
        $result['state'] = "success";
    }
    echo json_encode($result);
}
