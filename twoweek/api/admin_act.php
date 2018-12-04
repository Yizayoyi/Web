<?php

require_once '../model/User.php';

$act = $_POST['action'];

if ($act == "get") {
    echo User::getUsersInfo();
}

if ($act == "add") {
    $username = $_POST['username'];
    $data = $_POST['data'];
    User::addCoin($username, $data);
}

if ($act == "change") {
    $username = $_POST['username'];
    $data = $_POST['data'];
    User::changePasswd($username, $data);
}

if ($act == "del") {
    $username = $_POST['username'];
    User::delUser($username);
}
