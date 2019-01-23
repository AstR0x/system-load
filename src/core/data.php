<?php
$cpu = shell_exec('ps aux | awk \'{s += $3} END {print s }\'');
$total_mem = shell_exec("cat /proc/meminfo | grep MemTotal | awk '{ print $2 }' ");
$free_mem = shell_exec("cat /proc/meminfo | grep Cached | awk '{ print $2 }' ");
$average1 =  shell_exec("uptime |  awk '{ print $10 }' ");
$average2 =  shell_exec("uptime |  awk '{ print $11 }' ");
$average3 =  shell_exec("uptime | awk '{ print $12 }' ");
$arr = array('CPU' => trim($cpu),
              'TotalMemory' => trim($total_mem),
              'FreeMemory' => trim($free_mem),
              "oneMinute" => substr(trim($average1), 0, -1),
              "fiveMinutes" => substr(trim($average2), 0, -1),
              "fifteenMinutes" => substr(trim($average3), 0, -1));

exit (json_encode($arr));

?>