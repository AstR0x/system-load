<?php
$cpu = shell_exec('ps aux | awk \'{s += $3} END {print s }\'');
$total_mem = shell_exec("cat /proc/meminfo | grep MemTotal | awk '{ print $2 }' ");
$free_mem = shell_exec("cat /proc/meminfo | grep Cached | awk '{ print $2 }' ");
$averageArray =  shell_exec("uptime");
$averageArray = array_slice((explode(" ", $averageArray)), count($averageArray) - 4);

header('Access-Control-Allow-Origin: *');

$arr = array('CPU' => ((int)trim($cpu) > 100 ? 100 : trim($cpu)),
    'TotalMemory' => trim($total_mem) / 1024,
    'FreeMemory' => trim($free_mem) / 1024,
    "oneMinute" => substr(trim($averageArray[0]), 0, -1),
    "fiveMinutes" => substr(trim($averageArray[1]), 0, -1),
    "fifteenMinutes" => trim($averageArray[2]));

exit (json_encode($arr));
