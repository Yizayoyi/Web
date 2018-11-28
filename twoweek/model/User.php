<?php

require_once "../model/Data.php";

class User {

    private static $user = "../user/";

    public static function has($username) {
        return is_dir($this->user.$username);
    }

    public static function create($username, $password) {
        if (!$this->has($username)) {
            mkdir($this->user.$username, 0777);
        }
        $userinfo = array(
            "password" => md5($password)
        );
        Data::set($username, "passwd", $userinfo);
    }

}
