<?php

class Data {

    public static $user = "../user/";

    public static function set($username, $func, $data) {
        $filename = Data::$user.$username."/".$func.".json";
        $file = fopen($filename, "w") or die ("Unable to open ".$filename);
        fwrite($file, json_encode($data));
        fclose($file);
    }

    public static function get($username, $func, $key) {
        $filename = Data::$user.$username."/".$func.".json";
        $file = fopen($filename, "r") or die ("Unable to open ".$filename);
        $data = fread($file,filesize($filename));
        $data = json_decode($data);
        fclose($file);
        return $data->$key;
    }

    public static function get_all($username, $func) {
        $filename = Data::$user.$username."/".$func.".json";
        $file = fopen($filename, "r") or die ("Unable to open ".$filename);
        $data = fread($file,filesize($filename));
        $data = json_decode($data);
        fclose($file);
        return (array)$data;
    }

}
