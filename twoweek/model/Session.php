<?php

session_start();

class Session
{

    public static function set($key, $value)
    {
        $_SESSION[$key] = $value;
    }

    public static function get($key)
    {
        if (Session::has($key)) {
            return $_SESSION[$key];
        }
        return false;
    }

    public static function has($key)
    {
        if (isset($_SESSION[$key]) && $_SESSION[$key] != "") {
            return true;
        }
        return false;
    }

    public static function clear($key) {
        unset($_SESSION[$key]);
    }

}
