<?php

require_once "../model/Data.php";
require_once "../model/Conf.php";
require_once "../model/Session.php";
require_once "../model/Cookie.php";

/**
 * 用户类
 * 用于用户的各种操作
 */
class User {

    /**
     * 定义用户数据文件夹路径
     */
    public static $user = "../user/";

    /**
     * 判断用户是否存在
     */
    public static function has($username) {
        return is_dir(User::$user.$username);
    }

    /**
     * 创建新用户
     */
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

    /**
     * 检查用户名密码是否正确
     */
    public static function check($username, $password) {
        $password = md5($password);
        if (User::has($username)) {
            if ($password == Data::get($username, "passwd", "password")) {
                return true;
            }
        }
        return false;
    }

    /**
     * 用户登录
     */
    public static function login($username) {
        Session::set("user", $username);
        Cookie::set("user", $username);
    }

    /**
     * 得到用户数据
     */
    public static function get($file) {
        $username = Session::get('user');
        return json_encode(Data::get_all($username, $file));
    }

    /**
     * 设置用户数据
     */
    public static function set($file, $data) {
        $username = Session::get('user');
        Data::set($username, $file, $data);
    }

    /**
     * 得到用户排行榜
     */
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

    /**
     * 得到用户信息
     */
    public static function getUserInfo($username) {
        $shops = Data::get_all($username, "leave");
        $info = array(
            "username" => $username,
            "coin" => Data::get($username, "user", "coin"),
            "leave" => $shops[Data::get($username, "user", "leave") - 1]->name,
            "time" => Data::get($username, "user", "time")
        );
        return $info;
    }

    /**
     * 得到全部用户信息
     */
    public static function getUsersInfo() {
        $users = scandir(User::$user);
        $infos = array();
        foreach ($users as $user) {
            if ($user == "." || $user == "..") {
                continue;
            }
            $infos[] = User::getUserInfo($user);
        }
        return json_encode($infos);
    }

    /**
     * 修改密码
     */
    public static function changePasswd($username, $password) {
        $password = md5($password);
        $passwd = array("password" => $password);
        Data::set($username, "passwd", $passwd);
    }

    /**
     * 增加金币
     */
    public static function addCoin($username, $coin) {
        $user = Data::get_all($username, "user");
        $user['coin'] += $coin;
        Data::set($username, "user", $user);
    }

    /**
     * 删除用户
     */
    public static function delUser($username) {
        $path = User::$user . $username;
        $users = scandir($path);
        foreach ($users as $user) {
            unlink($path."/".$user);
        }
        rmdir($path);
    }

}
