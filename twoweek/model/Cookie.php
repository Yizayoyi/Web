<?php

/**
 * Cookie类
 */
class Cookie
{

    /**
     * 设置Cookie
     */
    public static function set($key, $value, $time = 3600)
    {
        setcookie($key, $value, time() + $time);
    }

    /**
     * 得到Cookie
     */
    public static function get($key)
    {
        if (Cookie::has($key)) {
            return $_COOKIE[$key];
        }
        return false;
    }

    /**
     * 判断Cookie是否存在
     */
    public static function has($key)
    {
        if (isset($_COOKIE[$key]) && $_COOKIE[$key] != "") {
            return true;
        }
        return false;
    }

    /**
     * 清理Cookie
     */
    public static function clear($key) {
        Cookie::set($key, "", -1);
    }

}
