<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "../vendor/autoload.php";

use Sk\Geohash\Geohash;

$g = new Geohash();
echo $g->encode(17.38000000, 78.42000000, 5);

?>