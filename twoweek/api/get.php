<?php

require_once '../model/User.php';

$act = $_POST['action'];

echo User::get($act);
