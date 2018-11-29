<?php

class Conf {

    public static $conf = "../conf/";

    public static function get($c, $key) {
        $filename = Conf::$conf.$c.".json";
        $file = fopen($filename, "r") or die ("Unable to open ".$filename);
        $data = fread($file,filesize($filename));
        $data = json_decode($data);
        fclose($file);
        return $data->$key;
    }

    public static function get_all($c) {
        $filename = Conf::$conf.$c.".json";
        $file = fopen($filename, "r") or die ("Unable to open ".$filename);
        $data = fread($file,filesize($filename));
        $data = json_decode($data);
        fclose($file);
        return (array)$data;
    }

}
