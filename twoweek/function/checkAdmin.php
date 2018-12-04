<?php

require_once "./model/Session.php";

if (!Session::has("admin")) {
    header("location:/login_admin.html");
}

