<?php

require_once "./model/Cookie.php";
require_once "./model/Session.php";

if (!Session::has("user") && !Cookie::has("user")) {
    header("location:/login.php");
} else if (!Session::has("user") && Cookie::has("user")) {
    Session::set("user", Cookie::get("user"));
}

