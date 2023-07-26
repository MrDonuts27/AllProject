<?php
$avt = $_GET["nickname"];
// ตรวจสอบว่า nickname ไม่ใช่ค่าว่างหรือไม่มีค่า
if ($avt != "") {
  // ตรวจสอบเงื่อนไขของชื่อ avatar จาก nickname ที่ส่งมา
  if ($avt == "1") {
    $avatarName = "avatar1";
  } else if ($avt == "2") {
    $avatarName = "avatar2";
} else if ($avt == "3") {
    $avatarName = "avatar3";
} else if ($avt == "4") {
    $avatarName = "avatar4";
} else if ($avt == "5") {
    $avatarName = "avatar5";
} else if ($avt == "6") {
    $avatarName = "avatar6";
  } else {
    $avatarName = "Unknown";
  }
  echo $avatarName;
}
?>
