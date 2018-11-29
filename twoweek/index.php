<?php 
require_once "./function/checkLogin.php";
require_once "./html/header1.html";
?>

<link rel="stylesheet" href="css/index.css">

<?php require_once "./html/header2.html";?>

<h2 id="leave"></h2>

<p>
    <button>排行榜</button>
    <button>幸运转盘</button>
    <button id="shop">商店</button>
    <button>垃圾桶</button>
</p>

<p>金币：<span id="coin"></span></p>

<div class="main"></div>

<div id="shade"></div>

<div class="shop">
    <div class="shop-title">
        <div class="shop-name">商店</div>
        <div class="shop-close flex-right">×</div>
    </div>
    <div class="shop-cont"></div>
</div>

<?php require_once "./html/footer1.html";?>

<script src="js/index.js"></script>

<?php require_once "./html/footer2.html";?>