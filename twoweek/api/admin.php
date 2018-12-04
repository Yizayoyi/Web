<?php

require_once '../model/Session.php';

$passwd = $_POST['passwd'];

$res = array("state" => "fail");

if (md5($passwd) == "202cb962ac59075b964b07152d234b70") {
    $res['state'] = "success";
    Session::set("admin", "admin");
}

echo json_encode($res);
