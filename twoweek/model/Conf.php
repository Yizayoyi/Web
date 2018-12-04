<?php

/**
 * 配置文件类
 */
class Conf {

    /**
     * 定义配置文件所在目录
     */
    public static $conf = "../conf/";

    /**
     * 得到某项配置
     */
    public static function get($c, $key) {
        $filename = Conf::$conf.$c.".json";
        $file = fopen($filename, "r") or die ("Unable to open ".$filename);
        $data = fread($file,filesize($filename));
        $data = json_decode($data);
        fclose($file);
        return $data->$key;
    }

    /**
     * 得到全部配置
     */
    public static function get_all($c) {
        $filename = Conf::$conf.$c.".json";
        $file = fopen($filename, "r") or die ("Unable to open ".$filename);
        $data = fread($file,filesize($filename));
        $data = json_decode($data);
        fclose($file);
        return (array)$data;
    }

}
