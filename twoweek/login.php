<?php require_once "./html/header1.html";?>

<link rel="stylesheet" href="css/login.css">

<?php require_once "./html/header2.html";?>

<div class="logo">
    <img src="images/logo.png">
</div>

<div class="form">
    <div class="tab">
        <div class="tab-item tab-action" data-func="login">登录</div>
        <div class="tab-item" data-func="reg">注册</div>
    </div>
    <div class="login">
        <form id="login">
            <input type="text" placeholder="用户名" name="username" require autocomplete="off">
            <input type="password" placeholder="密码" name="password" require autocomplete="off">
            <input type="submit" value="登录">
        </form>
    </div>
    <div class="reg">
        <form id="reg">
            <input type="text" placeholder="用户名" name="username" require autocomplete="off">
            <input type="password" placeholder="密码" name="password1" require autocomplete="off">
            <input type="password" placeholder="确认密码" name="password2" require autocomplete="off">
            <input type="submit" value="立即注册">
        </form>
    </div>
</div>

<?php require_once "./html/footer1.html";?>

<script src="js/login.js"></script>

<?php require_once "./html/footer2.html";?>