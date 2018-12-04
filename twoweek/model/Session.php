<?php

session_start();

/**
 * Session类
 */
class Session
{

    /**
     * 设置Session
     */
    public static function set($key, $value)
    {
        $_SESSION[$key] = $value;
    }

    /**
     * 得到Session
     */
    public static function get($key)
    {
        if (Session::has($key)) {
            return $_SESSION[$key];
        }
        return false;
    }

    /**
     * 判断Session是否存在
     */
    public static function has($key)
    {
        if (isset($_SESSION[$key]) && $_SESSION[$key] != "") {
            return true;
        }
        return false;
    }

    /**
     * 清理Session
     */
    public static function clear($key) {
        unset($_SESSION[$key]);
    }

}
