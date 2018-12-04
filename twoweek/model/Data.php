<?php

/**
 * 用户数据文件操作类
 */
class Data {

    /**
     * 定义用户数据文件所在目录
     */
    public static $user = "../user/";

    /**
     * 设置用户数据
     */
    public static function set($username, $func, $data) {
        $filename = Data::$user.$username."/".$func.".json";
        $file = fopen($filename, "w") or die ("Unable to open ".$filename);
        fwrite($file, json_encode($data));
        fclose($file);
    }

    /**
     * 得到某项用户数据
     */
    public static function get($username, $func, $key) {
        $filename = Data::$user.$username."/".$func.".json";
        $file = fopen($filename, "r") or die ("Unable to open ".$filename);
        $data = fread($file,filesize($filename));
        $data = json_decode($data);
        fclose($file);
        return $data->$key;
    }

    /**
     * 得到全部用户数据
     */
    public static function get_all($username, $func) {
        $filename = Data::$user.$username."/".$func.".json";
        $file = fopen($filename, "r") or die ("Unable to open ".$filename);
        $data = fread($file,filesize($filename));
        $data = json_decode($data);
        fclose($file);
        return (array)$data;
    }

}
