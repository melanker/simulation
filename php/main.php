<?php

namespace App;
use App\DB as SQL;

include "./database_handler.php";
include "./sql_handler.php";

/***************Connection details for MYSQL users DB***************************************/
define("DB_USER", "root");
define("DB_PASS", "");
define("DB_HOST" , "localhost:3306");
define("DB_NAME" , "sim_db");

/**
 * $db_obj: Global variable.
 */

$db_obj = new SQL\db_handler(DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME);

$sql_parser = new SQL\sql_handler();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql_parser->getAll();
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data =  json_decode($_POST['json'], true);
    if (isset($data['uid']))
        $sql_parser->replaceField($data['uid'], $data);
    else
        $sql_parser->insertTable($data);
}
?>