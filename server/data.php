<?php
$cpu = shell_exec('ps aux | awk \'{s += $3} END {print s }\'');
$total_mem = shell_exec("cat /proc/meminfo | grep MemTotal | awk '{ print $2 }' ");
$free_mem = shell_exec("cat /proc/meminfo | grep Cached | awk '{ print $2 }' ");

if(trim(shell_exec("uptime |  awk '{ print $10 }' ")) == 'average:') {
  $average1 =  shell_exec("uptime |  awk '{ print $11 }' ");
  $average2 =  shell_exec("uptime |  awk '{ print $12 }' ");
  $average3 =  shell_exec("uptime | awk '{ print $13 }' ");
} else {
  $average1 =  shell_exec("uptime |  awk '{ print $10 }' ");
  $average2 =  shell_exec("uptime |  awk '{ print $11 }' ");
  $average3 =  shell_exec("uptime | awk '{ print $12 }' ");
}

header('Access-Control-Allow-Origin: *');
$arr = array('CPU' => ((int)trim($cpu) > 100 ? 100 : trim($cpu)),
    'TotalMemory' => trim($total_mem) / 1024,
    'FreeMemory' => trim($free_mem) / 1024,
    "oneMinute" => substr(trim($average1), 0, -1),
    "fiveMinutes" => substr(trim($average2), 0, -1),
    "fifteenMinutes" => trim($average3));

exit (json_encode($arr));

?>
