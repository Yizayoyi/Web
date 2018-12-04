<?php

require_once "../model/Data.php";
require_once "../model/Conf.php";
require_once "../model/Session.php";
require_once "../model/Cookie.php";

class User {

    public static $user = "../user/";

    public static function has($username) {
        return is_dir(User::$user.$username);
    }

    public static function create($username, $password) {
        if (!User::has($username)) {
            mkdir(User::$user.$username, 0777);
        }
        $userinfo = array(
            "password" => md5($password)
        );
        Data::set($username, "passwd", $userinfo);
        $files = array("user", "leave", "data");
        foreach ($files as $file) {
            $data = Conf::get_all($file);
            Data::set($username, $file, $data);
        }
        User::login($username);
    }

    public static function check($username, $password) {
        $password = md5($password);
        if (User::has($username)) {
            if ($password == Data::get($username, "passwd", "password")) {
                return true;
            }
        }
        return false;
    }

    public static function login($username) {
        Session::set("user", $username);
        Cookie::set("user", $username);
    }

    public static function get($file) {
        $username = Session::get('user');
        return json_encode(Data::get_all($username, $file));
    }

    public static function set($file, $data) {
        $username = Session::get('user');
        Data::set($username, $file, $data);
    }

    public static function getRank() {
        $users = scandir(User::$user);
        $sorts = array();
        foreach ($users as $user) {
            if ($user == "." || $user == "..") {
                continue;
            }
            $leave = Data::get($user, "user", "leave");
            $sorts[] = array(
                "user" => $user,
                "leave" => $leave
            );
        }
        for ($i = 0; $i < count($sorts); $i++) {
            for ($j = 0; $j < count($sorts) - $i - 1; $j++) {
                if ($sorts[$j]["leave"] < $sorts[$j+1]["leave"]) {
                    $temp = $sorts[$j];
                    $sorts[$j] = $sorts[$j+1];
                    $sorts[$j+1] = $temp;
                }
            }
        }
        return json_encode($sorts);
    }

}
