<?php

class Cookie
{

    public static function set($key, $value, $time = 3600)
    {
        setcookie($key, $value, time() + $time);
    }

    public static function get($key)
    {
        if ($this->has($key)) {
            return $_COOKIE[$key];
        }
        return false;
    }

    public static function has($key)
    {
        if (isset($_COOKIE[$key]) && $_COOKIE[$key] != "") {
            return true;
        }
        return false;
    }

    public static function clear($key) {
        $this->set($key, "", -1);
    }

}
